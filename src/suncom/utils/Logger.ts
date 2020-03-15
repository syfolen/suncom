
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
            const str: string = args.join(" ");
            console.log(str);
            puremvc.Facade.getInstance().sendNotification(NotifyKey.DEBUG_PRINT, [LogTypeEnum.VERBOSE, str]);
        }

        /**
         * 警告日志
         * export
         */
        export function warn(...args: Array<any>): void {
            const str: string = args.join(" ");
            console.warn(str);
            puremvc.Facade.getInstance().sendNotification(NotifyKey.DEBUG_PRINT, [LogTypeEnum.WARN, str]);
        }

        /**
         * 错误日志
         * export
         */
        export function error(...args: Array<any>): void {
            const str: string = args.join(" ");
            console.error(str);
            puremvc.Facade.getInstance().sendNotification(NotifyKey.DEBUG_PRINT, [LogTypeEnum.ERROR, str]);
        }

        /**
         * 文件日志
         * export
         */
        export function log2f(args: any[]): void {
            const str: string = args.join(" ");
            console.info(str);
            puremvc.Facade.getInstance().sendNotification(NotifyKey.DEBUG_PRINT, [LogTypeEnum.LOG2F, str]);
        }
    }
}