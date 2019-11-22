var suncom;
(function (suncom) {
    /**
     * 全局常量或变量
     * export
     */
    var Global = /** @class */ (function () {
        function Global() {
        }
        /**
         * 运行环境
         * export
         */
        Global.envMode = suncom.EnvMode.SIMULATOR;
        /**
         * 调试模式
         * export
         */
        Global.debugMode = suncom.DebugMode.NORMAL | suncom.DebugMode.NATIVE | suncom.DebugMode.NETWORK | suncom.DebugMode.NETWORK_HEARTBEAT | suncom.DebugMode.ENGINE | suncom.DebugMode.ENGINEER | suncom.DebugMode.DEBUG;
        /**
         * 设计分辨率
         * export
         */
        Global.WIDTH = 1280;
        /**
         * 设计分辨率
         * export
         */
        Global.HEIGHT = 720;
        /**
         * 实际分辨率
         * export
         */
        Global.width = 1280;
        /**
         * 实际分辨率
         * export
         */
        Global.height = 720;
        /**
         * 游戏版本
         * export
         */
        Global.VERSION = "1.0.0";
        return Global;
    }());
    suncom.Global = Global;
})(suncom || (suncom = {}));
//# sourceMappingURL=Global.js.map