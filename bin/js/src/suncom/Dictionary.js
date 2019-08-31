var suncom;
(function (suncom) {
    /**
     * 字典
     */
    var Dictionary = /** @class */ (function () {
        function Dictionary() {
            /**
             * 数据源
             */
            this.$map = {};
        }
        /**
         * 返回字典中指定key所映射的值
         * @defaultValue: 默认值
         */
        Dictionary.prototype.get = function (key, defaultValue) {
            if (typeof key == "string" && key.length > 0) {
                if (this.$map[key] === void 0) {
                    return defaultValue;
                }
                return this.$map[key];
            }
            else {
                throw Error("Invalid Key:" + key);
            }
        };
        /**
         * 将指定值映射到字典中的指定key
         */
        Dictionary.prototype.put = function (key, value) {
            if (typeof key == "string" && key.length > 0) {
                this.$map[key] = value;
            }
            else {
                throw Error("Invalid Key:" + key);
            }
        };
        /**
         * 将指定key从字典中移除
         */
        Dictionary.prototype.remove = function (key) {
            if (typeof key == "string" && key.length > 0) {
                delete this.$map[key];
            }
            else {
                throw Error("Invalid Key:" + key);
            }
        };
        return Dictionary;
    }());
    suncom.Dictionary = Dictionary;
})(suncom || (suncom = {}));
//# sourceMappingURL=Dictionary.js.map