
module test {

    export class TestRandom {

        constructor() {
            console.log("test Random");

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
            this.$aEqualsB(array, array2);

            // console.log(array.join(","));

            // for (let i = 0; i < 10000000; i ++){
            //     suncom.Random.random();
            // }
            // console.log(suncom.Random.random());
        }

        private $aEqualsB<T>(a: T[], b: T[]): void {
            a = a.slice();
            b = b.slice();
            a.sort();
            b.sort();
            console.assert(a.length === b.length, `当前：[${a.join(",")}], 预期：[${b.join(",")}]`);
            for (let i = 0; i < a.length; i++) {
                console.assert(a[i] === b[i], `当前：[${a.join(",")}], 预期：[${b.join(",")}]`);
            }
        }
    }
}