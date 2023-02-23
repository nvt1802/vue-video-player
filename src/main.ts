import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import "./assets/page-content.scss"

import { initializeApp } from "firebase/app";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const firebaseConfig = {
  apiKey: "AIzaSyDKeT_9Lk6ECQkYeNvPLCFUxJzOW0NJCsw",
  authDomain: "video-koss.firebaseapp.com",
  databaseURL: "https://video-koss-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "video-koss",
  storageBucket: "video-koss.appspot.com",
  messagingSenderId: "1094881100451",
  appId: "1:1094881100451:web:2eec72127fd155c8a93516",
  measurementId: "G-9FHK79S3DH"
};

initializeApp(firebaseConfig);

app.mount("body");
