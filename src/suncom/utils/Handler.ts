
module suncom {
    /**
     * 事件处理器
     * export
     */
    export class Handler implements IHandler {
        /**
         * 唯一标识
         */
        private $var_id: number = 0;

        /**
         * 参数列表
         */
        private $var_args: any[] = null;

        /**
         * 是否为一次性的
         */
        private $var_once: boolean = false;

        /**
         * 回调对象
         */
        private $var_caller: Object = null;

        /**
         * 回调方法
         */
        private $var_method: Function = null;

        /**
         * 设置指定属性值
         * @args: 参数列表，默认为: null
         * @once: 是否为一次性事件处理器，默认为: true
         */
        private $func_setTo(caller: Object, method: Function, args: any[] = null, once: boolean = true): IHandler {
            if (this.$var_id === -1) {
                throw Error(`Handler己被回收！！！`);
            }
            this.$var_id = Common.createHashId();
            this.$var_args = args;
            this.$var_once = once;
            this.$var_caller = caller || null;
            this.$var_method = method || null;
            return this;
        }

        /**
         * export
         */
        run(): any {
            const id: number = this.$var_id;
            const res: any = this.$var_method.apply(this.$var_caller, this.$var_args);
            id === this.$var_id && this.$var_once === true && this.recover();
            return res;
        }

        /**
         * export
         */
        runWith(args: any): any {
            const id: number = this.$var_id;
            let res: any;
            if (this.$var_args !== null) {
                res = this.$var_method.apply(this.$var_caller, this.$var_args.concat(args));
            }
            else if (args instanceof Array) {
                res = this.$var_method.apply(this.$var_caller, args);
            }
            else {
                res = this.$var_method.call(this.$var_caller, args);
            }
            id === this.$var_id && this.$var_once === true && this.recover();
            return res;
        }

        /**
         * export
         */
        recover(): void {
            if (Pool.recover("suncom.Handler", this) === true) {
                this.$var_id = -1;
                this.$var_args = null;
                this.$var_caller = null;
                this.$var_method = null;
            }
        }

        /**
         * export
         */
        get caller(): Object {
            return this.$var_caller;
        }

        /**
         * export
         */
        get method(): Function {
            return this.$var_method;
        }

        /**
         * 创建Handler的简单工厂方法
         * export
         */
        static create(caller: Object, method: Function, args?: any[], once?: boolean): IHandler {
            const handler: Handler = Pool.getItemByClass("suncom.Handler", Handler);
            handler.$var_id = 0;
            return handler.$func_setTo(caller, method, args, once);
        }
    }
}