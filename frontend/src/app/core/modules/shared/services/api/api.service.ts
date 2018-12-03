import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InterceptorService} from '../interceptor/interceptor.service';
import {endpoints} from './api.config';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ApiResponse, ErrorResponse} from './../../../../../interfaces/response';
import {environment} from './../../../../../../environments/environment';
import StringHelper from '../../../../../helpers/string.helper';


interface RequestForm {
    url: string;
    method: string;
}

@Injectable()
export class ApiService {
    private apiUrl = environment.url;

    constructor(
        private _http: HttpClient,
        private _interceptor: InterceptorService) {
    }

    url(endpoint: string): RequestForm {
        let reqForm: RequestForm;
        const endpointRoutes: string[] = endpoint.split('.');
        endpointRoutes.map(ep => {
            reqForm = reqForm ? reqForm[ep] : endpoints[ep];
        });
        return {
            url: this.apiUrl + reqForm.url,
            method: reqForm.method
        };
    }

    response(request: Observable<any>): Observable<any> {
        return request.pipe(
            map((data: ApiResponse) => this._interceptor.responseHandler(data)),
            catchError((response: ErrorResponse) => this._interceptor.errorHandler(response))
        );
    }

    request(endpoint: string, params?: object | number | string, data?: object): Observable<any> {
        const request: RequestForm = this.url(endpoint);

        if (params) {
            if (request.url.includes('{')) {
                const regex = new RegExp('(?<={)[^}]*(?=})', 'gm');
                const matchParams = request.url.match(regex);
                if (matchParams.length) {
                    matchParams.forEach((matchParamKey) => {
                        let param;
                        if (typeof params === 'number' || typeof params === 'string') {
                            param = params;
                        } else {
                            param = params[matchParamKey];
                            delete params[matchParamKey];
                        }

                        request.url = request.url.replace(`{${matchParamKey}}`, param);
                    });
                }
            }
            if (request.method === 'get' && params && typeof params === 'object' && Object.keys(params).length) {
                request.url += `?${StringHelper.serializeObject(params)}`;
            } else if (typeof params === 'number' || typeof params === 'string' || Array.isArray(params)) {
                if ((['post', 'put', 'patch'].indexOf(request.method) > -1) && data) {
                    params = data;
                } else {
                    params = {};
                }
            }
        } else if (data) {
            params = data;
        }

        return this.response(this._http[request.method](request.url, params));
    }
}
