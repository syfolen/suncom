
module suncom {
    /**
     * 事件处理器
     * export
     */
    export class Handler implements IHandler {
        /**
         * 参数列表
         */
        private $args: any[];

        /**
         * 回调对象
         */
        private $caller: Object;

        /**
         * 回调方法
         */
        private $method: Function;

        constructor(caller: Object, method: Function, args?: any[]) {
            this.$args = args;
            this.$caller = caller;
            this.$method = method;
        }

        /**
         * 执行处理器
         * export
         */
        run(): any {
            if (this.$args === void 0) {
                return this.$method.call(this.$caller);
            }
            return this.$method.apply(this.$caller, this.$args);
        }

        /**
         * 执行处理器，携带额外的参数
         * @args 参数列表，允许为任意类型的数据
         * export
         */
        runWith(args: any): any {
            if (this.$args === void 0) {
                if (args instanceof Array) {
                    return this.$method.apply(this.$caller, args);
                }
                return this.$method.call(this.$caller, args);
            }
            return this.$method.apply(this.$caller, this.$args.concat(args));
        }

        /**
         * 回调对象
         * export
         */
        get caller(): Object {
            return this.$caller;
        }

        /**
         * 回调方法
         * export
         */
        get method(): Function {
            return this.$method;
        }

        /**
         * 创建Handler的简单工厂方法
         * export
         */
        static create(caller: Object, method: Function, args?: any[]): IHandler {
            return new Handler(caller, method, args);
        }
    }
}