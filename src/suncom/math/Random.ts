
module suncom {
    /**
     * 线性同余发生器
     * export
     */
    export namespace Random {
        /**
         * 随机种子
         */
        let $r: number = 1;

        /**
         * 随机数参数
         */
        let $A: number = 1103515245;
        let $C: number = 12345;
        let $M: number = 32767;

        /**
         * 指定随机种子
         * export
         */
        export function seed(value: number): void {
            if (value < 1) {
                throw Error("随机种子不允许小于1");
            }
            $r = value;
        }

        /**
         * 返回一个随机数
         * export
         */
        export function random(): number {
            const r: dcodeIO.Long = dcodeIO.Long.fromNumber($r);
            const A: dcodeIO.Long = dcodeIO.Long.fromNumber($A);
            const C: dcodeIO.Long = dcodeIO.Long.fromNumber($C);
            $r = Math.floor(r.mul(A).add(C).low / $M);
            return ($r % $M + $M) / ($M * 2);
        }
    }
}