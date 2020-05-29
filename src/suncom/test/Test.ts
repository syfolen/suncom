
module suncom {
    /**
     * 测试类
     * export
     */
    export namespace Test {
        /**
         * 断言是否失败，默认为：false
         * export
         */
        export let ASSERT_FAILED: boolean = false;

        /**
         * 断言失败时是否自动断点，默认为：true
         * export
         */
        export let ASSERT_BREAKPOINT: boolean = true;

        /**
         * 启用微服务器，默认为：false
         * export
         */
        export let ENABLE_MICRO_SERVER: boolean = false;

        /**
         * 全局唯一
         */
        export let $expect: IExpect = null;

        /**
         * 期望测试
         * export
         */
        export function expect(value: any, description?: string): IExpect {
            if (Global.debugMode & DebugMode.TEST) {
                return new Expect(description).expect(value);
            }
            if ($expect === null) {
                $expect = new Expect();
            }
            return $expect;
        }

        /**
         * 期望之外的，执行此方法时直接触发ASSERT_FAILED
         * export
         */
        export function notExpected(message?: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                new Expect().test(false, message || `Test.notExpected 期望之外的`);
            }
        }

        /**
         * 测试表达式是否为true
         * export
         */
        export function assertTrue(value: boolean, message?: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                new Expect().test(value, message || `Test.assertTrue error，实际值：${Common.toDisplayString(value)}`);
            }
        }

        /**
         * 测试表达式是否为false
         * export
         */
        export function assertFalse(value: boolean, message?: string): void {
            if (Global.debugMode & DebugMode.TEST) {
                new Expect().test(value === false, message || `Test.assertFalse error，实际值：${Common.toDisplayString(value)}`);
            }
        }

        /**
         * 等待信号，同一时间只允许监听一个测试信号
         * @line: 是否进入测试队列，若为false，则需要指定handler，默认为：true
         * 说明：
         * 1. 这个方法只允许在suncore.TestTask中使用
         * export
         */
        export function wait(id: number, handler: IHandler = null, line: boolean = true, once: boolean = true): void {
            if (Global.debugMode & DebugMode.TEST) {
                if (line === false) {
                    suncom.Test.expect(handler).not.toBeUndefined();
                }
                puremvc.Facade.getInstance().sendNotification(NotifyKey.TEST_EVENT, [id, TestActKindEnum.SIGNAL_WAIT, handler, line, once]);
            }
        }

        /**
         * 发射信号
         * @line: 是否进入测试队列，若为false，则需要指定handler，默认为：false
         * @delay: 信号发射延时
         * export
         */
        export function emit(id: number, args?: any, line: boolean = false, delay: number = 0): void {
            if (Global.debugMode & DebugMode.TEST) {
                puremvc.Facade.getInstance().sendNotification(NotifyKey.TEST_EVENT, [id, TestActKindEnum.SIGNAL_EMIT, args, line, delay]);
            }
        }

        /**
         * 点击按钮
         * @event: 默认为：Laya.Event.CLICK
         * 说明：
         * 1. 按钮的点击会延时500毫秒执行
         * export
         */
        export function click(id: number, event: string | Laya.Event = Laya.Event.CLICK): void {
            if (Global.debugMode & DebugMode.TEST) {
                puremvc.Facade.getInstance().sendNotification(NotifyKey.TEST_EVENT, [id, TestActKindEnum.BUTTON_CLICK, event]);
            }
        }

        /**
         * 注册按钮
         * @id: 按钮编号，若为-1则清除所有按钮
         * @once: 一次性的按钮，默认为：true
         * export
         */
        export function regButton(id: number, button?: any, once: boolean = true): void {
            if (Global.debugMode & DebugMode.TEST) {
                puremvc.Facade.getInstance().sendNotification(NotifyKey.TEST_EVENT, [id, TestActKindEnum.BUTTON_REGISTER, button, once]);
            }
        }

        /**
         * 序列化WebSocket状态包
         * export
         */
        export function serializeWebSocketStatePacket(packet: suntdd.IMSWSStatePacket): void {
            if (suncom.Global.debugMode & suncom.DebugMode.TEST) {
                puremvc.Facade.getInstance().sendNotification(suncom.NotifyKey.TEST_EVENT, [0, TestActKindEnum.WS_STATE_NOTIFY, packet]);
            }
        }

        /**
         * 序列化WebSocket协议包
         * @timeFileds: 若有值，则视为时间偏移
         * @hashFileds: 无论是否有值，哈希值均会被重写
         * export
         */
        export function serializeWebSocketProtocalPacket(packet: suntdd.IMSWSProtocalPacket, timeFields?: string[], hashFields?: string[]): void {
            if (suncom.Global.debugMode & suncom.DebugMode.TEST) {
                puremvc.Facade.getInstance().sendNotification(suncom.NotifyKey.TEST_EVENT, [0, TestActKindEnum.PROTOCAL_SERIALIZE, packet, timeFields, hashFields]);
            }
        }
    }
}