<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const serverStatus = ref('Offline');
let ws: WebSocket | null = null;

const apiAddr = import.meta.env.VITE_API_ADDR;
const apiPort = import.meta.env.VITE_API_WS_PORT;
const server_addr = `${apiAddr}:${apiPort}`;

onMounted(() => {
    ws = new WebSocket(`ws://${server_addr}`);

    ws.onopen = () => {
        console.log('Connected to server');

        // 发送身份标识
        const identity = "Manager";
        if (ws) {
            ws.send(JSON.stringify({ identity }));
        } else {
            console.error('WebSocket is null');
        }
    };

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        serverStatus.value = data.status;
    };

    ws.onclose = () => {
        console.log('Disconnected from server');
        serverStatus.value = 'Offline';
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        serverStatus.value = 'Offline';
    };
});

onUnmounted(() => {
    if (ws) ws.close();
});
</script>

<template>
  <div>
    <h1>Game Server Management</h1>
    <p>Server Status: {{ serverStatus }}</p>
  </div>
</template>

<style>
/* Add your styles here */
</style>
