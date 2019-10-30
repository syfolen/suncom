
module suncom {

    /**
     * 字典接口
     */
    export interface IDictionary<T> {
        /**
         * 数据源（请勿直接操作其中的数据）
         */
        source: Array<T>;

        /**
         * 哈希表（请勿直接操作其中的数据）
         */
        dataMap: { [key: string]: T };

        /**
         * 添加数据
         */
        put(data: T): T;

        /**
         * 移除数据
         */
        remove(data: T): T;

        /**
         * 根据键值返回数据
         */
        getByValue(key: string, value: any): T;

        /**
         * 根据主键值快速返回数据
         */
        getByPrimaryValue(value: number | string): T;

        /**
         * 根据键值移除数据
         */
        removeByValue(key: string, value: any): T;

        /**
         * 根据主键值移除数据
         */
        removeByPrimaryValue(value: number | string): T;

        /**
         * 为每个数据执行方法（谨慎在此方法中新增或移除数据）
         * 若method返回true，则会中断遍历
         */
        forEach(method: (data: T) => any): void;
    }
}