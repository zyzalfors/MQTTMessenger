<script setup>
    import {ref} from "vue";

    const props = defineProps(["messages"]);
    const message = ref("");
    const emit = defineEmits(["send"]);
    const emitMess = () => {
        emit("send", {m: message.value});
        message.value = "";
    }
</script>

<template>
    <div>
        <textarea rows="40" cols="50" readonly>{{messages}}</textarea>
        <br>
        <input type="text" placeholder="Enter your message ..." v-model="message">
        <br>
        <input type="button" value="Send" @click="emitMess">
    </div>
</template>

<style scoped>
    div {
        position: fixed;
        top: 0;
        left: 240px;
        width: 100%;
        height: 100vh;
        padding: 20px;
    }

    input[type=text] {
        padding: 2px 10px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        width: 50%;
    }

    input[type=button] {
        background-color: #3c3c3c;
        border: none;
        color: white;
        padding: 5px 15px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    input[type=button]:active {
        box-shadow: 0 5px #666;
        transform: translateY(4px);
    }

    textarea {
        width: 50%;
        outline: none;
        resize: none;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    label {
        float: left;
        width: 110px;
        text-align: left;
    }
</style>