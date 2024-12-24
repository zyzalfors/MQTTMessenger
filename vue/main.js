import {createApp} from "vue";
import App from "./App.vue";
import Conf from "./components/Conf.vue";
import Mess from "./components/Mess.vue";

const app = createApp(App);
app.component("Conf", Conf);
app.component("Mess", Mess);
app.mount('#app')