
module suncom {
    /**
     * 回调执行器接口
     * export
     */
    export interface IHandler {

        /**
         * 执行回调
         * export
         */
        run(): any;

        /**
         * 执行回调，同时携带额外的参数
         * @args 参数列表，允许为任意类型的数据
         * export
         */
        runWith(args: any): any;

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