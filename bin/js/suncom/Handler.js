var suncom;
(function (suncom) {
    /**
     * 事件处理器
     * export
     */
    var Handler = /** @class */ (function () {
        /**
         * export
         */
        function Handler(caller, method, args, once) {
            this.$args = args;
            this.$caller = caller;
            this.$method = method;
        }
        /**
         * 执行处理器
         * export
         */
        Handler.prototype.run = function () {
            if (this.$args === void 0) {
                return this.$method.call(this.$caller);
            }
            else {
                return this.$method.apply(this.$caller, this.$args);
            }
        };
        /**
         * 执行处理器，携带额外的参数
         * @args 参数列表，允许为任意类型的数据
         * export
         */
        Handler.prototype.runWith = function (args) {
            if (this.$args === void 0) {
                if (args instanceof Array) {
                    return this.$method.apply(this.$caller, args);
                }
                else {
                    return this.$method.call(this.$caller, args);
                }
            }
            else {
                return this.$method.apply(this.$caller, this.$args.concat(args));
            }
        };
        /**
         * 创建Handler的简单工厂方法
         * @once: 己弃用
         * export
         */
        Handler.create = function (caller, method, args, once) {
            return new Handler(caller, method, args, once);
        };
        return Handler;
    }());
    suncom.Handler = Handler;
})(suncom || (suncom = {}));
//# sourceMappingURL=Handler.js.map