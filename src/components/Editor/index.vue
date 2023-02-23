<template>
  <div class="max-w-[1000px] mx-auto border border-[#D7D7D7]">
    <Controls v-if="editor" :editor="editor" />
    <EditorContent v-if="editor" :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import { Editor, EditorContent } from "@tiptap/vue-3";
import { onMounted, onUnmounted, ref, watch } from "vue";

import Controls from "./Controls.vue";

interface IProps {
  modelValue: any;
}
const { modelValue } = defineProps<IProps>();
const emits = defineEmits(["update:modelValue"]);

const editor = ref<Editor>();

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Underline,
      Heading,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: modelValue,
    onUpdate: () => {
      emits("update:modelValue", editor.value?.getHTML());
    },
  });

  setTimeout(() => {
    editor.value?.commands.setContent(modelValue, false);
  }, 100);
});

onUnmounted(() => {
  editor.value?.destroy();
});

watch(
  () => editor.value,
  (newVal: any) => {
    const isSame = editor.value?.getHTML() === newVal;
    if (isSame) {
      return;
    }
    editor.value?.commands.setContent(newVal, false);
  },
  { deep: true }
);
</script>

<style lang="scss">
.ProseMirror {
  @apply w-full mx-auto p-2 border-t border-[#D7D7D7] max-h-[450px] overflow-y-auto outline-none;
  > * + * {
    margin-top: 0.75em;
  }

  code {
    display: block;
    white-space: pre-wrap;
    font-size: 0.8rem;
    padding: 0.75rem 1rem;
    background-color: #e9ecef;
    color: #495057;
  }

  h1 {
    @apply text-4xl;
  }
  h2 {
    @apply text-3xl;
  }
  h3 {
    @apply text-2xl;
  }
  h4 {
    @apply text-xl;
  }
  h5 {
    @apply text-lg;
  }
  h6 {
    @apply text-sm;
  }
  ul {
    @apply list-disc ml-5;
  }
  ol {
    @apply list-decimal ml-5;
  }
  blockquote {
    color: inherit;
    border-left-width: 2px;
    padding-left: 0.5rem;
  }
}
</style>
