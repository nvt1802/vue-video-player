<template>
  <div class="subtitles-menu">
    <div class="subtitles-menu-header">
      <div class="back-main-menu" @click="onBackToMenu('index')">
        <img
          :src="iconArrowLeft"
          width="14"
          height="14"
          class="my-auto icon-controls"
        />
        <div class="text-sm select-none">Phụ đề</div>
      </div>
      <div
        class="text-sm select-none cursor-pointer"
        @click="onOpenSubMenu('subtitles_options')"
      >
        Tuỳ Chỉnh
      </div>
    </div>
    <div
      class="subtitles-menu-item"
      v-for="(item, index) in listSubtitles"
      :key="index"
      @click="onChangeSubtitles(index)"
    >
      <div class="flex flex-row gap-2">
        <img
          v-if="trackIndexActive === index"
          :src="iconCheck"
          width="14"
          height="14"
          class="my-auto icon-controls select-none"
        />
        <div v-else class="w-[14px]"></div>
        <div class="select-none">
          {{ item?.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { iconCheck, iconArrowLeft } from "@/components/VideoPlayer/icons";
interface IProps {
  trackIndexActive: number;
  listSubtitles: any[];
}
const { trackIndexActive = 0, listSubtitles = [] } = defineProps<IProps>();
const emits = defineEmits([
  "onChangeSubtitles",
  "onBackToMenu",
  "onOpenSubMenu",
]);

const onChangeSubtitles = (item: number) => {
  emits("onChangeSubtitles", item);
  emits("onBackToMenu", "index");
};

const onOpenSubMenu = (menuType: string) => {
  emits("onOpenSubMenu", menuType);
};

const onBackToMenu = (menuType: string) => {
  emits("onBackToMenu", menuType);
};
</script>
