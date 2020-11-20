
module suncom {
    /**
     * 事件处理器
     * export
     */
    export class Handler {
        /**
         * 唯一标识
         */
        private $id: number = 0;

        /**
         * 参数列表
         */
        private $args: any[] = null;

        /**
         * 回调对象
         */
        private $caller: Object = null;

        /**
         * 回调方法
         */
        private $method: Function = null;

        /**
         * 是否为一次性的
         */
        private $once: boolean = false;

        setTo(caller: Object, method: Function, args: any[] = null, once: boolean = true): Handler {
            if (this.$id === -1) {
                throw Error(`Handler己被回收！！！`);
            }
            this.$id = Common.createHashId();
            this.$caller = caller || null;
            this.$method = method || null;
            this.$args = args;
            this.$once = once;
            return this;
        }

        /**
         * 执行处理器
         * export
         */
        run(): any {
            const id: number = this.$id;
            const res: any = this.$method.apply(this.$caller, this.$args);
            id === this.$id && this.$once === true && this.recover();
            return res;
        }

        /**
         * 执行处理器，携带额外的参数
         * @args 参数列表，允许为任意类型的数据
         * export
         */
        runWith(args: any): any {
            const id: number = this.$id;
            let res: any;
            if (this.$args !== null) {
                res = this.$method.apply(this.$caller, this.$args.concat(args));
            }
            else if (args instanceof Array) {
                res = this.$method.apply(this.$caller, args);
            }
            else {
                res = this.$method.call(this.$caller, args);
            }
            id === this.$id && this.$once === true && this.recover();
            return res;
        }

        /**
         * 回收到对象池
         * export
         */
        recover(): void {
            if (Pool.recover("suncom.Handler", this) === true) {
                this.$id = -1;
                this.$method = null;
            }
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
        static create(caller: Object, method: Function, args?: any[], once?: boolean): Handler {
            return Pool.getItemByClass("suncom.Handler", Handler).setTo(caller, method, args, once);
        }
    }
}