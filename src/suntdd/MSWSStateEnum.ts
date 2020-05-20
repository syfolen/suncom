
module suntdd {
    /**
     * 微服务器WebSocket状态枚举
     * export
     */
    export enum MSWSStateEnum {
        /**
         * 己连接
         * export
         */
        CONNECTED,

        /**
         * 服务器关闭连接
         * export
         */
        CLOSE,

        /**
         * 网络异常断开
         * export
         */
        ERROR
    }
}