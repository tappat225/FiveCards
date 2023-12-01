window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    document.getElementById('usernameDisplay').textContent = username;

    fetch('http://localhost:3001/players')
      .then(response => response.json())
      .then(data => {
          if (data.message === "success") {
              const playersList = document.getElementById('playersList');
              data.data.forEach(player => {
                  const listItem = document.createElement('li');
                  listItem.textContent = `${player.name} - Score: ${player.score}, Rank: ${player.rank}`;
                  playersList.appendChild(listItem);
              });
          }
      })
      .catch(error => console.error('Error:', error));

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
                // 跳转到房间页面
                window.location.href = `/room.html?roomId=${data.roomId}`;
            }
        })
        .catch(error => console.error('Error:', error));
    });

    // 假设您已经从服务器获取了房间列表
    const rooms = [
        { id: 1, name: "Room 1", players: 2, maxPlayers: 4 },
        { id: 2, name: "Room 2", players: 1, maxPlayers: 4 }
        // ... 更多房间
    ];

    const roomsList = document.querySelector('.room-list ul');
    rooms.forEach(room => {
        const listItem = document.createElement('li');
        listItem.textContent = `${room.name} - ${room.players}/${room.maxPlayers} players`;
        const joinButton = document.createElement('button');
        joinButton.textContent = '加入';
        joinButton.onclick = function() {
            // 发送加入房间的请求到服务器
            // 成功后跳转到房间页面
            window.location.href = `/room.html?roomId=${room.id}`;
        };
        listItem.appendChild(joinButton);
        roomsList.appendChild(listItem);
    });
};
