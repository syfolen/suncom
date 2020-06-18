
module suncom {
    /**
     * 日志接口
     * export
     */
    export namespace Logger {
        /**
         * 日志块数量，默认：200
         */
        export let NUM_OF_BLOCK: number = 200;

        /**
         * 块日志条数，默认：200
         */
        export let LINES_OF_BLOCK: number = 200;

        /**
         * 日志列表
         */
        const $messages: string[][] = [];

        /**
         * 锁定日志，若为false，则旧日志会实时被移除，默认：false
         * export
         */
        export let locked: boolean = false;

        /**
         * 记录日志，最多不超过 NUM_OF_BLOCK * LINES_OF_BLOCK 行
         */
        function $addLine(line: string): void {
            if (Logger.locked === false && $messages.length > NUM_OF_BLOCK) {
                $messages.shift();
            }
            let lines: string[] = null;
            const length: number = $messages.length;
            if (length > 0) {
                lines = $messages[length - 1];
                if (lines.length === LINES_OF_BLOCK) {
                    lines = null;
                }
            }
            if (lines === null) {
                lines = [];
                $messages.push(lines);
            }
            lines.push(line);
        }

        /**
         * 获取部分日志
         * export
         */
        export function getDebugString(index: number, length: number): string[] {
            // 索引为负时需要修正长度
            if (index < 0) {
                length += index;
                index = 0;
            }

            // 组内编号
            let lineIndex: number = index % LINES_OF_BLOCK;
            // 分组编号
            let groupIndex: number = (index - lineIndex) / LINES_OF_BLOCK;

            const lines: string[] = [];
            for (let i: number = 0; i < length; i++) {
                if (groupIndex < $messages.length) {
                    const array: string[] = $messages[groupIndex];
                    if (lineIndex < array.length) {
                        lines.push(array[lineIndex]);
                    }
                    lineIndex++;
                    if (lineIndex === array.length) {
                        lineIndex = 0;
                        groupIndex++;
                    }
                }
                else {
                    break;
                }
            }

            return lines;
        }

        /**
         * 日志总行数
         * export
         */
        export function getNumOfLines(): number {
            let length: number = 0;
            for (let i: number = 0; i < $messages.length; i++) {
                length += $messages[i].length;
            }
            return length;
        }

        /**
         * 普通日志
         * export
         */
        export function log(mod: DebugMode, ...args: any[]): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                const str: string = args.join(" ");
                console.log(str);
                $addLine(str);
            }
        }

        /**
         * 警告日志
         * export
         */
        export function warn(mod: DebugMode, ...args: any[]): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                const str: string = args.join(" ");
                console.warn(str);
                $addLine(str);
            }
        }

        /**
         * 错误日志
         * export
         */
        export function error(mod: DebugMode, ...args: any[]): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                const str: string = args.join(" ");
                console.error(str);
                $addLine(str);
            }
        }

        /**
         * 文件日志
         * export
         */
        export function log2f(mod: DebugMode, ...args: any[]): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                const str: string = args.join(" ");
                console.info(str);
                $addLine(str);
            }
        }

        /**
         * 调用追踪日志
         * export
         */
        export function trace(mod: DebugMode, ...args: any[]): void {
            if (Global.debugMode > 0 && (mod === DebugMode.ANY || (Global.debugMode & mod) === mod)) {
                const str: string = args.join(" ");
                console.trace(str);
            }
        }
    }
}