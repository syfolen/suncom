
module suncom {
    /**
     * 常用类型声明
     * export
     */
    export type NumberOrString = number | string;

    /**
     * export
     */
    export type KVNumber2Number = { [key: number]: number };
    /**
     * export
     */
    export type KVNumber2String = { [key: number]: string };
    /**
     * export
     */
    export type KVNumber2Boolean = { [key: number]: boolean };

    /**
     * export
     */
    export type KVString2Number = { [key: string]: number };
    /**
     * export
     */
    export type KVString2String = { [key: string]: string };
    /**
     * export
     */
    export type KVString2Boolean = { [key: string]: boolean };

    /**
     * export
     */
    export type KVNumber2Object<T> = { [key: number]: T };
    /**
     * export
     */
    export type KVString2Object<T> = { [key: string]: T };
}