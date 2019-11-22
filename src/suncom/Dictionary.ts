
module suncom {

    /**
     * 字典
     * export
     */
    export class Dictionary<T> implements IDictionary<T> {
        /**
         * 主键字段名
         */
        private $primaryKey: number | string;

        /**
         * 数据源（请勿直接操作其中的数据）
         * export
         */
        source: Array<T> = [];

        /**
         * 哈希表（请勿直接操作其中的数据）
         */
        dataMap: { [key: string]: T } = {};

        /**
         * @primaryKey: 指定主键字段名，字典会使用主键值来建立数据源与哈希表之间的映射关系，所以请确保主键值是恒值
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
            if (index === -1) {
                return null;
            }
            const data = this.source[index];
            this.source.splice(index, 1);
            const value = data[this.$primaryKey];
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
            for (let i = 0, length = this.source.length; i < length; i++) {
                const data = this.source[i];
                if (data[key] === void 0) {
                    continue;
                }
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
            let value = data[this.$primaryKey];
            if (typeof value === "number") {
                value = value.toString();
            }
            if (typeof value !== "string") {
                throw Error(`主键的值类型错误：${typeof value}，只允许使用Number或String类型`);
            }
            if (this.getByPrimaryValue(value) === null) {
                this.source.push(data);
                this.dataMap[value] = data;
            }
            else {
                throw Error(`重复的主键值：[${this.$primaryKey}]${value}`);
            }
            return data;
        }

        /**
         * 移除数据
         * export
         */
        remove(data: T): T {
            const index = this.source.indexOf(data);
            return this.$removeByIndex(index);
        }

        /**
         * 根据键值返回数据
         * export
         */
        getByValue(key: string, value: any): T {
            if (key === this.$primaryKey) {
                return this.getByPrimaryValue(value);
            }

            const index = this.$getIndexByValue(key, value);
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
            const index = this.$getIndexByValue(key, value);
            return this.$removeByIndex(index);
        }

        /**
         * 根据主键值移除数据
         * export
         */
        removeByPrimaryValue(value: number | string): T {
            const data = this.getByPrimaryValue(value);
            return this.remove(data);
        }

        /**
         * 为每个数据执行方法（谨慎在此方法中新增或移除数据）
         * 若method返回true，则会中断遍历
         * export
         */
        forEach(method: (data: T) => any): void {
            const source = this.source.slice(0);
            for (let i = 0, length = source.length; i < length; i++) {
                if (method(source[i]) === true) {
                    break;
                }
            }
        }
    }
}