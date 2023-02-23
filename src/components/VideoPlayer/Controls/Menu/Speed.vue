<template>
  <div class="speed-menu">
    <div class="speed-menu-header">
      <div class="back-main-menu" @click="onBackToMenu('index')">
        <img
          :src="iconArrowLeft"
          width="14"
          height="14"
          class="my-auto icon-controls"
        />
        <div class="text-sm select-none">Tốc độ phát</div>
      </div>
    </div>
    <div
      class="speed-menu-item"
      v-for="item in speedOptions"
      :key="item"
      @click="onChangePlayBackRate(item)"
    >
      <div class="flex flex-row gap-2">
        <img
          v-if="playbackRate === item"
          :src="iconCheck"
          width="14"
          height="14"
          class="my-auto icon-controls select-none"
        />
        <div v-else class="w-[14px]"></div>
        <div class="select-none">
          {{ item === 1 ? "Chuẩn" : item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { speedOptions } from "../../constants";
import { setSpeed } from "../../localStore";

import { iconCheck, iconArrowLeft } from "../../icons";

interface IProps {
  playbackRate: number;
}
const { playbackRate = 1 } = defineProps<IProps>();
const emits = defineEmits([
  "update:playbackRate",
  "onChangePlayBackRate",
  "onBackToMenu",
]);

const onChangePlayBackRate = (item: number) => {
  emits("onChangePlayBackRate", item);
  setSpeed(item);
  emits("onBackToMenu", "index");
};

const onBackToMenu = (menuType: string) => {
  emits("onBackToMenu", menuType);
};
</script>
