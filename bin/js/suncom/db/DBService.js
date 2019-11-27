var suncom;
(function (suncom) {
    /**
     * 伪数据库服务
     * export
     */
    var DBService;
    (function (DBService) {
        /**
         * 数据表
         */
        var $table = {};
        /**
         * 获取数据
         * export
         */
        function get(name) {
            return $table[name];
        }
        DBService.get = get;
        /**
         * 存储数据
         * export
         */
        function put(name, data) {
            $table[name] = data;
        }
        DBService.put = put;
        /**
         * 删除数据
         * export
         */
        function drop(name) {
            delete $table[name];
        }
        DBService.drop = drop;
    })(DBService = suncom.DBService || (suncom.DBService = {}));
})(suncom || (suncom = {}));
//# sourceMappingURL=DBService.js.map