<script setup lang="ts">
import { onMounted } from "vue";

interface IProps {
  volume: number;
}

const { volume } = defineProps<IProps>();

const emits = defineEmits(["onChangeVolume"]);

onMounted(() => {
  const rangeInputs = document.querySelectorAll('input[type="range"]');
  if (rangeInputs) {
    rangeInputs?.forEach((input) => {
      input.addEventListener("input", handleInputChange);
    });
  }

  function handleInputChange(e: any) {
    let target = e.target;
    if (e.target.type !== "range") {
      target = document.getElementById("range");
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
  }
});

const onInput = (e: any) => {
  emits("onChangeVolume", Number(e.target.value) / 100);
};
</script>

<template>
  <input
    type="range"
    :value="volume * 100"
    min="0"
    max="100"
    id="range"
    @input="onInput"
    :style="{ backgroundSize: `${volume * 100}% 100%` }"
  />
</template>

<style scoped lang="scss">
input[type="number"] {
  width: 40px;
  padding: 4px 5px;
  border: 1px solid #bbb;
  border-radius: 3px;
}

input[type="range"] {
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.3);
  /* border-radius: 5px; */
  background-image: linear-gradient(#fffff8, #fffff8);
  background-repeat: no-repeat;
  cursor: pointer;
}

/* Input Thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #fffff8;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  /* border-radius: 50%; */
  background: #fffff8;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  /* border-radius: 50%; */
  background: #ff4500;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background 0.3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #fffff8;
}

input[type="range"]::-moz-range-thumb:hover {
  background: #fffff8;
}

input[type="range"]::-ms-thumb:hover {
  background: #fffff8;
}

/* Input Track */
input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type="range"]::-moz-range-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type="range"]::-ms-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
