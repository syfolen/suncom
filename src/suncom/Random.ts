
module suncom {

    /**
     * 线性同余发生器
     * export
     */
    export abstract class Random {
        /**
         * 随机种子
         */
        private static $r: number = 1;

        /**
         * 随机数参数
         */
        private static $A: number = 1103515245;
        private static $C: number = 12345;
        private static $M: number = 32767;

        /**
         * 指定随机种子
         * export
         */
        static seed(value: number): void {
            Random.$r = value;
        }

        /**
         * 返回一个随机数
         * export
         */
        static random(): number {
            const r: dcodeIO.Long = dcodeIO.Long.fromNumber(Random.$r);
            const A: dcodeIO.Long = dcodeIO.Long.fromNumber(Random.$A);
            const C: dcodeIO.Long = dcodeIO.Long.fromNumber(Random.$C);
            Random.$r = Math.floor(r.mul(A).add(C).low / Random.$M);
            return (Random.$r % Random.$M + Random.$M) / (Random.$M * 2);
        }
    }
}