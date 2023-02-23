<template>
  <div class="main-menu">
    <div class="main-menu-item">
      <div class="flex flex-row gap-2">
        <img
          :src="iconVideoFile"
          width="20"
          height="20"
          class="my-auto icon-controls"
        />
        <div class="select-none capitalize">Hiện tên Video</div>
      </div>
      <div class="flex flex-row gap-1">
        <Switch :checked="isDisplayName" @on-change-state="onDisplayName" />
      </div>
    </div>
    <div class="main-menu-item">
      <div class="flex flex-row gap-2">
        <img
          :src="iconRepeat"
          width="20"
          height="20"
          class="my-auto icon-controls"
        />
        <div class="select-none capitalize">Lặp lại</div>
      </div>
      <div class="flex flex-row gap-1">
        <Switch @on-change-state="onRepeat" />
      </div>
    </div>
    <div
      class="main-menu-item"
      @click="onOpenSubMenu('subtitles')"
      v-if="isShowSubtitleMenu"
    >
      <div class="flex flex-row gap-2">
        <img
          :src="iconSubtitles"
          width="20"
          height="20"
          class="my-auto icon-controls"
        />
        <div>
          Phụ đề <span v-if="total">({{ total }})</span>
        </div>
      </div>
      <div class="flex flex-row gap-1">
        <div class="select-none">
          {{ tracklabel }}
        </div>
        <img
          :src="iconArrowRight"
          width="14"
          height="14"
          class="my-auto icon-controls"
        />
      </div>
    </div>
    <div class="main-menu-item" @click="onOpenSubMenu('speed')">
      <div class="flex flex-row gap-2">
        <img
          :src="iconSpeed"
          width="20"
          height="20"
          class="my-auto icon-controls"
        />
        <div class="select-none capitalize">Tốc độ phát</div>
      </div>
      <div class="flex flex-row gap-1">
        <div class="select-none">
          {{ playbackRate === 1 ? "Chuẩn" : playbackRate }}
        </div>
        <img
          :src="iconArrowRight"
          width="14"
          height="14"
          class="my-auto icon-controls"
        />
      </div>
    </div>
    <div class="main-menu-item">
      <div class="flex flex-row gap-2">
        <img
          :src="iconOptions"
          width="20"
          height="20"
          class="my-auto icon-controls"
        />
        <div class="select-none capitalize">Chất lượng</div>
      </div>
      <div class="flex flex-row gap-1">
        <div class="select-none">1080 HD</div>
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
  iconArrowRight,
  iconOptions,
  iconRepeat,
  iconSpeed,
  iconSubtitles,
  iconVideoFile,
} from "@/components/VideoPlayer/icons";

import Switch from "@/components/Switch/index.vue";
import { setDisplayName } from "../../localStore";

interface IProps {
  playbackRate: number;
  isShowSubtitleMenu: boolean;
  tracklabel: string;
  total?: number;
  isDisplayName?: boolean;
}

const {
  playbackRate = 1,
  isShowSubtitleMenu = true,
  tracklabel = "",
  total = 0,
  isDisplayName = false,
} = defineProps<IProps>();
const emits = defineEmits([
  "update:playbackRate",
  "update:isDisplayName",
  "onOpenSubMenu",
  "onRepeat",
  "onDisplayName",
]);

const onOpenSubMenu = (menuType: string) => {
  emits("onOpenSubMenu", menuType);
};

const onRepeat = (state: boolean) => {
  emits("onRepeat", state);
};

const onDisplayName = (state: boolean) => {
  emits("update:isDisplayName", state);
  setDisplayName(state);
};
</script>
