var suncom;
(function (suncom) {
    /**
     * 日志接口
     */
    var Logger = /** @class */ (function () {
        function Logger() {
        }
        /**
         * 普通日志
         */
        Logger.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.log(args.join(" "));
        };
        /**
         * 警告日志
         */
        Logger.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn(args.join(" "));
        };
        /**
         * 错误日志
         */
        Logger.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.error(args.join(" "));
        };
        return Logger;
    }());
    suncom.Logger = Logger;
})(suncom || (suncom = {}));
//# sourceMappingURL=Logger.js.map