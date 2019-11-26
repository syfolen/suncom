var suncom;
(function (suncom) {
    /**
     * 环境模式，主要用于代码的版本控制
     * export
     */
    var EnvMode;
    (function (EnvMode) {
        /**
         * 模拟器
         * export
         */
        EnvMode[EnvMode["SIMULATOR"] = 0] = "SIMULATOR";
    })(EnvMode = suncom.EnvMode || (suncom.EnvMode = {}));
})(suncom || (suncom = {}));
//# sourceMappingURL=EnvMode.js.map