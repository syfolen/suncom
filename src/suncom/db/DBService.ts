
module suncom {
	/**
	 * 伪数据库服务
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
		export const $table: { [id: string]: any } = {};

		/**
		 * 获取数据
		 * export
		 */
		export function get(name: number): any {
			return $table[name];
		}

		/**
		 * 存储数据
		 * @name: 若为负一，则自动生成键值
		 * export
		 */
		export function put(name: number, data: any): any {
			if (name > -1) {
				$table[name] = data;
			}
			else {
				$id++;
				$table["auto_" + $id] = data;
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
		export function drop(name: number): void {
			delete $table[name];
		}
	}
}