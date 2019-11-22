var suncom;
(function (suncom) {
    /**
     * 对象池
     * export
     */
    var Pool = /** @class */ (function () {
        function Pool() {
        }
        /**
         * 根据标识从池中获取对象，获取失败时返回null
         * export
         */
        Pool.getItem = function (sign) {
            var array = Pool.$pool[sign] || null;
            if (array !== null && array.length > 0) {
                var item = array.pop();
                item["suncore$__inPool__"] = false;
                return item;
            }
            return null;
        };
        /**
         * 根据标识从池中获取对象，获取失败时将创建新的对象
         * export
         */
        Pool.getItemByClass = function (sign, cls, args) {
            var item = Pool.getItem(sign);
            if (item === null) {
                if (Laya["Prefab"] !== void 0 && args === Laya["Prefab"]) {
                    item = cls.create();
                }
                else {
                    item = {};
                    item.__proto__ = cls.prototype;
                    if (args === void 0) {
                        cls.call(item);
                    }
                    else if (args instanceof Array) {
                        cls.apply(item, args);
                    }
                    else {
                        cls.call(item, args);
                    }
                }
            }
            return item;
        };
        /**
         * 根据标识回收对象
         * export
         */
        Pool.recover = function (sign, item) {
            if (item["suncore$__inPool__"] === true) {
                return;
            }
            item["suncore$__inPool__"] = true;
            var array = Pool.$pool[sign] || null;
            if (array === null) {
                Pool.$pool[sign] = [item];
            }
            else {
                array.push(item);
            }
        };
        /**
         * 清缓指定标识下的所有己缓存对象
         * export
         */
        Pool.clear = function (sign) {
            if (Pool.$pool[sign] !== void 0) {
                delete Pool.$pool[sign];
            }
        };
        /**
         * 对象集合
         */
        Pool.$pool = {};
        return Pool;
    }());
    suncom.Pool = Pool;
})(suncom || (suncom = {}));
//# sourceMappingURL=Pool.js.map