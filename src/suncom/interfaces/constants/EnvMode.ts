
module suncom {
    /**
     * 环境模式，主要用于发布控制
     * export
     */
    export enum EnvMode {
        /**
         * 本地环境（无局域网模式）
         * export
         */
        LOCAL = 0,

        /**
         * 开发环境
         * export
         */
        DEVELOP,

        /**
         * 网页版
         * export
         */
        WEB,

        /**
         * 原生平台
         * export
         */
        NATIVE
    }
}