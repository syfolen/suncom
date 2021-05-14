
module suncom {
    /**
     * 环境模式，主要用于发布控制
     * export
     */
    export enum EnvMode {
        /**
         * 开发环境
         * export
         */
        DEVELOP = 0,

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