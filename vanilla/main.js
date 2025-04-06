import { createApp } from 'vue';
import App from './App.vue';
import Config from './components/Conf.vue';
import Messages from './components/Mess.vue';

const app = createApp(App);
app.component('Conf', Config);
app.component('Mess', Messages);
app.mount('#app');
