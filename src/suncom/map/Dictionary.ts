
module suncom {
    /**
     * export
     */
    export class Dictionary<T> implements IDictionary<T> {
        /**
         * 主键字段名，通过主键值来查询数据是最快的
         */
        private $var_primaryKey: number | string = null;

        /**
         * 数据表（请勿直接操作其中的数据）
         */
        private $var_dataMap: { [key: string]: T } = {};

        /**
         * export
         */
        source: T[] = [];

        /**
         * @primaryKey: 指定主键字段名，字典会使用主键值来作为数据索引，所以请确保主键值是恒值
         * export
         */
        constructor(primaryKey: number | string) {
            if (typeof primaryKey === "number") {
                primaryKey = primaryKey + "";
            }
            if (typeof primaryKey !== "string") {
                throw Error(`非法的主键字段名：${primaryKey}`);
            }
            if (primaryKey.length === 0) {
                throw Error(`无效的主键字段名字长度：${primaryKey.length}`);
            }
            this.$var_primaryKey = primaryKey;
        }

        /**
         * 根据数据在数据源中的索引来移除数据
         */
        private $func_removeByIndex(index: number): T {
            const data: T = this.source[index];
            this.source.splice(index, 1);
            const value: string = data[this.$var_primaryKey];
            delete this.$var_dataMap[value];
            return data;
        }

        /**
         * 获取数据在数据源中的索引
         */
        private $func_getIndexByValue(key: number | string, value: any): number {
            if (value === void 0) {
                return -1;
            }
            let i: number, data: T;
            for (i = 0; i < this.source.length; i++) {
                data = this.source[i];
                if (data[key] === value) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * export
         */
        put(data: T): T {
            let value: any = data[this.$var_primaryKey];
            if (Common.isStringNullOrEmpty(value) === true) {
                throw Error(`无效的主键的值，type:${typeof value}, value:${value}`);
            }
            if (this.getByPrimaryValue(value) === null) {
                this.source.push(data);
                this.$var_dataMap[value] = data;
            }
            else {
                throw Error(`重复的主键值：[${this.$var_primaryKey}]${value}`);
            }
            return data;
        }

        /**
         * export
         */
        getByValue(key: number | string, value: any): T {
            if (key === this.$var_primaryKey) {
                return this.getByPrimaryValue(value);
            }
            const index: number = this.$func_getIndexByValue(key, value);
            if (index === -1) {
                return null;
            }
            return this.source[index];
        }

        /**
         * export
         */
        getByPrimaryValue(value: number | string): T {
            return this.$var_dataMap[value.toString()] || null;
        }

        /**
         * export
         */
        remove(data: T): T {
            const index: number = this.source.indexOf(data);
            if (index === -1) {
                return data;
            }
            return this.$func_removeByIndex(index);
        }

        /**
         * export
         */
        removeByValue(key: number | string, value: any): T {
            if (key === this.$var_primaryKey) {
                return this.removeByPrimaryValue(value);
            }
            const index: number = this.$func_getIndexByValue(key, value);
            if (index === -1) {
                return null;
            }
            return this.$func_removeByIndex(index);
        }

        /**
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
         * export
         */
        clear(): void {
            this.source.length = 0;
            this.$var_dataMap = {};
        }

        /**
         * export
         */
        forEach(method: (data: T) => any): void {
            let i: number;
            for (i = 0; i < this.source.length; i++) {
                if (method(this.source[i]) === true) {
                    break;
                }
            }
        }
    }
}