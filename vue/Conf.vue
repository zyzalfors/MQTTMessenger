<script setup>
import { ref, defineEmits } from 'vue';

const css = ref({fontFamily: 'helvetica, sans serif', margin: '0px', padding: '5px', borderRadius: '5px', lightColor: 'lightgrey', darkColor: '#333333', boxSizing: 'border-box'});
const username = ref('');
const url = ref('');
const port = ref('');
const topic = ref('');
const useSSL = ref(true);
const reconnect = ref(true);
const emit = defineEmits(['connect']);

const fillConfig = () => {
  url.value = 'test.mosquitto.org';
  port.value = '8081';
};

const emitConf = () => {
  emit('connect', {username: username.value, url: url.value, port: port.value, topic: topic.value, useSSL: useSSL.value, reconnect: reconnect.value});
};
</script>

<template>
  <div class="config">
    <div>MQTT Messenger</div>
    <div><br/></div>
    <div>
      <label for="username">Username</label>
    </div>
    <div>
      <input type="text" id="username" v-model="username"/>
    </div>
    <div>
      <label for="url">URL</label>
    </div>
    <div>
      <input type="text" id="url" v-model="url"/>
    </div>
    <div>
      <label for="port">WS port</label>
    </div>
    <div>
      <input type="number" id="port" min="0" v-model="port"/>
    </div>
    <div>
      <label for="topic">Topic</label>
    </div>
    <div>
      <input type="text" id="topic" v-model="topic"/>
    </div>
    <div>
      <label for="ssl">SSL</label>
    </div>
    <div>
      <input type="checkbox" id="ssl" v-model="useSSL"/>
    </div>
    <div>
      <label for="reconnect">Reconnect</label>
    </div>
    <div>
      <input type="checkbox" id="reconnect" v-model="reconnect"/>
    </div>
    <div>
      <input type="button" value="Config" @click="fillConfig"/>
    </div>
    <div>
      <input type="button" value="Connect" @click="emitConf"/>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: v-bind(css.fontFamily);
}

.config {
  width: 200px;
  height: 100%;
  border-radius: v-bind(css.borderRadius);
  padding: v-bind(css.padding);
  background-color: v-bind(css.lightColor);
  position: absolute;
  z-index: 1;
  box-sizing: v-bind(css.boxSizing);
}

label {
  color: v-bind(css.darkColor);
}

input[type='text'], input[type='number'] {
  border: 1px solid v-bind(css.lightColor);
  border-radius: v-bind(css.borderRadius);
  margin: v-bind(css.margin);
  padding: v-bind(css.padding);
  background-color: v-bind(css.darkColor);
  color: v-bind(css.lightColor);
}

input[type='button'] {
  width: 50%;
  border: 1px solid v-bind(css.lightColor);
  border-radius: v-bind(css.borderRadius);
  margin: v-bind(css.margin);
  padding: v-bind(css.padding);
  background-color: v-bind(css.darkColor);
  color: v-bind(css.lightColor);
}

input[type='checkbox'] {
  width: 16px;
  height: 16px;
  border: 1px solid v-bind(css.lightColor);
  border-radius: v-bind(css.borderRadius);
  background-color: v-bind(css.darkColor);
  color: v-bind(css.lightColor);
  margin: 0px 0px 0px 0px;
  appearance: none;
}

input[type='checkbox']:checked::after {
  content: '';
  display: block;
  width: 5px;
  height: 10px;
  border: 1px solid v-bind(css.lightColor);
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: relative;
  left: 4px;
}

input[type='button']:active {
  transform: translateY(2px);
}

input:focus {
  outline: none;
}
</style>
