
module suncom {

    /**
     * 字典
     */
    export class Dictionary implements IDictionary {
        /**
         * 数据源
         */
        private $map: { [key: string]: any } = {};

        /**
         * 返回字典中指定key所映射的值
         * @defaultValue: 默认值
         */
        get(key: string, defaultValue?: any): any {
            if (typeof key == "string" && key.length > 0) {
                if (this.$map[key] === void 0) {
                    return defaultValue;
                }
                return this.$map[key];
            }
            else {
                throw Error("Invalid Key:" + key);
            }
        }

        /**
         * 将指定值映射到字典中的指定key
         */
        put(key: string, value: any): void {
            if (typeof key == "string" && key.length > 0) {
                this.$map[key] = value;
            }
            else {
                throw Error("Invalid Key:" + key);
            }
        }

        /**
         * 将指定key从字典中移除
         */
        remove(key: string): void {
            if (typeof key == "string" && key.length > 0) {
                delete this.$map[key];
            }
            else {
                throw Error("Invalid Key:" + key);
            }
        }
    }
}