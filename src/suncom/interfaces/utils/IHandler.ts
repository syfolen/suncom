
module suncom {
    /**
     * 事件处理器
     * export
     */
    export interface IHandler {

        /**
         * 设置指定属性值
         * @args: 参数列表，默认为: null
         * @once: 是否为一次性事件处理器，默认为: true
         */
        setTo(caller: Object, method: Function, args?: any[], once?: boolean): IHandler;

        /**
         * 执行处理器
         * export
         */
        run(): any;

        /**
         * 执行处理器，携带额外的参数
         * @args: 参数列表，允许为任意类型的数据
         * export
         */
        runWith(args: any): any;

        /**
         * 回收到对象池
         * export
         */
        recover(): void;

        /**
         * 回调对象
         * export
         */
        readonly caller: Object;

        /**
         * 回调方法
         * export
         */
        readonly method: Function;
    }
}