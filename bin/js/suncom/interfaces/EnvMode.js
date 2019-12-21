var suncom;
(function (suncom) {
    /**
     * 环境模式，主要用于代码的版本控制
     * export
     */
    var EnvMode;
    (function (EnvMode) {
        /**
         * 开发环境
         * export
         */
        EnvMode[EnvMode["DEVELOP"] = 0] = "DEVELOP";
        /**
         * 调试模式
         * export
         */
        EnvMode[EnvMode["DEBUG"] = 1] = "DEBUG";
        /**
         * 网页版
         * export
         */
        EnvMode[EnvMode["WEB"] = 2] = "WEB";
    })(EnvMode = suncom.EnvMode || (suncom.EnvMode = {}));
})(suncom || (suncom = {}));
//# sourceMappingURL=EnvMode.js.map