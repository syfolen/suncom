var suncom;
(function (suncom) {
    /**
     * 全局常量或变量
     */
    var Global = /** @class */ (function () {
        function Global() {
            /**
             * 调试模式
             */
            this.staticdebugMode = suncom.DebugMode.NORMAL | suncom.DebugMode.NATIVE | suncom.DebugMode.NETWORK | suncom.DebugMode.NETWORK_HEATBEAT | suncom.DebugMode.ENGINE | suncom.DebugMode.ENGINEER | suncom.DebugMode.DEBUG;
        }
        /**
         * 运行环境
         */
        Global.envMode = suncom.EnvMode.SIMULATOR;
        return Global;
    }());
    suncom.Global = Global;
})(suncom || (suncom = {}));
//# sourceMappingURL=Global.js.map