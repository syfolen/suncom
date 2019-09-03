var suncom;
(function (suncom) {
    /**
     * 调试模式
     */
    var DebugMode;
    (function (DebugMode) {
        /**
         * 调试信息
         */
        DebugMode[DebugMode["DEBUG"] = 1] = "DEBUG";
        /**
         * 工程模式
         */
        DebugMode[DebugMode["ENGINEER"] = 2] = "ENGINEER";
        /**
         * 框架
         */
        DebugMode[DebugMode["ENGINE"] = 4] = "ENGINE";
        /**
         * 原生
         */
        DebugMode[DebugMode["NATIVE"] = 8] = "NATIVE";
        /**
         * 网络
         */
        DebugMode[DebugMode["NETWORK"] = 16] = "NETWORK";
        /**
         * 网络心跳
         */
        DebugMode[DebugMode["NETWORK_HEARTBEAT"] = 32] = "NETWORK_HEARTBEAT";
        /**
         * 普通
         */
        DebugMode[DebugMode["NORMAL"] = 64] = "NORMAL";
    })(DebugMode = suncom.DebugMode || (suncom.DebugMode = {}));
})(suncom || (suncom = {}));
//# sourceMappingURL=DebugMode.js.map