
module test {

    export class TestDBService {

        constructor() {
            console.log("test DBService");
            suncom.DBService.put(1, 5);
            console.assert(suncom.DBService.exist(1) === true, `存储数据失败`);
            console.assert(suncom.DBService.get(1) === 5, `数据存储失败`);
            suncom.DBService.drop(1);
            console.assert(suncom.DBService.exist(1) === false, `数据移除失败`);

            suncom.DBService.put(1, null);
            console.assert(suncom.DBService.exist(1) === true, `存储数据失败`);
            console.assert(suncom.DBService.get(1) === null, `数据存储失败`);
            suncom.DBService.drop(1);
            console.assert(suncom.DBService.exist(1) === false, `数据移除失败`);

            const data = {};
            suncom.DBService.put(-1, data);
            console.assert(suncom.DBService.get(-1) === void 0, `不应该能通过特殊键值获取对象`);
            console.assert(suncom.DBService.get("auto_1" as any) === data, `通过特殊键值存储数据失败`);
            console.assert(suncom.DBService.exist("auto_1" as any) === true, `通过特殊键值存储数据失败`);
        }
    }
}