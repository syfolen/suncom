
module suncom {

    /**
      * 对象池
      */
    export abstract class Pool {
        /**
         * 对象集合
         */
        private static $pool: { [sign: string]: Array<any> } = {};

        /**
         * 根据标识从池中获取对象，获取失败时返回null
         */
        static getItem<T>(sign: string): T {
            const array: Array<T> = Pool.$pool[sign] || null;
            if (array !== null && array.length > 0) {
                const item = array.pop();
                item["suncore$__inPool__"] = false;
                return item;
            }
            return null;
        }

        /**
         * 根据标识从池中获取对象，获取失败时将创建新的对象
         */
        static getItemByClass<T>(sign: string, cls: any, args?: any): T {
            let item = Pool.getItem<T>(sign) as any;

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
        }

        /**
         * 根据标识回收对象
         */
        static recover(sign: string, item: any): void {
            if (item["suncore$__inPool__"] === true) {
                return;
            }
            item["suncore$__inPool__"] = true;
            const array: Array<any> = Pool.$pool[sign] || null;
            if (array === null) {
                Pool.$pool[sign] = [item];
            }
            else {
                array.push(item);
            }
        }

        /**
         * 清缓指定标识下的所有己缓存对象
         */
        static clear(sign: string): void {
            if (Pool.$pool[sign] !== void 0) {
                delete Pool.$pool[sign];
            }
        }
    }
}
