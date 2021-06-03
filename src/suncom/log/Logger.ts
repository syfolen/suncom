
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
        export function log(...args: any[]): void {
            if (Global.debugMode & DebugMode.NORMAL) {
                console.log(`${Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now())} ${args.join(" ")}`);
            }
        }

        /**
         * 调试日志
         * export
         */
        export function debug(...args: any[]): void {
            if (Global.debugMode & DebugMode.DEBUG) {
                console.log(`%c${Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now())} ${args.join(" ")}`, "color:#999999");
            }
        }

        /**
         * 追踪日志
         * export
         */
        export function trace(str: string, callback: (str) => void): void {
            if (Global.debugMode & DebugMode.TRACE) {
                callback(`${Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now())} ${str}`);
            }
        }

        /**
         * 信息日志（框架）
         * export
         */
        export function info(...args: any[]): void {
            if (Global.debugMode & DebugMode.INFO) {
                console.info(`%c${Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now())} ${args.join(" ")}`);
            }
        }

        /**
         * 文件日志
         * export
         */
        export function log2f(...args: any[]): void {
            if (Global.debugMode & DebugMode.LOG2F) {
                console.info(`%c${Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now())} ${args.join(" ")}`, "color:#0000FF");
            }
        }

        /**
         * 警告日志
         * export
         */
        export function warn(...args: any[]): void {
            if (Global.debugMode & DebugMode.WARN) {
                console.warn(`${Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now())} ${args.join(" ")}`);
            }
        }

        /**
         * 错误日志
         * export
         */
        export function error(...args: any[]): void {
            if (Global.debugMode & DebugMode.ERROR) {
                console.error(`${Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now())} ${args.join(" ")}`);
            }
        }
    }
}