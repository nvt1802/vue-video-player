<script setup lang="ts">
import { onMounted } from "vue";
import { toHHMMSS } from "../../../utils/index";
import { VideoSnapper } from "../constants";
import type { VideoPlayState } from "../types";

interface IProps {
  videoPlayState: VideoPlayState;
  videoWidth: string | number | undefined;
  videoHeight: string | number | undefined;
  videoUrl: string;
  isVertical?: boolean;
}

const { videoPlayState, videoWidth, videoHeight, videoUrl, isVertical } =
  defineProps<IProps>();
const emits = defineEmits(["onUpdateProgress"]);

const video = document.createElement("video");
let draggingVideoProgress = false;

const onChangeVideoProgress = (event: any) => {
  const progressElement = document.getElementById("video-progress");
  emits(
    "onUpdateProgress",
    (event.offsetX / Number(progressElement?.offsetWidth)) *
      Number(videoPlayState.duration)
  );
};

const onProgressMousemove = (event: any) => {
  const offsetX = event.offsetX;
  const offsetWidth =
    document.getElementById("video-progress")?.offsetWidth || 1;
  videoPlayState.currentTimeHover =
    (offsetX / offsetWidth) * videoPlayState.duration;
  videoPlayState.currentPercentTimeHover = (offsetX / offsetWidth) * 100;
  document
    .getElementById("video-hover-progress-time")
    ?.classList.remove("invisible");
  document
    .getElementById("video-hover-progress-capture")
    ?.classList.remove("invisible");
  VideoSnapper.captureAsCanvas(
    video,
    videoPlayState.currentTimeHover,
    document.getElementById("canvas"),
    isVertical ? 100 : 160,
    isVertical ? 160 : 100
  );
};

const onProgressMouseleave = (event: any) => {
  videoPlayState.currentTimeHover = 0;
  videoPlayState.currentPercentTimeHover = videoPlayState.currentPercentTime;
  document
    .getElementById("video-hover-progress-time")
    ?.classList.add("invisible");
  document
    .getElementById("video-hover-progress-capture")
    ?.classList.add("invisible");
};

onMounted(() => {
  video.src = videoUrl;
  const progressVideoCurrent = document.getElementById(
    "video-current-progress"
  ) as HTMLDivElement;
  progressVideoCurrent.addEventListener("mousedown", function (e) {
    draggingVideoProgress = true;
    let offsetLeft = this.parentElement?.offsetLeft || 0;
    e.preventDefault();

    document.addEventListener("mousemove", function (e) {
      if (draggingVideoProgress == true) {
        const progressOffsetWidth =
          document.getElementById("video-progress")?.offsetWidth || 0;
        let newVal = e.offsetX - offsetLeft;
        if (newVal < 0) {
          newVal = 0;
        } else if (newVal > progressOffsetWidth) {
          newVal = progressOffsetWidth;
        }
        progressVideoCurrent.style.width =
          newVal < progressOffsetWidth
            ? `${newVal}px`
            : `${progressOffsetWidth}px`;
        const percent = Number((newVal / progressOffsetWidth).toFixed(2));
        emits("onUpdateProgress", percent * Number(videoPlayState.duration));
      }
    });
  });
  document.addEventListener("mouseup", function (e) {
    if (draggingVideoProgress) {
      draggingVideoProgress = false;
    }
  });
});
</script>

<template>
  <div
    class="progress"
    id="video-progress"
    @click="onChangeVideoProgress"
    @mousemove="onProgressMousemove"
    @mouseleave="onProgressMouseleave"
  >
    <div
      id="video-current-progress"
      class="progress_current"
      :style="{ width: `${videoPlayState.currentPercentTime}%` }"
    ></div>
    <div
      class="progress_buffered !absolute bottom-0"
      :style="{ width: `${videoPlayState.bufferedPercent}%` }"
    ></div>
    <div
      id="video-hover-progress"
      class="progress_current_hover !absolute"
      :style="{ width: `${videoPlayState.currentPercentTimeHover}%` }"
    >
      <div class="relative">
        <div
          id="video-hover-progress-time"
          class="absolute bottom-2 -right-4 invisible"
        >
          {{ toHHMMSS(videoPlayState.currentTimeHover) }}
        </div>
        <div
          id="video-hover-progress-capture"
          class="absolute bottom-10 -right-[80px] invisible"
          :class="`w-[${160}px] h-[${
            (160 * Number(videoWidth)) / Number(videoHeight)
          }px]`"
        >
          <canvas id="canvas"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
