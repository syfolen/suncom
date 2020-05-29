
module suncom {
    /**
     * 哈希表接口，通常用于作为一个大量数据的集合，用于快速获取数据集中的某条数据
     * export
     */
    export class HashMap<T> implements IHashMap<T> {
        /**
         * 主键字段名，通过主键值来查询数据是最快的
         */
        private $primaryKey: number | string;

        /**
         * 数据源（请勿直接操作其中的数据）
         * export
         */
        source: T[] = [];

        /**
         * 哈希表（请勿直接操作其中的数据）
         */
        dataMap: { [key: string]: T } = {};

        /**
         * @primaryKey: 指定主键字段名，哈希表会使用主键值来作为数据索引，所以请确保主键值是恒值
         * export
         */
        constructor(primaryKey: number | string) {
            if (typeof primaryKey === "number") {
                primaryKey = primaryKey.toString();
            }
            if (typeof primaryKey !== "string") {
                throw Error(`非法的主键字段名：${primaryKey}`);
            }
            if (primaryKey.length == 0) {
                throw Error(`无效的主键字段名字长度：${primaryKey.length}`);
            }
            else {
                this.$primaryKey = primaryKey;
            }
        }

        /**
         * 根据数据在数据源中的索引来移除数据
         */
        private $removeByIndex(index: number): T {
            const data: T = this.source[index];
            this.source.splice(index, 1);
            const value: string = data[this.$primaryKey];
            delete this.dataMap[value];
            return data;
        }

        /**
         * 获取数据在数据源中的索引
         */
        private $getIndexByValue(key: string, value: any): number {
            if (value === void 0) {
                return -1;
            }
            for (let i: number = 0; i < this.source.length; i++) {
                const data: T = this.source[i];
                if (data[key] === value) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * 添加数据
         * export
         */
        put(data: T): T {
            let value: any = data[this.$primaryKey];
            if (typeof value === "number") {
                value = value.toString();
            }
            suncom.Test.expect(typeof value).interpret(`主键的值类型错误：${typeof value}，只允许使用Number或String类型`).toBe("string");
            suncom.Test.expect(this.getByPrimaryValue(value)).interpret(`重复的主键值：[${this.$primaryKey}]${value}`).toBeNull();
            this.source.push(data);
            this.dataMap[value] = data;
            return data;
        }

        /**
         * 移除数据
         * export
         */
        remove(data: T): T {
            const index: number = this.source.indexOf(data);
            if (index === -1) {
                return data;
            }
            else {
                return this.$removeByIndex(index);
            }
        }

        /**
         * 根据键值返回数据
         * export
         */
        getByValue(key: string, value: any): T {
            if (key === this.$primaryKey) {
                return this.getByPrimaryValue(value);
            }
            const index: number = this.$getIndexByValue(key, value);
            if (index === -1) {
                return null;
            }
            return this.source[index];
        }

        /**
         * 根据主键值快速返回数据
         * export
         */
        getByPrimaryValue(value: number | string): T {
            return this.dataMap[value] || null;
        }

        /**
         * 根据键值移除数据
         * export
         */
        removeByValue(key: string, value: any): T {
            const index: number = this.$getIndexByValue(key, value);
            if (index === -1) {
                return null;
            }
            else {
                return this.$removeByIndex(index);
            }
        }

        /**
         * 根据主键值移除数据
         * export
         */
        removeByPrimaryValue(value: number | string): T {
            const data: T = this.getByPrimaryValue(value);
            if (data === null) {
                return null;
            }
            return this.remove(data);
        }

        /**
         * 为每个数据执行方法（谨慎在此方法中新增或移除数据）
         * 若method返回true，则会中断遍历
         * export
         */
        forEach(method: (data: T) => any): void {
            const source: T[] = this.source.slice(0);
            for (let i: number = 0; i < source.length; i++) {
                if (method(source[i]) === true) {
                    break;
                }
            }
        }
    }
}