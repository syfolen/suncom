
module suncom {
    /**
     * export
     */
    export namespace Std {
        /**
         * export
         */
        export function isNullOrUndefined(value: any): boolean {
            return value === void 0 || value === null;
        }

        /**
         * export
         */
        export function getQueryString(name: string, param?: string): string {
            const reg: RegExp = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            const str: string = param || window.location.search;
            const array: RegExpMatchArray = str.substr(1).match(reg) || null;
            return array === null ? null : decodeURIComponent(array[2]);
        }
    }
}