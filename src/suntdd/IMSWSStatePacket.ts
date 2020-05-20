
module suntdd {
    /**
     * 微服务器WebSocket状态包
     * export
     */
    export interface IMSWSStatePacket extends IMSWSPacket {
        /**
         * WebSocket状态
         * export
         */
        state: MSWSStateEnum;
    }
}