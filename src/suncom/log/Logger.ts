
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
                args.unshift(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now()));
                console.log.apply(console, args);
            }
        }

        /**
         * 调试日志
         * export
         */
        export function debug(...args: any[]): void {
            if (Global.debugMode & DebugMode.DEBUG) {
                args.unshift(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now()));
                args.push("color:#00FFFF");
                console.log.apply(console, args);
            }
        }

        /**
         * 信息日志（框架）
         * export
         */
        export function info(...args: any[]): void {
            if (Global.debugMode & DebugMode.INFO) {
                args.unshift(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now()));
                console.info.apply(console, args);
            }
        }

        /**
         * 文件日志
         * export
         */
        export function log2f(...args: any[]): void {
            if (Global.debugMode & DebugMode.LOG2F) {
                args.unshift(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now()));
                args.push("color: #0000FF");
                console.info.apply(console, args);
            }
        }

        /**
         * 警告日志
         * export
         */
        export function warn(...args: any[]): void {
            if (Global.debugMode & DebugMode.WARN) {
                args.unshift(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now()));
                console.warn.apply(console, args);
            }
        }

        /**
         * 错误日志
         * export
         */
        export function error(...args: any[]): void {
            if (Global.debugMode & DebugMode.ERROR) {
                args.unshift(suncom.Common.formatDate("yyyy-MM-dd hh:mm:ss.MS", Date.now()));
                console.error.apply(console, args);
            }
        }
    }
}