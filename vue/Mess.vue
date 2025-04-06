<script setup>
import { ref } from 'vue';

const css = ref({fontFamily: 'helvetica, sans serif', margin: '0px', padding: '5px', borderRadius: '5px', lightColor: 'lightgrey', darkColor: '#333333', boxSizing: 'border-box'});
const message = ref('');
const props = defineProps(['messages']);
const emit = defineEmits(['send']);

const emitMess = () => {
  emit('send', {m: message.value});
  message.value = '';
};
</script>

<template>
  <div class="messages">
    <div class="textarea">
      <textarea readonly>{{ messages }}</textarea>
    </div>
    <div class="input">
      <div class="message">
        <input type="text" placeholder="Type a message" v-model="message"/>
      </div>
      <div class="send">
        <input type="button" value=">" @click="emitMess"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: v-bind(css.fontFamily);
  box-sizing: v-bind(css.boxSizing);
}

.messages {
  height: 600px;
  width: 1000px;
}

.textarea {
  height: 95%;
  width: 100%;
}

textarea {
  height: 100%;
  width: 100%;
  border: 1px solid v-bind(css.lightColor);
  border-radius: v-bind(css.borderRadius);
  margin: v-bind(css.margin);
  padding: v-bind(css.padding);
  background-color: v-bind(css.darkColor);
  color: v-bind(css.lightColor);
  box-sizing: v-bind(css.boxSizing);
  resize: none;
}

.input {
  display: flex;
  height: 5%;
  width: 100%;
}

.message {
  height: 100%;
  width: 90%;
}

.send {
  height: 100%;
  width: 10%;
}

input[type='text'] {
  width: 100%;
  border: 1px solid v-bind(css.lightColor);
  border-radius: v-bind(css.borderRadius);
  margin: v-bind(css.margin);
  padding: v-bind(css.padding);
  background-color: v-bind(css.darkColor);
  color: v-bind(css.lightColor);
}

input[type='button'] {
  width: 100%;
  border: 1px solid v-bind(css.lightColor);
  border-radius: v-bind(css.borderRadius);
  margin: v-bind(css.margin);
  padding: v-bind(css.padding);
  background-color: v-bind(css.darkColor);
  color: v-bind(css.lightColor);
}

input[type='button']:active {
  transform: translateY(2px);
}

input:focus, textarea:focus {
  outline: none;
}

::placeholder {
  padding: v-bind(css.padding);
  color: darkgrey;
}
</style>