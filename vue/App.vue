<script setup>
    import {ref} from "vue";
    import Conf from "./components/Conf.vue";
    import Mess from "./components/Mess.vue";

    const username = ref("");
    const url = ref("");
    const port = ref("");
    const topic = ref("");
    const client = ref({});
    const messages = ref("");

    function onSuccess() {
        messages.value += "\n" + new Date().toISOString() + " | Connecting to topic '" + topic.value + "' with username '" + username.value + "' ...";
        messages.value = messages.value.trimStart();
        client.value.subscribe(topic.value);
        messages.value += "\n" + new Date().toISOString() + " | Connected";
    }

    function onFailure(err) {
        messages.value += "\n" + new Date().toISOString() + " | Failure: " + err.errorMessage;
        messages.value = messages.value.trimStart();
    }

    function onConnectionLost(err) {
        if(err.errorCode === 0) return;
        messages.value += "\n" + new Date().toISOString() + " | Connection lost: " + err.errorMessage;
        messages.value = messages.value.trimStart();
    }

    function onMessageArrived(mess) {
        try {
            const message = JSON.parse(mess.payloadString);
            if(!message.m) return;
            messages.value += "\n" + new Date().toISOString() + " | " + message.u + ":\n" + message.m;
            messages.value = messages.value.trimStart();
        }
        catch{}
    }

    function connect(conf) {
        username.value = conf.username;
        url.value = conf.url.trim();
        port.value = parseInt(conf.port);
        topic.value = conf.topic.trim();
        messages.value += "\n" + new Date().toISOString() + " | Connecting to '" + url.value + "' on port " + port.value + " ..."
        messages.value = messages.value.trimStart();
        try {
            client.value = new Paho.Client(url.value, port.value, "");
            client.value.onConnectionLost = onConnectionLost;
            client.value.onMessageArrived = onMessageArrived;
            client.value.connect({onSuccess: onSuccess, onFailure: onFailure, useSSL: conf.useSSL, reconnect: conf.reconnect});
        }
        catch(err) {
            messages.value += "\n" + new Date().toISOString() + " | " + err.message;
        }
    }

    function send(data) {
        const mess = JSON.stringify({u: username.value, m: data.m});
        client.value.publish(topic.value, mess, 1, false);
    }
</script>

<template>
    <div>
        <Conf @connect="connect"></Conf>
    </div>
    <div>
        <Mess :messages="messages" @send="send"></Mess>
    </div>
</template>

<style scoped>
    div {
        background-color: #f0f0f0;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>