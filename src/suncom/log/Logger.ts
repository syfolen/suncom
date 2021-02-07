
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
        export function log(mod: DebugMode, str: string): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                console.log(str);
            }
        }

        /**
         * 警告日志
         * export
         */
        export function warn(mod: DebugMode, str: string): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                console.warn(str);
            }
        }

        /**
         * 错误日志
         * export
         */
        export function error(mod: DebugMode, str: string): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                console.error(str);
            }
        }

        /**
         * 文件日志
         * export
         */
        export function log2f(mod: DebugMode, str: string): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                console.info(str);
            }
        }
    }
}