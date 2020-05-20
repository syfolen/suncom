
module suntdd {
    /**
     * 微服务器WebSocket协议包
     * export
     */
    export interface IMSWSProtocalPacket extends IMSWSPacket {
        /**
         * 回复的消息名字，默认为：null
         * export
         */
        replyName?: string;

        /**
         * 下行的数据内容，默认为：null
         * export
         */
        data?: any;

        /**
         * 下行重复次数，默认为：1
         * export
         */
        repeatTimes?: number;

        /**
         * 时间戳字段
         * 说明：
         * 1. 时间戳字段会在数据下行时写入服务端的即时时间
         * 2. 若该字段己存在值，则该值会被认为是时间偏移
         */
        timeFields: suncom.IPCMIntString[];

        /**
         * 哈希字段
         * 说明：
         * 1. 未指定值的哈希字段会在数据下行时被写入一个有效哈希值
         */
        hashFileds: string[];
    }
}