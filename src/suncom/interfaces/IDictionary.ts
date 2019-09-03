
module suncom {

    /**
     * 字典接口
     */
    export interface IDictionary {

        /**
         * 返回字典中指定key所映射的值
         * @defaultValue: 默认值
         */
        get(key: string, defaultValue?: any): any;

        /**
         * 将指定值映射到字典中的指定key
         */
        put(key: string, value: any): void;

        /**
         * 将指定key从字典中移除
         */
        remove(key: string): void;
    }
}