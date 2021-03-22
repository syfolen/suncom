
module test {

    export class TestRandom {

        constructor() {
            console.log("TestRandom");

            const rand1: suncom.IRandom = new suncom.Random(1);

            const array = [
                rand1.random(),
                rand1.random(),
                rand1.random(),
                rand1.random(),
                rand1.random(),
                rand1.random(),
                rand1.random(),
                rand1.random()
            ];

            rand1.seed(1);
            const array2 = [
                rand1.random(),
                rand1.random(),
                rand1.random(),
                rand1.random(),
                rand1.random(),
                rand1.random(),
                rand1.random(),
                rand1.random()
            ];
            suncom.Test.expect(array).toEqual(array2);

            console.log(array.join(","));
            console.log(array2.join(","));

            // for (let i = 0; i < 10000000; i ++){
            //     rand1.random();
            // }
            // console.log(rand1.random());
        }
    }
}