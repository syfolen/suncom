
module test {

    export class TestRandom {

        constructor() {
            console.log("TestRandom");

            suncom.Random.seed(1);

            const array = [
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random()
            ];

            suncom.Random.seed(1);
            const array2 = [
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random(),
                suncom.Random.random()
            ];
            suncom.Test.expect(array).toEqual(array2);

            // console.log(array.join(","));

            // for (let i = 0; i < 10000000; i ++){
            //     suncom.Random.random();
            // }
            // console.log(suncom.Random.random());
        }
    }
}