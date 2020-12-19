
module suncom {
    /**
     * export
     */
    export class HashMap<K, V> implements IHashMap<K, V> {
        /**
         * 下一条数据的哈希ID
         */
        private $var_nextId: number = 0;

        /**
         * ID列表
         */
        private $var_ids: number[] = [];

        /**
         * 主键列表
         */
        private $var_keys: K[] = [];

        /**
         * 值列表
         */
        private $var_id2value: { [id: number]: V } = {};

        /**
         * 部分键值需要转化成内置的键值
         */
        private $toInnerKey(key: any): any {
            if (key === void 0) {
                return `__suncom_hashMap_innerKey__undefined__`;
            }
            if (key === null) {
                return `__suncom_hashMap_innerKey__null__`;
            }
            if (typeof key === "number" && isNaN(key) === true) {
                return `__suncom_hashMap_innerKey__isNaN__`;
            }
            return key;
        }

        /**
         * 获取主键的内置索引
         */
        private $getInnerIndex(key: any): number {
            const rkey: any = this.$toInnerKey(key);
            return this.$var_keys.indexOf(rkey);
        }

        /**
         * export
         */
        size(): number {
            return this.$var_keys.length;
        }

        /**
         * export
         */
        exist(key: any): boolean {
            return this.$getInnerIndex(key) > -1;
        }

        /**
         * export
         */
        set(key: K, value: V): V {
            const index: number = this.$getInnerIndex(key);

            let id: number;
            if (index === -1) {
                id = this.$var_nextId++;
                this.$var_ids.push(id);
                this.$var_keys.push(this.$toInnerKey(key));
            }
            else {
                id = this.$var_ids[index];
            }

            this.$var_id2value[id] = value;
            return value;
        }

        /**
         * export
         */
        get(key: K): V {
            const index: number = this.$getInnerIndex(key);
            if (index === -1) {
                return null;
            }
            const id: number = this.$var_ids[index];
            return this.$var_id2value[id];
        }

        /**
         * export
         */
        remove(key: K): V {
            const index: number = this.$getInnerIndex(key);
            if (index === -1) {
                return null;
            }
            const id: number = this.$var_ids[index];
            const value: V = this.$var_id2value[index];

            this.$var_ids.splice(index, 1);
            this.$var_keys.splice(index, 1);
            delete this.$var_id2value[id];

            return value;
        }

        /**
         * export
         */
        clear(): void {
            this.$var_ids.length = 0;
            this.$var_keys.length = 0;
            this.$var_id2value = {};
        }

        /**
         * export
         */
        forEach(method: (value: V, key?: K) => any): void {
            for (let i: number = 0; i < this.$var_ids.length; i++) {
                const id: number = this.$var_ids[i];
                if (method(this.$var_id2value[id], this.$var_keys[id]) === true) {
                    break;
                }
            }
        }
    }
}