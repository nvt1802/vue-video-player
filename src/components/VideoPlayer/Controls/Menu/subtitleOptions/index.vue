<template>
  <div class="subtitles-menu">
    <div class="subtitles-menu-header">
      <div class="back-main-menu" @click="onBackToMenu('subtitles')">
        <img
          :src="iconArrowLeft"
          width="14"
          height="14"
          class="my-auto icon-controls"
        />
        <div class="text-sm select-none">Tuỳ Chọn</div>
      </div>
    </div>
    <div
      class="subtitles-menu-item"
      :key="`${index}-${item.label}`"
      v-for="(item, index) in subtitlesOptions"
      @click="onOpenSubMenu(item.type as MenuType)"
    >
      <div class="flex flex-row gap-2">
        <div class="select-none capitalize ml-4">
          {{ item.label }}
        </div>
      </div>
      <div class="flex flex-row gap-1">
        <div class="select-none capitalize">
          {{ displayValueItem(item.type) }}
        </div>
        <img
          :src="iconArrowRight"
          width="14"
          height="14"
          class="my-auto icon-controls"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
backgroundColorOptions,
backgroundOpacityOptions, colorOptions, subtitlesOptions
} from "@/components/VideoPlayer/constants";
import { iconArrowLeft, iconArrowRight } from "@/components/VideoPlayer/icons";
import type { MenuType, SubtitleOptions } from "@/components/VideoPlayer/types";

interface IProps {
  subtitleOptions: SubtitleOptions;
}
const { subtitleOptions } = defineProps<IProps>();
const emits = defineEmits([
  "update:subtitleOptions",
  "onBackToMenu",
  "onOpenSubMenu",
]);

const onOpenSubMenu = (menuType: string) => {
  emits("onOpenSubMenu", menuType);
};

const onBackToMenu = (menuType: string) => {
  emits("onBackToMenu", menuType);
};

const displayValueItem = (type: string) => {
  switch (type) {
    case "font_family":
      return subtitleOptions.fontFamily;
    case "font_color":
      return (
        colorOptions.find((item) => item.hex === subtitleOptions.fontColor)
          ?.label || ""
      );
    case "font_size":
      return `${subtitleOptions.fontSize}`;
    case "background_color":
      return (
        backgroundColorOptions.find(
          (item) =>
            item.rgba.join(",") === subtitleOptions.backgroundColor.join(",")
        )?.label || ""
      );
    case "background_opacity":
      return (
        backgroundOpacityOptions.find(
          (item) => item.value === subtitleOptions.backgroundOpacity
        )?.label || ""
      );
    default:
      return "";
  }
};
</script>
