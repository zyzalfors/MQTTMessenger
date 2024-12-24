<script setup>
    import {ref, defineEmits} from "vue";

    const username = ref("");
    const url = ref("");
    const port = ref("");
    const topic = ref("");
    const useSSL = ref(true);
    const reconnect = ref(true);
    const emit = defineEmits(["connect"]);
    const emitConf = () => {
        emit("connect", {username: username.value, url: url.value, port: port.value, topic: topic.value, useSSL: useSSL.value, reconnect: reconnect.value});
    }
</script>

<template>
    <div>
        MQTT Messenger
        <br><br>
        <label for="username">Username</label><input type="text" id="username" v-model="username">
        <label for="url">URL</label><input type="text" id="url" v-model="url">
        <label for="port">WS port</label><input type="number" id="port" min="0" v-model="port">
        <label for="topic">Topic</label><input type="text" id="topic" v-model="topic">
        <label for="ssl">SSL</label><input type="checkbox" id="ssl" v-model="useSSL">
        <br><br>
        <label for="reconnect">Reconnect</label><input type="checkbox" id="reconnect" v-model="reconnect">
        <br><br>
        <input type="button" value="Connect" @click="emitConf">
    </div>
</template>

<style scoped>
    div {
        position: fixed;
        top: 0;
        left: 0;
        width: 200px;
        height: 100vh;
        padding: 20px;
    }

    input[type=text], input[type=number] {
        padding: 2px 10px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    input[type=button] {
        background-color: #3c3c3c;
        border: none;
        color: white;
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    input[type=button]:active {
        box-shadow: 0 5px #666;
        transform: translateY(4px);
    }

    label {
        float: left;
        width: 120px;
        text-align: left;
    }
</style>