
module suncom {

    /**
      * 事件处理器
      */
    export class Handler implements IHandler {
        /**
         * 参数列表
         */
        private $args: any;

        /**
         * 回调对象
         */
        private $caller: Object;

        /**
         * 回调方法
         */
        private $method: Function;

        constructor(caller: Object, method: Function, args?: any, once?: boolean) {
            this.$args = args;
            this.$caller = caller;
            this.$method = method;
        }

        /**
         * 执行处理器
         */
        run(): any {
            if (this.$args === void 0) {
                return this.$method.call(this.$caller);
            }
            else if (this.$args instanceof Array) {
                return this.$method.apply(this.$caller, this.$args);
            }
            else {
                return this.$method.call(this.$caller, this.$args);
            }
        }

        /**
         * 执行处理器，携带额外的参数
         * @param args 参数列表，允许为任意类型的数据
         */
        runWith(args: any): any {
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
        }

        /**
         * 创建Handler的简单工厂方法
         * @once: 己弃用
         */
        static create(caller: Object, method: Function, args?: Array<any>, once?: boolean): IHandler {
            return new Handler(caller, method, args, once);
        }
    }
}