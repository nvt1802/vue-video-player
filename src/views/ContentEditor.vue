<script setup lang="ts">
import Editor from "@/components/Editor/index.vue";
import {
  child,
  get,
  getDatabase,
  ref as firebaseRef,
  set,
} from "firebase/database";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const dbRef = firebaseRef(getDatabase());
const content = ref(``);
const router = useRouter();

onMounted(() => {
  // const db = getDatabase();
  // const mostViewedPosts = query(
  //   firebaseRef(db, "messages"),
  //   orderByKey(),
  //   limitToLast(5)
  // );
  // get(mostViewedPosts)
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       // console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

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

// onValue(dbRef, (snapshot) => {
//   const data = snapshot.val();
//   // console.log(data);
// });

// function writeMessage(userId: string, message: string) {
//   const db = getDatabase();
//   const date = new Date();
//   set(firebaseRef(db, `messages/${date.getTime()}/msg`), {
//     userId,
//     message,
//     date: date.toLocaleDateString(),
//     time: date.getTime(),
//   });
// }

function writePost(content: string) {
  const db = getDatabase();
  const date = new Date();
  set(firebaseRef(db, `post`), {
    postDate: `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    content,
  });
}
const onClick = () => {
  writePost(content.value);
};

const onClickPreview = () => {
  router.push("/content-preview");
};
</script>

<template>
  <div class="relative mt-8">
    <Editor v-if="content" v-model:model-value="content" />
    <div class="mx-auto max-w-[1000px] mt-2 flex flex-row gap-2">
      <button
        @click="onClick"
        class="border rounded py-1 px-2 hover:bg-slate-700 hover:text-white"
      >
        SAVE
      </button>
      <button
        @click="onClickPreview"
        class="border rounded py-1 px-2 hover:bg-slate-700 hover:text-white"
      >
        PREVIEW
      </button>
    </div>
  </div>
</template>

<style lang="scss">
body {
  background-color: unset;
  backdrop-filter: unset;
  height: unset;
}
</style>
