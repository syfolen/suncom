var suncom;
(function (suncom) {
    /**
     * 调试模式
     * export
     */
    var DebugMode;
    (function (DebugMode) {
        /**
         * 调试信息
         * export
         */
        DebugMode[DebugMode["DEBUG"] = 1] = "DEBUG";
        /**
         * 工程模式
         * export
         */
        DebugMode[DebugMode["ENGINEER"] = 2] = "ENGINEER";
        /**
         * 框架
         * export
         */
        DebugMode[DebugMode["ENGINE"] = 4] = "ENGINE";
        /**
         * 原生
         * export
         */
        DebugMode[DebugMode["NATIVE"] = 8] = "NATIVE";
        /**
         * 网络
         * export
         */
        DebugMode[DebugMode["NETWORK"] = 16] = "NETWORK";
        /**
         * 网络心跳
         * export
         */
        DebugMode[DebugMode["NETWORK_HEARTBEAT"] = 32] = "NETWORK_HEARTBEAT";
        /**
         * 普通
         * export
         */
        DebugMode[DebugMode["NORMAL"] = 64] = "NORMAL";
    })(DebugMode = suncom.DebugMode || (suncom.DebugMode = {}));
})(suncom || (suncom = {}));
//# sourceMappingURL=DebugMode.js.map