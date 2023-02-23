<template>
  <button class="relative flex flex-row select-none" @click="onClickMenu">
    <img
      :src="`${
        editor.isActive('paragraph')
          ? iconParagraph
          : editor.isActive('heading', { level: 1 })
          ? iconH1
          : editor.isActive('heading', { level: 2 })
          ? iconH2
          : editor.isActive('heading', { level: 3 })
          ? iconH3
          : editor.isActive('heading', { level: 4 })
          ? iconH4
          : editor.isActive('heading', { level: 5 })
          ? iconH5
          : editor.isActive('heading', { level: 6 })
          ? iconH6
          : iconParagraph
      }`"
      width="20"
      height="20"
    />
    <img :src="iconArrowDown" width="20" height="20" />
    <div
      ref="menuRef"
      class="absolute bg-[#FAFAFA] z-10 top-8 border border-[#D7D7D7] rounded-sm p-1 min-w-[200px] invisible"
      :class="[{ '!visible ': isShowMenu }]"
      @mousemove="isFocusMenu = true"
      @mouseleave="isFocusMenu = false"
      @blur="onBlurMenu"
      tabindex="0"
    >
      <div class="text-left">
        <div
          class="flex flex-row hover:bg-[#D7D7D7] gap-1 py-1"
          @click="editor?.chain().focus().setParagraph().run()"
          :class="{ 'is-active': editor.isActive('paragraph') }"
        >
          <img :src="iconParagraph" width="20" height="20" />
          <p>paragraph</p>
        </div>
        <div
          class="flex flex-row hover:bg-[#D7D7D7] gap-1 py-1"
          @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          <img :src="iconH1" width="20" height="20" />
          <p class="text-4xl whitespace-nowrap">Heading 1</p>
        </div>
        <div
          class="flex flex-row hover:bg-[#D7D7D7] gap-1 py-1"
          @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          <img :src="iconH2" width="20" height="20" />
          <p class="text-3xl whitespace-nowrap">Heading 2</p>
        </div>
        <div
          class="flex flex-row hover:bg-[#D7D7D7] gap-1 py-1"
          @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          <img :src="iconH3" width="20" height="20" />
          <p class="text-2xl whitespace-nowrap">Heading 3</p>
        </div>
        <div
          class="flex flex-row hover:bg-[#D7D7D7] gap-1 py-1"
          @click="editor?.chain().focus().toggleHeading({ level: 4 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
        >
          <img :src="iconH4" width="20" height="20" />
          <p class="text-xl whitespace-nowrap">Heading 4</p>
        </div>
        <div
          class="flex flex-row hover:bg-[#D7D7D7] gap-1 py-1"
          @click="editor?.chain().focus().toggleHeading({ level: 5 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
        >
          <img :src="iconH5" width="20" height="20" />
          <p class="text-lg whitespace-nowrap">Heading 5</p>
        </div>
        <div
          class="flex flex-row hover:bg-[#D7D7D7] gap-1 py-1"
          @click="editor?.chain().focus().toggleHeading({ level: 6 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
        >
          <img :src="iconH6" width="20" height="20" />
          <p class="text-sm whitespace-nowrap">Heading 6</p>
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
  iconH1,
  iconH2,
  iconH3,
  iconH4,
  iconH5,
  iconH6,
  iconParagraph,
} from "./icons/index";

interface IProps {
  editor: Editor;
}

const { editor } = defineProps<IProps>();

const isShowMenu = ref(false);
const menuRef = ref();
const isFocusMenu = ref<boolean>(false);

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
