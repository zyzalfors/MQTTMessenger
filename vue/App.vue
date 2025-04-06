<script setup>
import { ref } from 'vue';
import Config from './components/Conf.vue';
import Messages from './components/Mess.vue';

const css = ref({margin: '0px', padding: '5px', borderRadius: '5px', lightColor: 'lightgrey', darkColor: '#333333'});
const showConfig = ref(false);
const username = ref('');
const url = ref('');
const port = ref('');
const topic = ref('');
const client = ref('');
const messages = ref('');

const setConfig = () => {
  showConfig.value = !showConfig.value;
};

function onSuccess() {
  const now = new Date().toISOString();
  messages.value += `\n${now} | Connecting to topic '${topic.value}' with username '${username.value}' ...`;
  messages.value = messages.value.trimStart();
  if(!topic.value) {
    messages.value += `\n${now} | Invalid topic`;
    client.value.disconnect();
    client.value = '';
    return;
  }
  else if(!username.value) {
    messages.value += `\n${now} | Invalid username`;
    client.value.disconnect();
    client.value = '';
    return;
  }
  client.value.subscribe(topic.value);
  messages.value += `\n${now} | Connected`;
}

function onFailure(err) {
  client.value = '';
  messages.value += `\n${new Date().toISOString()} | Failure: ${err.errorMessage}`;
  messages.value = messages.value.trimStart();
}

function onConnectionLost(err) {
  if(err.errorCode === 0) return;
  client.value = '';
  messages.value += `\n${new Date().toISOString()} | Connection lost: ${err.errorMessage}`;
  messages.value = messages.value.trimStart();
}

function onMessageArrived(mess) {
  try {
    const message = JSON.parse(mess.payloadString);
    if(!message.m || !message.u) return;
    messages.value += `\n${new Date().toISOString()} | ${message.u}:\n${message.m}`;
    messages.value = messages.value.trimStart();
  }
  catch {}
}

function connect(conf) {
  const now = new Date().toISOString();
  username.value = conf.username;
  url.value = conf.url.trim();
  port.value = parseInt(conf.port);
  topic.value = conf.topic.trim();
  messages.value += `\n${now} | Connecting to ${url.value} on port ${port.value} ...`;
  messages.value = messages.value.trimStart();
  try {
    if(client.value) client.value.disconnect();
    client.value = new Paho.Client(url.value, port.value, '');
    client.value.onConnectionLost = onConnectionLost;
    client.value.onMessageArrived = onMessageArrived;
    client.value.connect({onSuccess: onSuccess, onFailure: onFailure, useSSL: conf.useSSL, reconnect: conf.reconnect});
  }
  catch(err) {
    messages.value += `\n${now} | ${err.message}`;
  }
}

function send(data) {
  const mess = JSON.stringify({u: username.value, m: data.m});
  if(!client.value) return;
  client.value.publish(topic.value, mess, 1, false);
}
</script>

<template>
  <input type="button" @click="setConfig" value="&#9776;"/>
  <div class="row">
    <Transition name="fade">
      <Config v-if="showConfig === true" @connect="connect"></Config>
    </Transition>
    <Messages :messages="messages" @send="send"></Messages>
  </div>
</template>

<style>
html {
  background-color: lightgrey;
}
</style>

<style scoped>
input[type='button'] {
  border: 1px solid v-bind(css.lightColor);
  border-radius: v-bind(css.borderRadius);
  margin: v-bind(css.margin);
  padding: v-bind(css.padding);
  background-color: v-bind(css.darkColor);
  color: v-bind(css.lightColor);
}

.row {
  display: flex;
}

input[type='button']:active {
  transform: translateY(2px);
}

input[type='button']:focus {
  outline: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>