var suncom;
(function (suncom) {
    /**
     * 对象池
     * export
     */
    var Pool;
    (function (Pool) {
        /**
         * 对象集合
         */
        var $pool = {};
        /**
         * 根据标识从池中获取对象，获取失败时返回null
         * @sign: 对象标识
         * export
         */
        function getItem(sign) {
            var array = $pool[sign] || null;
            if (array !== null && array.length > 0) {
                var item = array.pop();
                delete item["__suncom__$__inPool__"];
                return item;
            }
            return null;
        }
        Pool.getItem = getItem;
        /**
         * 根据标识从池中获取对象，获取失败时将创建新的对象
         * @sign: 对象标识
         * @cls: 对象类型，支持Laya.Prefab
         * @args: 构造函数参数列表，若cls为Laya.Prefab，则args应当为字符串
         * export
         */
        function getItemByClass(sign, cls, args) {
            var item = Pool.getItem(sign);
            if (item === null) {
                if (Laya.Prefab !== void 0 && cls === Laya.Prefab) {
                    var prefab = new Laya.Prefab();
                    prefab.json = Laya.Loader.getRes(args[0]);
                    item = prefab.create();
                }
                else {
                    item = {};
                    item.__proto__ = cls.prototype;
                    if (args === void 0) {
                        cls.call(item);
                    }
                    else if (args instanceof Array === false) {
                        cls.call(item, args);
                    }
                    else {
                        cls.apply(item, args);
                    }
                }
            }
            return item;
        }
        Pool.getItemByClass = getItemByClass;
        /**
         * 根据标识回收对象
         * export
         */
        function recover(sign, item) {
            if (item["__suncom__$__inPool__"] === true) {
                return;
            }
            item["__suncom__$__inPool__"] = true;
            var array = $pool[sign] || null;
            if (array === null) {
                $pool[sign] = [item];
            }
            else {
                array.push(item);
            }
        }
        Pool.recover = recover;
        /**
         * 清缓指定标识下的所有己缓存对象
         * export
         */
        function clear(sign) {
            if ($pool[sign] !== void 0) {
                delete $pool[sign];
            }
        }
        Pool.clear = clear;
    })(Pool = suncom.Pool || (suncom.Pool = {}));
})(suncom || (suncom = {}));
//# sourceMappingURL=Pool.js.map