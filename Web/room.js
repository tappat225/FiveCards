window.onload = function() {
    // 获取房间信息（例如，从 URL 参数）
    const roomId = new URLSearchParams(window.location.search).get('roomId');

    // 显示房间信息
    // 这里需要从服务器获取房间信息
    // 假设从服务器获取的房间信息如下
    const roomInfo = {
        name: "示例房间",
        maxPlayers: 4,
        isCreator: true, // 假设当前用户是房间创建者
        players: ["玩家1", "玩家2"] // 当前房间内的玩家列表
    };

    document.getElementById('roomName').textContent += roomInfo.name;
    document.getElementById('maxPlayers').textContent += roomInfo.maxPlayers;

    if (roomInfo.isCreator) {
        document.getElementById('dissolveRoom').style.display = 'block';
    }

    const playersList = document.getElementById('playersInRoom');
    roomInfo.players.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = player;
        playersList.appendChild(listItem);
    });

    // 添加解散房间的事件监听器
    document.getElementById('dissolveRoom').addEventListener('click', function() {
        // 发送解散房间的请求到服务器
        // 解散成功后，重定向到大厅页面
    });

    // 添加准备按钮的事件监听器
    document.getElementById('readyButton').addEventListener('click', function() {
        // 发送玩家准备的请求到服务器
    });
};
