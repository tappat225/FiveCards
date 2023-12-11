
## Memo

Web是最初简单写的大厅页面，暂时仅保留文件，后续再整合进Game

## Quick start

Init env:

```bash
npm config set registry https://registry.npmmirror.com

npm install -g typescript

npm install

```

Start server:

```bash
node server.js
```

Start FE test:

```bash
npm run assets

npm run preview
```

修改Server.js的代码，要求服务端初次启动时初始化数据库，数据库可存储玩家的名称、积分、排名，这三个信息，若数据库已存在，但数据库中缺少表字段，例如，只有名称，没有积分和排名段，则在已有数据库上新增缺少的段

## gpt promt

我正在开发一款多人在线网页纸牌游戏，技术上采用typescript语言搭配pixijs引擎

## 一些坑

阿里云镜像地址提供的最新Node.js v10.19.0版本对于"webpack": "^5.89.0", "webpack-cli": "^5.1.4"不支持，需要更新到v11.0.0。不过最新版早都到20以上了，直接去官网下载安装就行。

GPT4对于pixi的资料似乎只到pixi5，新版的pixi7把loader方法拆分了，导致GPT4提供的代码不能用。

应该要先设计好大概的架构，拆分模块，再开始写代码。能做成面向对象设计就不要走面向过程。

## 模块设计

1. 游戏核心模块
文件：Game.ts
类：CardGame
start(): 启动游戏，初始化游戏状态。
end(): 结束游戏，清理资源。
reset(): 重置游戏到初始状态。
update(delta: number): 更新游戏状态，包括玩家动作和游戏逻辑。
resize(width: number, height: number): 响应游戏界面尺寸变化。

```typescript
// game.ts

export interface Game {
    start(): void;
    end(): void;
    reset(): void;
    update(delta: number): void;
    resize(width: number, height: number): void;
    // ... 其他游戏特有的方法和属性
}
```

2. 系统接口模块
文件：System.ts
接口：System
init(): 初始化系统。
awake(): 在游戏开始时激活系统。
start(): 开始系统的游戏逻辑。
update(delta: number): 基于游戏循环的更新逻辑。
end(): 游戏结束时停止系统。
reset(): 重置系统状态。
resize(width: number, height: number): 系统响应界面尺寸变化。

```ts
// system.ts

import { Game } from "../game";

export interface System<S extends Game = Game> {
    game?: S;
    init?(): void;
    awake?(): void;
    start?(): void;
    update?(delta: number): void;
    end?(): void;
    reset?(): void;
    resize?(width: number, height: number): void;
}
```

3. 系统类模块
文件：RenderSystem.ts, InputSystem.ts, AudioSystem.ts 等
类：RenderSystem, InputSystem, AudioSystem (每个系统类都遵循 System 接口)
init(): 初始化特定于系统的资源或监听器。
update(delta: number): 处理每一帧的逻辑，例如渲染画面、处理输入或播放音效。
其他方法根据 System 接口实现。

4. 玩家模块
文件：Player.ts
类：Player
joinGame(game: CardGame): 玩家加入游戏。
leaveGame(): 玩家离开游戏。
performAction(action: Action): 玩家执行游戏动作，如出牌等。

5. 牌和牌组模块
文件：Card.ts, Deck.ts
类：Card
属性和方法描述单张牌的特性和行为。
类：Deck
shuffle(): 洗牌。
deal(): 发牌。
collect(): 收集牌回牌组。

6. 游戏规则模块
文件：Rule.ts
类：Rule
validateAction(player: Player, action: Action): 验证玩家动作是否符合规则。
calculateScore(): 计算并更新玩家分数。

7. 网络通信模块
文件：NetworkManager.ts
类：NetworkManager
connect(): 连接到服务器。
disconnect(): 断开连接。
sendMessage(message: Message): 发送消息到服务器。
receiveMessage(): 接收来自服务器的消息。

8. UI 管理模块
文件：UIManager.ts
类：UIManager
updateUI(): 更新用户界面。
displayMessage(message: string): 显示消息或提示。
showPlayerStatus(player: Player): 显示玩家状态。

9. 事件管理模块
文件：EventManager.ts
类：EventManager
registerEvent(event: Event): 注册游戏事件。
triggerEvent(event: Event): 触发事件并处理相应的逻辑。

## Link to this repo

https://github.com/tappat225/FiveCards

## 参考文档/工具

[Typescript handbook](https://www.typescriptlang.org/docs/handbook/intro.html)：typescript工具手册

[PixiJs API](https://pixijs.download/release/docs/index.html)：PixiJs官方文档

[@pixi/ui](https://github.com/pixijs/ui)：pixi特殊UI

[@assetpack](https://github.com/pixijs/assetpack)：素材资源打包工具，可以方便创建资源清单

[gsap](https://github.com/greensock/GSAP)：动画效果库

## 参考项目

[Open-games](https://github.com/pixijs/open-games)

[Сreating Match3 game with PixiJS](https://gamedev.land/match3/)
