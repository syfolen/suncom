
module test {

    export class TestHashMap {

        constructor() {
            console.log("test HashMap");
            const hashMap: suncom.IHashMap<any> = new suncom.HashMap("id");

            const x = { id: 9, name: "yes" };
            const y = { id: 11, name: "no" };
            const z = { name: "ok" };

            hashMap.put(x);
            hashMap.put(y);
            try {
                hashMap.put(z);
                console.assert(false, `存储非法数据，找不到主键`);
            }
            catch (error) {

            }

            let count: number = 0;
            hashMap.forEach((data) => {
                count++;
            });
            console.assert(count === 2, `数据遍历出来的个数有误！`);

            console.assert(hashMap.getByPrimaryValue(9) !== null, `数据存储未成功`);
            console.assert(hashMap.getByValue("name", "yes") !== null, `通过非主键获取数据失败`);
            hashMap.removeByPrimaryValue(9);
            console.assert(hashMap.getByPrimaryValue(9) === null, `通过主键移除数据失败`);
            hashMap.removeByValue("name", "no");
            console.assert(hashMap.getByValue("name", "yes") === null, `通过非主键移除数据失败`);

            hashMap.put(x);
            console.assert(hashMap.getByPrimaryValue(9) !== null, `数据存储未成功`);
            hashMap.remove(x);
            console.assert(hashMap.getByPrimaryValue(9) === null, `数据移除失败`);

            hashMap.put(x);
            hashMap.put(y);
            console.assert(hashMap.getByValue("name", "a") === null, `使用错误的值不应该能够找到数据`);
            console.assert(hashMap.getByValue("abc", "a") === null, `使用错误的key不应该能够找到数据`);
            console.assert(hashMap.getByPrimaryValue(1) === null, `使用错误的主键值不应该能够找到数据`);

            console.assert(hashMap.removeByValue("name", "a") === null, `使用错误的主键值不应该能够删除数据`);
            console.assert(hashMap.removeByPrimaryValue(1) === null, `使用错误的主键值不应该能够删除数据`);
        }
    }
}