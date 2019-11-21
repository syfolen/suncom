
module suncom {

    /**
     * 事件处理器接口
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
         * @param args 参数列表，允许为任意类型的数据
         * export
         */
        runWith(args: any): any;
    }
}