// protocol.ts


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

// 加入游戏请求和响应
interface JoinGameMessage {
    playerName: string;
}

interface JoinGameResponseMessage {
    success: boolean;
    playerId: string;
    message: string;
}

// 其他消息接口定义...


class Protocol {
    // 创建加入游戏的消息
    static createJoinGameMessage(playerName: string): string {
      const message: Message = {
        type: 'joinGame',
        data: { playerName }
      };
      return JSON.stringify(message);
    }
  
    // 解析从服务器接收到的消息
    static parseMessage(messageString: string): Message {
      try {
        const message: Message = JSON.parse(messageString);
        return message;
      } catch (error) {
        throw new Error("Failed to parse message");
      }
    }
  
    // 创建其他类型的消息...
}

// 使用示例
const joinGameMsg = Protocol.createJoinGameMessage("Alice");
console.log(joinGameMsg); // 发送这个消息到服务器

// 假设从服务器接收到一条消息
const receivedMsgString = '{"type":"joinGameResponse","data":{"success":true,"playerId":"123","message":"加入游戏成功"}}';
const receivedMsg = Protocol.parseMessage(receivedMsgString);
console.log(receivedMsg);
  
