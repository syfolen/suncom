
module suncom {
    /**
     * 日志接口
     * export
     */
    export abstract class Logger {

        /**
         * 普通日志
         * export
         */
        static log(...args: Array<any>): void {
            console.log(args.join(" "));
        }

        /**
         * 警告日志
         * export
         */
        static warn(...args: Array<any>): void {
            console.warn(args.join(" "));
        }

        /**
         * 错误日志
         * export
         */
        static error(...args: Array<any>): void {
            console.error(args.join(" "));
        }
    }
}