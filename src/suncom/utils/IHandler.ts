
module suncom {
    /**
     * 事件处理器
     * export
     */
    export interface IHandler {

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