
module suncom {
    /**
     * 全局常量或变量
     * export
     */
    export namespace Global {
        /**
         * 运行环境，默认为：EnvMode.DEVELOP
         * export
         */
        export let envMode: EnvMode = 0;

        /**
         * 调试模式，默认为：0
         * export
         */
        export let debugMode: DebugMode = 0;

        /**
         * 设计分辨率宽，默认为：1280
         * export
         */
        export const WIDTH: number = 1280;

        /**
         * 设计分辨率高，默认为：720
         * export
         */
        export const HEIGHT: number = 720;

        /**
         * 实际分辨率宽，默认为：Global.WIDTH
         * export
         */
        export let width: number = 1280;

        /**
         * 实际分辨率高，默认为：Global.HEIGHT
         * export
         */
        export let height: number = 720;

        /**
         * 游戏版本，默认为：1.0.0
         * export
         */
        export let VERSION: string = "1.0.0";
    }
}