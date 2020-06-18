
module test {

    export class TestDBService {

        constructor() {
            console.log("TestDBService");

            suncom.DBService.put(1, 5);
            suncom.Test.assertTrue(suncom.DBService.exist(1));
            suncom.Test.expect(suncom.DBService.get<number>(1)).toBe(5);
            suncom.DBService.drop(1);
            suncom.Test.assertFalse(suncom.DBService.exist(1));

            suncom.DBService.put(1, null);
            suncom.Test.assertTrue(suncom.DBService.exist(1));
            suncom.Test.expect(suncom.DBService.get<number>(1)).toBeNull();
            suncom.DBService.drop(1);
            suncom.Test.assertFalse(suncom.DBService.exist(1));

            const data = {};
            suncom.DBService.put(-1, data);
            suncom.Test.expect(suncom.DBService.get<any>(-1)).toBeUndefined();
            suncom.Test.expect(suncom.DBService.get<any>("auto_1" as any)).toBe(data);
            suncom.Test.assertTrue(suncom.DBService.exist("auto_1" as any));
        }
    }
}