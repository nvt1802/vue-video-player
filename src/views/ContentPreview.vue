<script setup lang="ts">
import { child, get, getDatabase, ref as firebaseRef } from "firebase/database";
import { onMounted, ref } from "vue";

const dbRef = firebaseRef(getDatabase());
const content = ref(``);

onMounted(() => {
  get(child(dbRef, `post`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        content.value = snapshot.val()?.content;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
</script>

<template>
  <div>
    <div v-html="content" class="page-content"></div>
  </div>
</template>

<style lang="scss">
body {
  background-color: unset;
  backdrop-filter: unset;
  height: unset;
}
</style>
