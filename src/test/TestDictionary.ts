
module test {

    export class TestDictionary {

        constructor() {
            console.log("TestHashMap");

            const dictionary: suncom.IDictionary<any> = new suncom.Dictionary("id");

            const x = { id: 9, name: "yes" };
            const y = { id: 11, name: "no" };
            const z = { name: "ok" };

            dictionary.put(x);
            dictionary.put(y);
            try {
                dictionary.put(z);
                suncom.Test.notExpected();
            }
            catch (error) {

            }

            let count: number = 0;
            dictionary.forEach((data) => {
                count++;
            });
            suncom.Test.expect(count).toBe(2);
            suncom.Test.expect(dictionary.getByPrimaryValue(9)).not.toBeNull();
            suncom.Test.expect(dictionary.getByValue("name", "yes")).not.toBeNull();
            dictionary.removeByPrimaryValue(9);
            suncom.Test.expect(dictionary.getByPrimaryValue(9)).toBeNull();
            dictionary.removeByValue("name", "no");
            suncom.Test.expect(dictionary.getByValue("name", "yes")).toBeNull();

            dictionary.put(x);
            suncom.Test.expect(dictionary.getByPrimaryValue(9)).not.toBeNull();
            dictionary.remove(x);
            suncom.Test.expect(dictionary.getByPrimaryValue(9)).toBeNull();

            dictionary.put(x);
            dictionary.put(y);
            suncom.Test.expect(dictionary.getByValue("name", "a")).toBeNull();
            suncom.Test.expect(dictionary.getByValue("abc", "a")).toBeNull();
            suncom.Test.expect(dictionary.getByPrimaryValue(1)).toBeNull();

            suncom.Test.expect(dictionary.removeByValue("name", "a")).toBeNull();
            suncom.Test.expect(dictionary.removeByPrimaryValue(1)).toBeNull();
        }
    }
}