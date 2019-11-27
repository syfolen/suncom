var suncom;
(function (suncom) {
    /**
     * 线性同余发生器
     * export
     */
    var Random;
    (function (Random) {
        /**
         * 随机种子
         */
        var $r = 1;
        /**
         * 随机数参数
         */
        var $A = 1103515245;
        var $C = 12345;
        var $M = 32767;
        /**
         * 指定随机种子
         * export
         */
        function seed(value) {
            $r = value;
        }
        Random.seed = seed;
        /**
         * 返回一个随机数
         * export
         */
        function random() {
            var r = dcodeIO.Long.fromNumber($r);
            var A = dcodeIO.Long.fromNumber($A);
            var C = dcodeIO.Long.fromNumber($C);
            $r = Math.floor(r.mul(A).add(C).low / $M);
            return ($r % $M + $M) / ($M * 2);
        }
        Random.random = random;
    })(Random = suncom.Random || (suncom.Random = {}));
})(suncom || (suncom = {}));
//# sourceMappingURL=Random.js.map