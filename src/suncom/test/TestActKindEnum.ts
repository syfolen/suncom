
module suncom {
    /**
     * 测试动作类型枚举
     * export
     */
    export enum TestActKindEnum {
        /**
         * 无
         * export
         */
        NONE,

        /**
         * 按钮点击
         * export
         */
        BUTTON_CLICK,

        /**
         * 按钮注册
         * export
         */
        BUTTON_REGISTER,

        /**
         * 信号发送
         * export
         */
        SIGNAL_EMIT,

        /**
         * 信号监听
         * export
         */
        SIGNAL_WAIT,

        /**
         * WebSocket连接状态下行
         * export
         */
        WS_STATE_NOTIFY,

        /**
         * 协议序列化
         * export
         */
        PROTOCAL_SERIALIZE
    }
}