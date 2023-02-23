<script setup lang="ts">
import { ref } from "vue";

interface IProps {
  checked?: boolean;
}

const { checked = true } = defineProps<IProps>();

const state = ref<boolean>(checked);
const emits = defineEmits(["onChangeState"]);

const onInput = (e: any) => {
  emits("onChangeState", !state.value);
  state.value = !state.value;
};
</script>

<template>
  <label class="switch">
    <input type="checkbox" :checked="checked" @input="onInput" />
    <span class="slider round"></span>
  </label>
</template>

<style scoped lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 18px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 0px;
  bottom: 0px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #f55050;
}

input:focus + .slider {
  box-shadow: 0 0 1px #f55050;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
