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
        <div class="text-sm select-none">Font Chữ</div>
      </div>
    </div>
    <div
      class="subtitles-menu-item"
      :key="`${index}-${item}`"
      v-for="(item, index) in fontFamilyOptions"
      @click="onChangeFontFamily(item)"
    >
      <div class="flex flex-row gap-2">
        <img
          v-if="subtitleOptions.fontFamily === item"
          :src="iconCheck"
          width="14"
          height="14"
          class="my-auto icon-controls select-none"
        />
        <div v-else class="w-[14px]"></div>
        <div class="select-none capitalize">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fontFamilyOptions } from "@/components/VideoPlayer/constants";
import { setFontFamily } from "@/components/VideoPlayer/localStore";
import { inject } from "vue";

import { iconArrowLeft, iconCheck } from "@/components/VideoPlayer/icons";
import type { SubtitleOptions } from "@/components/VideoPlayer/types";

const emits = defineEmits(["update:fontFamily", "onBackToMenu"]);
const subtitleOptions = inject("subtitleOptions") as SubtitleOptions;

const onChangeFontFamily = (font: string) => {
  subtitleOptions.fontFamily = font;
  setFontFamily(font);
  emits("onBackToMenu", "subtitles_options");
};

const onBackToMenu = (menuType: string) => {
  emits("onBackToMenu", menuType);
};
</script>
