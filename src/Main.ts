

setTimeout(() => {
    suncom.Global.debugMode = 0xFFFFFF;
    new test.TestDBService();
    new test.TestEventSystem();
    new test.TestHashMap();
    new test.TestRandom();
    new test.TestHandler();
    new test.TestPool();
    new test.TestCommon();
    suncom.Test.expect(suncom.Std.getQueryString("name", "&id=5&name=xxx&t=12")).toBe("xxx");
}, 500);