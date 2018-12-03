import { Injectable } from '@angular/core';
import { CellType } from '../../../../../constants/cell-type';
import { Column } from '../../../../../interfaces/column';
import { Observable } from 'rxjs';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import TableHelper from '../../../../../helpers/table.helper';
import StringHelper from '../../../../../helpers/string.helper';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  cellTypes = CellType;

  constructor() { }

  public importData(file: Blob | any): Observable<Array<Array<string>>> {
    let data = [];
    return Observable.create(obs => {
        const reader = new FileReader();
        if (file instanceof Blob) {
            reader.readAsArrayBuffer(file);
            reader.onload = () => {
              if (reader.result instanceof ArrayBuffer) {
                const sheet = new Uint8Array(reader.result);
                data = this.readData(sheet);
              }
            };
        } else {
            const target: DataTransfer = <DataTransfer>(file.target);
            reader.readAsArrayBuffer(target.files[0]);
            reader.onload = (e: any) => {
                const sheet: string = e.target.result;
                data = this.readData(sheet);
            };
        }

        reader.onloadend = () => obs.next(data);
    });
  }

  private readData(data): Array<string> {
    const wb = XLSX.read(data, { type: 'array' });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    const rows: Array<string> = XLSX.utils.sheet_to_json(ws, {header: 1});
    return rows.filter(r => r.length);
  }

  public exportData(data: any[], columns: Column[], filename: string, exceptColumns?: Array<string>) {
    const exportData = [];
    data.map((row) => {
        const rowData = {};
        columns.map((column) => {
            if (column.type === this.cellTypes.BADGE) {
              rowData[column.title] = row[column.prop || StringHelper.camelCase(column.title)].text;
            } else {
              rowData[column.title] = TableHelper.cell(row, column);
            }
        });

        exportData.push(rowData);
    });

    this.exportAsExcelFile(exportData, filename);
  }

  private exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + ' export ' + moment().format('YY-MM-DD HH-mm-ss') + EXCEL_EXTENSION);
  }

}

