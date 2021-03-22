
module suncom {
    /**
     * 线性同余发生器
     * export
     */
    export class Random implements IRandom {
        /**
         * 随机种子
         */
        private $r: number = 1;

        /**
         * 随机数参数
         */
        private $A: number = 1103515245;
        private $C: number = 12345;
        private $M: number = 32767;

        /**
         * @r：随机种子，默认为：1
         * export
         */
        constructor(r: number = 1) {
            this.$r = r;
        }

        /**
         * export
         */
        seed(value: number): void {
            this.$r = Math.max(1, value);
        }

        /**
         * export
         */
        random(): number {
            const r: dcodeIO.Long = dcodeIO.Long.fromNumber(this.$r);
            const A: dcodeIO.Long = dcodeIO.Long.fromNumber(this.$A);
            const C: dcodeIO.Long = dcodeIO.Long.fromNumber(this.$C);
            this.$r = Math.floor(r.mul(A).add(C).low / this.$M);
            return (this.$r % this.$M + this.$M) / (this.$M * 2);
        }


        /**
         * export
         */
        randomInt(min: number, max: number): number {
            const value: number = this.random() * (max - min);
            return Math.floor(value) + min;
        }

        /**
         * export
         */
        get r(): number {
            return this.$r;
        }
    }
}