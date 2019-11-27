
module suncom {
	/**
	 * 伪数据库服务
	 * export
	 */
	export namespace DBService {
		/**
		 * 数据表
		 */
		const $table: { [id: string]: any } = {};

		/**
		 * 获取数据
		 * export
		 */
		export function get(name: number): any {
			return $table[name];
		}

		/**
		 * 存储数据
		 * export
		 */
		export function put(name: number, data: any): void {
			$table[name] = data;
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