
module suncom {
    /**
     * 事件处理器
     * export
     */
    export class Handler {
        /**
         * 唯一标识
         */
        private $_id: number = 0;

        /**
         * 参数列表
         */
        private $_args: any[] = null;

        /**
         * 回调对象
         */
        private $_caller: Object = null;

        /**
         * 回调方法
         */
        private $_method: Function = null;

        /**
         * 是否为一次性的
         */
        private $_once: boolean = false;

        setTo(caller: Object, method: Function, args: any[] = null, once: boolean = true): Handler {
            if (this.$_id === -1) {
                throw Error(`Handler己被回收！！！`);
            }
            this.$_id = Common.createHashId();
            this.$_caller = caller || null;
            this.$_method = method || null;
            this.$_args = args;
            this.$_once = once;
            return this;
        }

        /**
         * 执行处理器
         * export
         */
        run(): any {
            const id: number = this.$_id;
            const res: any = this.$_method.apply(this.$_caller, this.$_args);
            id === this.$_id && this.$_once === true && this.recover();
            return res;
        }

        /**
         * 执行处理器，携带额外的参数
         * @args 参数列表，允许为任意类型的数据
         * export
         */
        runWith(args: any): any {
            const id: number = this.$_id;
            let res: any;
            if (this.$_args !== null) {
                res = this.$_method.apply(this.$_caller, this.$_args.concat(args));
            }
            else if (args instanceof Array) {
                res = this.$_method.apply(this.$_caller, args);
            }
            else {
                res = this.$_method.call(this.$_caller, args);
            }
            id === this.$_id && this.$_once === true && this.recover();
            return res;
        }

        /**
         * 回收到对象池
         * export
         */
        recover(): void {
            if (Pool.recover("suncom.Handler", this) === true) {
                this.$_id = -1;
                this.$_args = null;
                this.$_caller = null;
                this.$_method = null;
            }
        }

        /**
         * 回调对象
         * export
         */
        get caller(): Object {
            return this.$_caller;
        }

        /**
         * 回调方法
         * export
         */
        get method(): Function {
            return this.$_method;
        }

        /**
         * 创建Handler的简单工厂方法
         * export
         */
        static create(caller: Object, method: Function, args?: any[], once?: boolean): Handler {
            const handler: Handler = Pool.getItemByClass("suncom.Handler", Handler);
            handler.$_id = 0;
            return handler.setTo(caller, method, args, once);
        }
    }
}