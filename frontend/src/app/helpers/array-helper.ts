export default class ArrayHelper {

    public static unique(array: any[]): any[] {
        return array.filter((elem, pos, arr) => arr.indexOf(elem) === pos);
    }

}