
module suncom {
    /**
     * 全局常量或变量
     * export
     */
    export namespace Global {
        /**
         * 运行环境
         * export
         */
        export let envMode: EnvMode = EnvMode.DEVELOP;

        /**
         * 调试模式
         * export
         */
        export let debugMode: DebugMode = DebugMode.TEST;

        /**
         * 设计分辨率
         * export
         */
        export const WIDTH: number = 1280;

        /**
         * 设计分辨率
         * export
         */
        export const HEIGHT: number = 720;

        /**
         * 实际分辨率
         * export
         */
        export let width: number = 1280;

        /**
         * 实际分辨率
         * export
         */
        export let height: number = 720;

        /**
         * 游戏版本
         * export
         */
        export let VERSION: string = "1.0.0";
    }
}