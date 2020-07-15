
module suncom {
    /**
     * 对象池
     * export
     */
    export namespace Pool {
        /**
         * 对象集合
         */
        const $pool: { [sign: string]: any[] } = {};

        /**
         * 根据标识从池中获取对象，获取失败时返回null
         * export
         */
        export function getItem(sign: string): any {
            const array: any[] = $pool[sign] || null;
            if (array === null || array.length === 0) {
                return null;
            }
            const item: any = array.pop();
            delete item["__suncom__$__inPool__"];
            return item;
        }

        /**
         * 根据标识从池中获取对象，获取失败时将创建新的对象
         * @cls: 对象类型，支持Laya.Prefab
         * @args: 构造函数参数列表，若cls为Laya.Prefab，则args应当为字符串
         * export
         */
        export function getItemByClass(sign: string, cls: any, args?: any): any {
            let item: any = Pool.getItem(sign);
            if (item === null) {
                if (Laya.Prefab !== void 0 && cls === Laya.Prefab) {
                    const prefab: Laya.Prefab = new Laya.Prefab();
                    prefab.json = args;
                    item = prefab.create();
                }
                else {
                    item = {};
                    item.__proto__ = cls.prototype;
                    if (args instanceof Array) {
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
         * export
         */
        export function recover(sign: string, item: any): void {
            if (item["__suncom__$__inPool__"] === true) {
                return;
            }
            item["__suncom__$__inPool__"] = true;
            const array: any[] = $pool[sign] || null;
            if (array === null) {
                $pool[sign] = [item];
            }
            else {
                array.push(item);
            }
        }

        /**
         * 清缓指定标识下的所有己缓存对象
         * export
         */
        export function clear(sign: string): void {
            if ($pool[sign] !== void 0) {
                delete $pool[sign];
            }
        }
    }
}
