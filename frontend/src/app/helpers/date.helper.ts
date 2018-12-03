import * as moment from 'moment';

export default class DateHelper {

    public static getDateDifference(startDate, endDate): number {
        startDate = startDate.length ? moment(startDate) : moment.now();
        endDate = moment(endDate);
        const duration = moment.duration(endDate.diff(startDate));
        return Math.floor(duration.asHours());
    }

}