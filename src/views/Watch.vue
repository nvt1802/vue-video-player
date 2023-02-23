<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import { listVideo } from "@/video";
import type { VideoItem } from "@/video";
import VideoPlayer from "@/components/VideoPlayer/index.vue";

const route = useRoute();
const { v } = route.query;
const video = ref<VideoItem>();

const screenAvailable = ref({
  availWidth: 1000,
  availHeight: 600,
});
const videoDefault = {
  width: 720,
  height: 405,
};

window.addEventListener("resize", (e: any) => {
  screenAvailable.value.availWidth = e.target.innerWidth;
  screenAvailable.value.availHeight = e.target.innerHeight;
});

const onEnded = () => {};

onMounted(() => {
  video.value = listVideo.find((item) => item.key == v);
});
</script>

<template>
  <VideoPlayer
    v-if="video"
    :video-url="video?.video || ''"
    :tracks="video?.tracks || []"
    :video-display-name="video?.name"
    :auto-play="true"
    :is-vertical="video.isVertical"
    :width="
      screenAvailable.availWidth > videoDefault.width
        ? videoDefault.width
        : screenAvailable.availWidth
    "
    :height="
      screenAvailable.availWidth > videoDefault.width
        ? videoDefault.height
        : (screenAvailable.availWidth * videoDefault.height) /
          videoDefault.width
    "
    @on-ended="onEnded"
  />
</template>
