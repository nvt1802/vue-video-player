<script setup lang="ts">
import { inject } from "vue";
import type { SubtitleOptions } from "../types";
interface IProps {
  isCaption: boolean;
  currentCue: any;
  isShowMenuSetting: boolean;
  isShowControl: boolean;
  videoIsPlay: boolean;
  isFullscreen: boolean;
  screen: any;
  videoWidth: string | number | undefined;
}

const {
  isCaption,
  currentCue,
  videoIsPlay,
  isShowControl,
  isShowMenuSetting,
  isFullscreen,
  screen,
  videoWidth,
} = defineProps<IProps>();

const subtitleOptions = inject("subtitleOptions") as SubtitleOptions;
</script>

<template>
  <div
    class="captions"
    v-if="isCaption && currentCue"
    :class="[
      {
        '!bottom-12':
          isShowMenuSetting || !videoIsPlay || (isShowControl && videoIsPlay),
      },
    ]"
    :style="{
      height: isFullscreen
        ? `${
            subtitleOptions.fontSize + 20 * (screen.width / Number(videoWidth))
          }px`
        : `${subtitleOptions.fontSize + 20}px`,
    }"
  >
    <div class="text-center">
      <span
        class="p-1"
        :style="{
          fontFamily: subtitleOptions.fontFamily,
          color: subtitleOptions.fontColor,
          fontSize: isFullscreen
            ? `${
                subtitleOptions.fontSize * (screen.width / Number(videoWidth))
              }px`
            : `${subtitleOptions.fontSize}px`,
          backgroundColor: `rgba(${[
            ...subtitleOptions.backgroundColor,
            subtitleOptions.backgroundOpacity,
          ].join(', ')})`,
        }"
        >{{ currentCue }}</span
      >
    </div>
  </div>
</template>
