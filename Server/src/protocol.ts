
// 定义消息类型
type MessageType = 'joinGame' |
                    'joinGameResponse' |
                    'gameStart' |
                    'playerAction' |
                    'playerActionBroadcast' |
                    'gameStateUpdate' |
                    'gameEnd' |
                    'error';

// 基础消息接口
interface Message {
    type: MessageType;
    data: any;
}


