
module suncom {
	/**
	 * 伪数据库服务
	 * 说明：
	 * 1. 用于快速存储或读取数据，数据仅保存在内存中
	 * export
	 */
	export namespace DBService {
		/**
		 * 自动负增长id
		 */
		let $id: number = 0;

		/**
		 * 数据表
		 */
		export const $table: IDictionaryI<any> = {};

		/**
		 * 获取数据
		 * export
		 */
		export function get<T>(name: number): T {
			return $table[name];
		}

		/**
		 * 存储数据
		 * @name: 若小于0，则存储的数据不可通过get方法获取
		 * export
		 */
		export function put<T>(name: number, data: T): T {
			if (name < 0) {
				$id++;
				$table["auto_" + $id] = data;
			}
			else {
				$table[name] = data;
			}
			return data;
		}

		/**
		 * 是否存在
		 * export
		 */
		export function exist(name: number): boolean {
			return $table[name] !== void 0;
		}

		/**
		 * 删除数据
		 * export
		 */
		export function drop<T>(name: number): T {
			const data: T = DBService.get<any>(name);
			delete $table[name];
			return data;
		}
	}
}