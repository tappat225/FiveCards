document.getElementById('loginButton').addEventListener('click', login);
document.getElementById('username').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        login();
    }
});

function login() {
    var username = document.getElementById('username').value;
    if(username) {
        fetch('/player', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username })
        })
        .then(response => response.json())
        .then(data => {
        window.location.href = 'lobby.html?username=' + encodeURIComponent(username);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    } else {
        alert('Please enter your name');
    }
}

