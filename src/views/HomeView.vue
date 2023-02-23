<script setup lang="ts">
import { nextTick, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { listVideo } from "@/video";
import { VideoSnapper } from "@/components/VideoPlayer/constants";

const router = useRouter();

const getThumnail = (id: string, url: string) => {
  const video = document.createElement("video");
  video.src = url;
  VideoSnapper.captureAsCanvas(video, 5, document.getElementById(id), 250, 145);
};

setTimeout(() => {
  listVideo.forEach(async (item) => {
    await getThumnail(`video-${item.key}`, item.video);
  });
}, 100);

const onClickViewVideo = (key: string | number) => {
  router.push(`/watch?v=${key}`);
};
</script>

<template>
  <main class="flex flex-row flex-wrap gap-3">
    <div v-for="item in listVideo">
      <div class="text-white">
        {{ item.name }}
        <div class="cursor-pointer" @click="onClickViewVideo(item.key)">
          <canvas :id="`video-${item.key}`"></canvas>
        </div>
      </div>
    </div>
  </main>
</template>
