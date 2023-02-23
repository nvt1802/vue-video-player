<template>
  <button class="relative flex flex-row select-none" @click="onClickMenu">
    <img
      :src="`${
        editor.isActive({ textAlign: 'left' })
          ? iconAlignLeft
          : editor.isActive({ textAlign: 'right' })
          ? iconAlignRight
          : editor.isActive({ textAlign: 'center' })
          ? iconAlignCenter
          : editor.isActive({ textAlign: 'justify' })
          ? iconAlignJustify
          : iconAlignLeft
      }`"
      width="20"
      height="20"
    />
    <img :src="iconArrowDown" width="20" height="20" />
    <div
      ref="menuRef"
      class="absolute bg-[#FAFAFA] z-10 top-8 border border-[#D7D7D7] rounded-sm p-2 min-w-[125px] invisible"
      :class="[{ '!visible ': isShowMenu }]"
      @mousemove="isFocusMenu = true"
      @mouseleave="isFocusMenu = false"
      @blur="onBlurMenu"
      tabindex="0"
    >
      <div class="text-left">
        <div
          class="flex flex-row hover:bg-[#D7D7D7] gap-2 py-1"
          @click="onChangeAlign('center')"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <img :src="iconAlignCenter" width="20" height="20" />
          <p class="text-sm whitespace-nowrap">Align center</p>
        </div>
        <div
          class="flex flex-row hover:bg-[#D7D7D7] gap-2 py-1"
          @click="onChangeAlign('left')"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <img :src="iconAlignLeft" width="20" height="20" />
          <p class="text-sm whitespace-nowrap">Align left</p>
        </div>
        <div
          class="flex flex-row hover:bg-[#D7D7D7] gap-2 py-1"
          @click="onChangeAlign('right')"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <img :src="iconAlignRight" width="20" height="20" />
          <p class="text-sm whitespace-nowrap">Align right</p>
        </div>
        <div
          class="flex flex-row hover:bg-[#D7D7D7] gap-2 py-1"
          @click="onChangeAlign('justify')"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          <img :src="iconAlignJustify" width="20" height="20" />
          <p class="text-sm whitespace-nowrap">Align justify</p>
        </div>
      </div>
    </div>
  </button>
</template>

<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3";
import { ref } from "vue";

import {
  iconArrowDown,
  iconAlignCenter,
  iconAlignJustify,
  iconAlignLeft,
  iconAlignRight,
} from "./icons/index";

interface IProps {
  editor: Editor;
}

const { editor } = defineProps<IProps>();

const isShowMenu = ref(false);
const menuRef = ref();
const isFocusMenu = ref<boolean>(false);

const onChangeAlign = (key: string) => {
  editor.chain().focus().setTextAlign(key).run();
};

const onClickMenu = () => {
  isShowMenu.value = !isShowMenu.value;
  setTimeout(() => {
    menuRef.value.focus();
  }, 100);
};

const onBlurMenu = () => {
  if (!isFocusMenu.value) {
    isShowMenu.value = false;
  }
};
</script>

<style scoped lang="scss">
button {
  @apply p-1;
  &:hover {
    background: rgba(0, 0, 0, 0.12);
    border-color: rgba(0, 0, 0, 0.12);
    border-style: solid;
    border-width: 0;
    border-radius: 0;
    color: rgba(0, 0, 0, 0.87);
    > img {
      filter: unset;
    }
  }
}

.is-active {
  @apply bg-black text-white;
  > img {
    filter: invert(100%) sepia(100%) saturate(17%) hue-rotate(214deg)
      brightness(105%) contrast(100%);
  }
}
</style>
