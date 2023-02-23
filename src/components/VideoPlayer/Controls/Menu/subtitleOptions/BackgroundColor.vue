<template>
  <div class="subtitles-menu">
    <div class="subtitles-menu-header">
      <div class="back-main-menu" @click="onBackToMenu('subtitles_options')">
        <img
          :src="iconArrowLeft"
          width="14"
          height="14"
          class="my-auto icon-controls"
        />
        <div class="text-sm select-none">Màu Nền</div>
      </div>
    </div>
    <div
      class="subtitles-menu-item"
      :key="`${index}-${item}`"
      v-for="(item, index) in backgroundColorOptions"
      @click="onChangeBackGroundColor(item.rgba)"
    >
      <div class="flex flex-row gap-2">
        <img
          v-if="
            subtitleOptions.backgroundColor.join('-') === item.rgba.join('-')
          "
          :src="iconCheck"
          width="14"
          height="14"
          class="my-auto icon-controls select-none"
        />
        <div v-else class="w-[14px]"></div>
        <div class="select-none capitalize">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { backgroundColorOptions } from "../../../constants";
import { setBackgroundColor } from "../../../localStore";
import { inject } from "vue";

import { iconArrowLeft, iconCheck } from "../../../icons";
import type { SubtitleOptions } from "../../../types";

const emits = defineEmits(["update:backgroundColor", "onBackToMenu"]);
const subtitleOptions = inject("subtitleOptions") as SubtitleOptions;

const onChangeBackGroundColor = (color: number[]) => {
  subtitleOptions.backgroundColor = color;
  setBackgroundColor(color);
  emits("onBackToMenu", "subtitles_options");
};

const onBackToMenu = (menuType: string) => {
  emits("onBackToMenu", menuType);
};
</script>
