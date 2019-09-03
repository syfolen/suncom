var suncom;
(function (suncom) {
    /**
     * 全局常量或变量
     */
    var Global = /** @class */ (function () {
        function Global() {
        }
        /**
         * 运行环境
         */
        Global.envMode = suncom.EnvMode.SIMULATOR;
        /**
         * 调试模式
         */
        Global.debugMode = suncom.DebugMode.NORMAL | suncom.DebugMode.NATIVE | suncom.DebugMode.NETWORK | suncom.DebugMode.NETWORK_HEARTBEAT | suncom.DebugMode.ENGINE | suncom.DebugMode.ENGINEER | suncom.DebugMode.DEBUG;
        /**
         * 设计分辨率
         */
        Global.WIDTH = 1280;
        Global.HEIGHT = 720;
        /**
         * 实际分辨率
         */
        Global.width = 1280;
        Global.height = 720;
        /**
         * 服务端地址
         */
        Global.TCP_IP = "127.0.0.1";
        /**
         * 服务端端口
         */
        Global.TCP_PORT = 0;
        /**
         * 游戏版本
         */
        Global.VERSION = "1.0.0";
        return Global;
    }());
    suncom.Global = Global;
})(suncom || (suncom = {}));
//# sourceMappingURL=Global.js.map