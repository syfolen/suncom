var suncom;
(function (suncom) {
    /**
     * 日志接口
     * export
     */
    var Logger;
    (function (Logger) {
        /**
         * 普通日志
         * export
         */
        function log() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log(args.join(" "));
        }
        Logger.log = log;
        /**
         * 警告日志
         * export
         */
        function warn() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn(args.join(" "));
        }
        Logger.warn = warn;
        /**
         * 错误日志
         * export
         */
        function error() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.error(args.join(" "));
        }
        Logger.error = error;
    })(Logger = suncom.Logger || (suncom.Logger = {}));
})(suncom || (suncom = {}));
//# sourceMappingURL=Logger.js.map