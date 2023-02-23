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
        <div class="text-sm select-none">Kích Thước Font</div>
      </div>
    </div>
    <div
      class="subtitles-menu-item"
      :key="`${index}-${item}`"
      v-for="(item, index) in fontSizeOptions"
      @click="onChangeFontSize(item)"
    >
      <div class="flex flex-row gap-2">
        <img
          v-if="subtitleOptions.fontSize === item"
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
import { fontSizeOptions } from "../../../constants";
import { setFontSize } from "../../../localStore";
import { inject } from "vue";

import { iconArrowLeft, iconCheck } from "../../../icons";
import type { SubtitleOptions } from "../../../types";

const emits = defineEmits(["update:fontSize", "onBackToMenu"]);

const subtitleOptions = inject("subtitleOptions") as SubtitleOptions;

const onChangeFontSize = (size: number) => {
  subtitleOptions.fontSize = size;
  setFontSize(size);
  emits("onBackToMenu", "subtitles_options");
};

const onBackToMenu = (menuType: string) => {
  emits("onBackToMenu", menuType);
};
</script>
