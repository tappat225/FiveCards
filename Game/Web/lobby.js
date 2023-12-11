window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    document.getElementById('usernameDisplay').textContent = username;

    // 获取并显示用户列表
    fetchPlayers();

    // 获取并显示房间列表
    fetchRooms();

    // 处理创建房间表单提交
    document.getElementById('createRoomForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const roomName = document.getElementById('roomName').value;
        const maxPlayers = document.getElementById('maxPlayers').value;

        // 发送请求到服务器以创建房间
        fetch('http://localhost:3001/createRoom', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ roomName, maxPlayers }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === "success") {
                // 更新房间列表
                fetchRooms();
                // 跳转到房间页面
                window.location.href = `room.html?roomId=${data.roomId}`;
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // 每隔一段时间刷新房间列表
    setInterval(fetchRooms, 5000);
};

// 获取并显示用户列表
function fetchPlayers() {
    fetch('http://localhost:3001/players')
    .then(response => response.json())
    .then(data => {
        if (data.message === "success") {
            const playersList = document.getElementById('playersList');
            playersList.innerHTML = ''; // 清空现有列表
            data.data.forEach(player => {
                const listItem = document.createElement('li');
                listItem.textContent = `${player.name} - Score: ${player.score}, Rank: ${player.rank}`;
                playersList.appendChild(listItem);
            });
        }
    })
    .catch(error => console.error('Error:', error));
}

// 获取并显示房间列表
function fetchRooms() {
    fetch('http://localhost:3001/rooms')
    .then(response => response.json())
    .then(data => {
        if (data.message === "success") {
            const roomsList = document.querySelector('.room-list ul');
            roomsList.innerHTML = ''; // 清空现有列表
            data.rooms.forEach(room => {
                const listItem = document.createElement('li');
                listItem.textContent = `${room.name} - ${room.players}/${room.maxPlayers} players`;
                const joinButton = document.createElement('button');
                joinButton.textContent = '加入';
                joinButton.onclick = function() {
                    window.location.href = `room.html?roomId=${room.id}`;
                };
                listItem.appendChild(joinButton);
                roomsList.appendChild(listItem);
            });
        }
    })
    .catch(error => console.error('Error:', error));
}
