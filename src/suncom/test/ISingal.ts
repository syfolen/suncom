
module suncom {
    /**
     * 测试信号接口
     */
    export interface ISingal {
        /**
         * 信号ID
         */
        id: number;

        /**
         * 信号回调
         */
        handler: IHandler;
    }
}