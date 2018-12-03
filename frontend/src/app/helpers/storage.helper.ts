class StorageHelper {

    public static get(item: string): any {
        try {
            return JSON.parse(localStorage.getItem(item));
        } catch (e) {
            return localStorage.getItem(item);
        }
    }

    public static set(item: string, value: any): void {
        if (typeof value === 'string') {
            localStorage.setItem(item, value);
        } else {
            localStorage.setItem(item, JSON.stringify(value));
        }
    }

    public static remove(item: string): void {
        localStorage.removeItem(item);
    }

    public static clearUser(): void {
        this.remove('token');
        this.remove('user');
    }

    public static clearBreadcrumbs(): void {
        this.remove('breadcrumbs');
    }

    public static sessionGet(item: string) {
        return JSON.parse(sessionStorage.getItem(item));
    }

    public static sessionSet(item: string, value: string | object) {
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }

        return sessionStorage.setItem(item, value);
    }

}

export default StorageHelper;
