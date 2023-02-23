<template>
  <div v-if="editor" class="flex gap-1 flex-row flex-wrap m-2 bg-[#FAFAFA]">
    <button
      @click="editor?.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
    >
      <img :src="iconBold" width="16" height="16" />
    </button>
    <button
      @click="editor?.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
    >
      <img :src="iconItalic" width="12" height="12" />
    </button>
    <button
      @click="editor?.chain().focus().toggleUnderline().run()"
      :disabled="!editor.can().chain().focus().toggleUnderline().run()"
      :class="{ 'is-active': editor.isActive('underline') }"
    >
      <img :src="iconUnderline" width="12" height="12" />
    </button>
    <button
      @click="editor?.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }"
    >
      <img :src="iconStrike" width="16" height="16" />
    </button>
    <div class="border border-l"></div>
    <Paragraph :editor="editor" />
    <Alignments :editor="editor" />
    <button
      @click="editor?.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }"
    >
      <img :src="iconListBullet" width="16" height="16" />
    </button>
    <button
      @click="editor?.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }"
    >
      <img :src="iconListOrdered" width="16" height="16" />
    </button>
    <div class="border border-l"></div>
    <button
      @click="editor?.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
    >
      <img :src="iconCodeEditor" width="16" height="16" />
    </button>
    <button @click="editor?.chain().focus().unsetAllMarks().run()">
      <img :src="iconClearTextFormatting" width="16" height="16" />
    </button>
    <button
      @click="editor?.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }"
    >
      <img :src="iconCodeBlock" width="20" height="20" />
    </button>
    <button
      @click="editor?.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }"
    >
      <img :src="iconBlockQuote" width="16" height="16" />
    </button>
    <button @click="editor?.chain().focus().setHorizontalRule().run()">
      <img :src="iconHorizontalRule" width="16" height="16" />
    </button>
    <div class="border border-l"></div>
    <button
      @click="editor?.chain().focus().undo().run()"
      :disabled="!editor.can().chain().focus().undo().run()"
    >
      <img :src="iconUndo" width="20" height="20" />
    </button>
    <button
      @click="editor?.chain().focus().redo().run()"
      :disabled="!editor.can().chain().focus().redo().run()"
    >
      <img :src="iconRedo" width="20" height="20" />
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  iconBlockQuote,
  iconBold,
  iconClearTextFormatting,
  iconCodeBlock,
  iconCodeEditor,
  iconHorizontalRule,
  iconItalic,
  iconListBullet,
  iconListOrdered,
  iconRedo,
  iconStrike,
  iconUnderline,
  iconUndo,
} from "./icons/index";
import type { Editor } from "@tiptap/vue-3";
import Paragraph from "./Paragraph.vue";
import Alignments from "./Alignments.vue";

interface IProps {
  editor?: Editor;
}

const { editor } = defineProps<IProps>();
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
