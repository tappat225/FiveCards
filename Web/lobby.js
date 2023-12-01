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
};
