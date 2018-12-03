import * as lcfirst from 'lcfirst';

export default class StringHelper {
    public static camelCase(str: string): string {
        return lcfirst(str.replace(' ', ''));
    }

    public static serializeObject(obj: object, separator: string = '&'): string {
        return Object.entries(obj).map(([key, val]) => `${key}=${val}`).join(separator);
    }

    public static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    public static deSlugify(str) {
        return this.capitalize(str.replace('_', ' ').replace('-', ' '));
    }
}
