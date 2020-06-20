

setTimeout(() => {
    suncom.Global.debugMode = 0xFFFFFF;
    new test.TestDBService();
    new test.TestEventSystem();
    new test.TestHashMap();
    new test.TestRandom();
    new test.TestHandler();
    new test.TestPool();
    new test.TestCommon();
}, 500);