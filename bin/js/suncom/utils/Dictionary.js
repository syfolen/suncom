var suncom;
(function (suncom) {
    /**
     * 字典接口，通常用于作为一个大量数据的集合，用于快速获取数据集中的某条数据
     * export
     */
    var Dictionary = /** @class */ (function () {
        /**
         * @primaryKey: 指定主键字段名，字典会使用主键值来作为数据索引，所以请确保主键值是恒值
         * export
         */
        function Dictionary(primaryKey) {
            /**
             * 数据源（请勿直接操作其中的数据）
             * export
             */
            this.source = [];
            /**
             * 哈希表（请勿直接操作其中的数据）
             */
            this.dataMap = {};
            if (typeof primaryKey === "number") {
                primaryKey = primaryKey.toString();
            }
            if (typeof primaryKey !== "string") {
                throw Error("\u975E\u6CD5\u7684\u4E3B\u952E\u5B57\u6BB5\u540D\uFF1A" + primaryKey);
            }
            if (primaryKey.length == 0) {
                throw Error("\u65E0\u6548\u7684\u4E3B\u952E\u5B57\u6BB5\u540D\u5B57\u957F\u5EA6\uFF1A" + primaryKey.length);
            }
            else {
                this.$primaryKey = primaryKey;
            }
        }
        /**
         * 根据数据在数据源中的索引来移除数据
         */
        Dictionary.prototype.$removeByIndex = function (index) {
            var data = this.source[index];
            this.source.splice(index, 1);
            var value = data[this.$primaryKey];
            delete this.dataMap[value];
            return data;
        };
        /**
         * 获取数据在数据源中的索引
         */
        Dictionary.prototype.$getIndexByValue = function (key, value) {
            if (value === void 0) {
                return -1;
            }
            for (var i = 0; i < this.source.length; i++) {
                var data = this.source[i];
                if (data[key] === value) {
                    return i;
                }
            }
            return -1;
        };
        /**
         * 添加数据
         * export
         */
        Dictionary.prototype.put = function (data) {
            var value = data[this.$primaryKey];
            if (typeof value === "number") {
                value = value.toString();
            }
            if (typeof value !== "string") {
                throw Error("\u4E3B\u952E\u7684\u503C\u7C7B\u578B\u9519\u8BEF\uFF1A" + typeof value + "\uFF0C\u53EA\u5141\u8BB8\u4F7F\u7528Number\u6216String\u7C7B\u578B");
            }
            if (this.getByPrimaryValue(value) === null) {
                this.source.push(data);
                this.dataMap[value] = data;
            }
            else {
                throw Error("\u91CD\u590D\u7684\u4E3B\u952E\u503C\uFF1A[" + this.$primaryKey + "]" + value);
            }
            return data;
        };
        /**
         * 移除数据
         * export
         */
        Dictionary.prototype.remove = function (data) {
            var index = this.source.indexOf(data);
            if (index === -1) {
                return data;
            }
            else {
                return this.$removeByIndex(index);
            }
        };
        /**
         * 根据键值返回数据
         * export
         */
        Dictionary.prototype.getByValue = function (key, value) {
            if (key === this.$primaryKey) {
                return this.getByPrimaryValue(value);
            }
            var index = this.$getIndexByValue(key, value);
            if (index === -1) {
                return null;
            }
            return this.source[index];
        };
        /**
         * 根据主键值快速返回数据
         * export
         */
        Dictionary.prototype.getByPrimaryValue = function (value) {
            return this.dataMap[value] || null;
        };
        /**
         * 根据键值移除数据
         * export
         */
        Dictionary.prototype.removeByValue = function (key, value) {
            var index = this.$getIndexByValue(key, value);
            if (index === -1) {
                return null;
            }
            else {
                return this.$removeByIndex(index);
            }
        };
        /**
         * 根据主键值移除数据
         * export
         */
        Dictionary.prototype.removeByPrimaryValue = function (value) {
            var data = this.getByPrimaryValue(value);
            if (data === null) {
                return null;
            }
            return this.remove(data);
        };
        /**
         * 为每个数据执行方法（谨慎在此方法中新增或移除数据）
         * 若method返回true，则会中断遍历
         * export
         */
        Dictionary.prototype.forEach = function (method) {
            var source = this.source.slice(0);
            for (var i = 0; i < source.length; i++) {
                if (method(source[i]) === true) {
                    break;
                }
            }
        };
        return Dictionary;
    }());
    suncom.Dictionary = Dictionary;
})(suncom || (suncom = {}));
//# sourceMappingURL=Dictionary.js.map