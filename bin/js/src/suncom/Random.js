var suncom;
(function (suncom) {
    /**
     * 线性同余发生器
     */
    var Random = /** @class */ (function () {
        function Random() {
        }
        /**
         * 指定随机种子
         */
        Random.seed = function (value) {
            Random.$r = value;
        };
        /**
         * 返回一个随机数
         */
        Random.random = function () {
            var r = dcodeIO.Long.fromNumber(Random.$r);
            var A = dcodeIO.Long.fromNumber(Random.$A);
            var C = dcodeIO.Long.fromNumber(Random.$C);
            Random.$r = Math.floor(r.mul(A).add(C).low / Random.$M);
            return (Random.$r % Random.$M + Random.$M) / (Random.$M * 2);
        };
        /**
         * 随机种子
         */
        Random.$r = 1;
        /**
         * 随机数参数
         */
        Random.$A = 1103515245;
        Random.$C = 12345;
        Random.$M = 32767;
        return Random;
    }());
    suncom.Random = Random;
})(suncom || (suncom = {}));
//# sourceMappingURL=Random.js.map