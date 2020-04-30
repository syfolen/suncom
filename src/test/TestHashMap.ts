
module test {

    export class TestHashMap {

        constructor() {
            console.log("TestHashMap");

            const hashMap: suncom.IHashMap<any> = new suncom.HashMap("id");

            const x = { id: 9, name: "yes" };
            const y = { id: 11, name: "no" };
            const z = { name: "ok" };

            hashMap.put(x);
            hashMap.put(y);
            try {
                hashMap.put(z);
                suncom.Test.notExpected();
            }
            catch (error) {

            }

            let count: number = 0;
            hashMap.forEach((data) => {
                count++;
            });
            suncom.Test.expect(count).toBe(2);
            suncom.Test.expect(hashMap.getByPrimaryValue(9)).not.toBeNull();
            suncom.Test.expect(hashMap.getByValue("name", "yes")).not.toBeNull();
            hashMap.removeByPrimaryValue(9);
            suncom.Test.expect(hashMap.getByPrimaryValue(9)).toBeNull();
            hashMap.removeByValue("name", "no");
            suncom.Test.expect(hashMap.getByValue("name", "yes")).toBeNull();

            hashMap.put(x);
            suncom.Test.expect(hashMap.getByPrimaryValue(9)).not.toBeNull();
            hashMap.remove(x);
            suncom.Test.expect(hashMap.getByPrimaryValue(9)).toBeNull();

            hashMap.put(x);
            hashMap.put(y);
            suncom.Test.expect(hashMap.getByValue("name", "a")).toBeNull();
            suncom.Test.expect(hashMap.getByValue("abc", "a")).toBeNull();
            suncom.Test.expect(hashMap.getByPrimaryValue(1)).toBeNull();

            suncom.Test.expect(hashMap.removeByValue("name", "a")).toBeNull();
            suncom.Test.expect(hashMap.removeByPrimaryValue(1)).toBeNull();
        }
    }
}