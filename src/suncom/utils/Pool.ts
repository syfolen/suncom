
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
         * 对象键名与键值集合
         */
        const $inPoolValueMap: { [sign: string]: IPoolItemKeyValue } = {};

        /**
         * 根据标识从池中获取对象，获取失败时返回null
         * export
         */
        export function getItem<T>(sign: string): T {
            const array: T[] = $pool[sign];
            if (array === void 0 || array.length === 0) {
                return null;
            }
            const item: T = array.pop();
            const ipv: IPoolItemKeyValue = $inPoolValueMap[sign];
            // 若InPoolValue不存在，则仅移除简单标记
            if (ipv === void 0) {
                delete item["__suncom__$__inPool__"];
            }
            else if (item[ipv.key] !== ipv.inPoolValue) {
                throw Error(`对象[${Common.getQualifiedClassName(item)}]的属性{${ipv.key}}的值在被对象池回收之后发生过变更！`);
            }
            else {
                item[ipv.key] = ipv.defaultValue;
            }
            return item;
        }

        /**
         * 根据标识从池中获取对象，获取失败时将创建新的对象
         * @cls: 对象类型，支持Laya.Prefab
         * @args: 构造函数参数列表，若cls为Laya.Prefab，则args应当为字符串
         * 说明：
         * 1. 通过此方法创建的对象，通过setKeyValue指定的属性亦会被重置为defaultValue
         * export
         */
        export function getItemByClass<T>(sign: string, cls: any, args?: any): T {
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
                const ipv: IPoolItemKeyValue = $inPoolValueMap[sign];
                if (ipv !== void 0 && ipv.defaultValue !== void 0) {
                    item[ipv.key] = ipv.defaultValue;
                }
            }
            return item;
        }

        /**
         * 根据标识回收对象
         * @return: 成功入池时返回: true, 否则返回: false
         * export
         */
        export function recover(sign: string, item: any): boolean {
            const ipv: IPoolItemKeyValue = $inPoolValueMap[sign];
            // 若InPoolValue不存在，则仅进行简单标记
            if (ipv === void 0) {
                if (item["__suncom__$__inPool__"] === true) {
                    return false;
                }
                item["__suncom__$__inPool__"] = true;
            }
            else {
                if (item[ipv.key] === ipv.inPoolValue) {
                    return false;
                }
                item[ipv.key] = ipv.inPoolValue;
            }
            const array: any[] = $pool[sign];
            if (array === void 0) {
                $pool[sign] = [item];
            }
            else {
                array.push(item);
            }
            return true;
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

        /**
         * 指定对象的键值（此方法可确保池中对象的安全性）
         * @inPoolValue: 对象在池中的属性值
         * @defaultValue: 对象出池时的默认属性值
         * 说明：
         * 1. 当对象入池时，对象中的指定属性将被设置成指定值
         * 2. 对象出池前，会对对象中的指定属性进行判断，若不为指定值，则视不安全对象
         * 3. inPoolValue与defaultValue不可使用相同值
         * 4. 仅第一次调用时生效
         * export
         */
        export function setKeyValue(sign: string, key: string, inPoolValue: number | string, defaultValue?: number | string): void {
            if ($inPoolValueMap[sign] !== void 0) {
                return;
            }
            if (inPoolValue === defaultValue) {
                throw Error(`不可指定相同的属性值`);
            }
            const ipv: IPoolItemKeyValue = {
                key: key,
                inPoolValue: inPoolValue,
                defaultValue: defaultValue
            };
            $inPoolValueMap[sign] = ipv;
        }
    }
}
