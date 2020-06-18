
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
        export function log(mod: DebugMode, ...args: any[]): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                const str: string = args.join(" ");
                console.log(str);
                puremvc.Facade.getInstance().sendNotification(NotifyKey.DEBUG_PRINT, [LogTypeEnum.VERBOSE, str]);
            }
        }

        /**
         * 警告日志
         * export
         */
        export function warn(mod: DebugMode, ...args: any[]): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                const str: string = args.join(" ");
                console.warn(str);
                puremvc.Facade.getInstance().sendNotification(NotifyKey.DEBUG_PRINT, [LogTypeEnum.WARN, str]);
            }
        }

        /**
         * 错误日志
         * export
         */
        export function error(mod: DebugMode, ...args: any[]): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                const str: string = args.join(" ");
                console.error(str);
                puremvc.Facade.getInstance().sendNotification(NotifyKey.DEBUG_PRINT, [LogTypeEnum.ERROR, str]);
            }
        }

        /**
         * 文件日志
         * export
         */
        export function log2f(mod: DebugMode, ...args: any[]): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                const str: string = args.join(" ");
                console.info(str);
                puremvc.Facade.getInstance().sendNotification(NotifyKey.DEBUG_PRINT, [LogTypeEnum.LOG2F, str]);
            }
        }

        /**
         * 调用追踪日志
         * export
         */
        export function trace(mod: DebugMode, ...args: any[]): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                const str: string = args.join(" ");
                console.trace(str);
            }
        }
    }
}