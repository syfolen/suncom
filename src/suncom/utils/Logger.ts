
module suncom {
    /**
     * 日志接口
     * export
     */
    export namespace Logger {

        /**
         * 普通日志
         * export
         */
        export function log(...args: Array<any>): void {
            console.log(args.join(" "));
        }

        /**
         * 警告日志
         * export
         */
        export function warn(...args: Array<any>): void {
            console.warn(args.join(" "));
        }

        /**
         * 错误日志
         * export
         */
        export function error(...args: Array<any>): void {
            console.error(args.join(" "));
        }

        /**
         * 文件日志
         * export
         */
        export function log2f(name: number | string, sign: number | string, text: string): void {

        }
    }
}