<template>
  <div
    id="video-component"
    class="video-container"
    :style="{
      width: `${
        isFullscreen
          ? `100%`
          : isVertical
          ? `${(height * height) / width + 160}px`
          : `${width}px`
      }`,
      height: `${
        isFullscreen ? `100%` : isVertical ? `` : `${height}px`
      }`,
    }"
  >
    <div
      v-if="videoPlayState.isDisplayName"
      class="absolute z-20 top-1 left-1 cursor-pointer select-none text-white py-0.5 px-1 rounded"
      :style="{ background: 'rgba(8,8,8,0.5)' }"
    >
      {{ videoDisplayName }}
    </div>
    <video
      class="my-auto"
      :width="
        isFullscreen
          ? isVertical
            ? (screen.height * screen.height) / screen.width
            : screen.width
          : isVertical
          ? (height * height) / width + 160
          : width
      "
      :height="isFullscreen ? screen.height : height"
      ref="videoRef"
      id="video"
      @timeupdate="timeUpdate"
      @volumechange="volumeChange"
      @seeking="seeking"
      @seeked="seeked"
      @loadstart="loadStart"
      @playing="onPlaying"
      @pause="onPause"
      @ended="onEnded"
      :src="videoUrl"
    >
      <template v-if="tracks.length > 0">
        <track
          v-for="(item, index) in tracks"
          :key="index"
          :label="item.label"
          :kind="item.kind"
          :srclang="item.srclang"
          :src="item.src"
        />
      </template>
    </video>
    <div
      class="video-layout"
      @mousemove="onMouseMoveVideoLayout"
      @mouseleave="onMouseLeaveVideoLayout"
    >
      <div class="video-play" @click="onPlayVideo">
        <img
          v-if="renderComponent"
          :src="iconDisplay"
          width="70"
          height="70"
          class="my-auto icon-play"
        />
      </div>
      <Captions
        :current-cue="currentCue[videoPlayState.trackIndexActive]"
        :is-caption="videoPlayState.isCaption"
        :is-fullscreen="isFullscreen"
        :is-show-control="isShowControl"
        :is-show-menu-setting="isShowMenuSetting"
        :subtitle-options="subtitleOptions"
        :video-is-play="videoPlayState.videoIsPlay"
        :video-width="width"
        :screen="screen"
      />
      <div
        class="controls"
        id="controls"
        :class="[
          { '!visible': isShowMenuSetting || !videoPlayState.videoIsPlay },
          { '!visible': isShowControl && videoPlayState.videoIsPlay },
        ]"
      >
        <Progress
          v-if="videoPlayState.duration"
          :video-play-state="videoPlayState"
          :video-width="width"
          :video-height="height"
          :video-url="videoUrl"
          :is-vertical="isVertical"
          @on-update-progress="onUpdateProgress"
        ></Progress>
        <div class="control-list-item">
          <div class="control-group-item">
            <div>
              <img
                :src="videoPlayState.videoIsPlay ? iconPause : iconPlay"
                width="24"
                height="24"
                class="my-auto icon-controls"
                @click="onPlayVideo"
              />
            </div>
            <div id="volume">
              <img
                :src="
                  videoPlayState.muted
                    ? iconVolumeOff
                    : Number(videoPlayState.percentVolume) > 0.7
                    ? iconVolumeL
                    : Number(videoPlayState.percentVolume) > 0.4
                    ? iconVolumeM
                    : iconVolumeS
                "
                width="24"
                height="24"
                class="my-auto icon-controls"
                @click="onChangeMuteState"
              />
              <Volume
                class="my-auto volume-progress"
                :volume="videoPlayState.percentVolume"
                @on-change-volume="onChangeVolume"
              />
            </div>
            <div class="text-white text-sm my-auto select-none">
              {{ videoPlayState.currentTimeDisplay }} /
              {{ videoPlayState.durationDisplay }}
            </div>
          </div>
          <div class="control-group-item">
            <div>
              <img
                v-if="tracks.length > 0"
                :src="
                  videoPlayState.isCaption ? iconSubtitle : iconSubtitleDisable
                "
                width="24"
                height="24"
                class="my-auto icon-controls"
                @click="onChangeCaption"
              />
            </div>
            <div>
              <img
                :src="iconPIP"
                width="24"
                height="24"
                class="my-auto icon-controls"
                @click="onPictureInPicture"
              />
            </div>
            <div class="relative">
              <img
                id="icon-settings"
                tabindex="0"
                :src="iconSettings"
                width="24"
                height="24"
                class="my-auto icon-controls icon-settings hover:duration-300"
                :class="[{ 'rotate-90': isShowMenuSetting }]"
                @click="onChangeMenuSetting"
                @blur="onBlurMenuSetting"
              />
              <div
                id="menu-container"
                v-show="isShowMenuSetting"
                class="menu-container"
                ref="menuSettingRef"
                tabindex="0"
                @mousemove="isFocusMenu = true"
                @mouseleave="isFocusMenu = false"
                @blur="onBlurMenuSetting"
                :style="{
                  bottom: menu.config.bottom,
                  left: menu.config.left,
                  width: menu.config.with,
                  height: menu.config.height,
                  maxHeight: menu.config.height,
                }"
              >
                <div class="menu">
                  <MainMenu
                    v-if="menu.type === 'index'"
                    v-model:playback-rate="videoPlayState.playbackRate"
                    v-model:is-display-name="videoPlayState.isDisplayName"
                    :total="tracks.length"
                    :is-show-subtitle-menu="tracks.length > 0"
                    :tracklabel="
                      tracks.length > 0
                        ? videoRef?.textTracks[videoPlayState.trackIndexActive]
                            ?.label || ''
                        : ''
                    "
                    @on-open-sub-menu="onOpenSubMenu"
                    @on-repeat="onRepeat"
                  />

                  <Speed
                    v-if="menu.type === 'speed'"
                    v-model:playback-rate="videoPlayState.playbackRate"
                    @on-back-to-menu="onBackToMenu"
                    @on-change-play-back-rate="onChangePlayBackRate"
                  />

                  <Subtitles
                    v-if="menu.type === 'subtitles'"
                    :list-subtitles="listSubtitles"
                    :trackIndexActive="videoPlayState.trackIndexActive"
                    @on-back-to-menu="onBackToMenu"
                    @on-change-subtitles="onChangeSubtitles"
                    @on-open-sub-menu="onOpenSubMenu"
                  />

                  <SubtitleOptionsMenu
                    v-if="menu.type === 'subtitles_options'"
                    v-model:subtitle-options="subtitleOptions"
                    @on-back-to-menu="onBackToMenu"
                    @on-open-sub-menu="onOpenSubMenu"
                  />

                  <FontFamily
                    v-if="menu.type === 'font_family'"
                    @on-back-to-menu="onBackToMenu"
                  />

                  <FontColor
                    v-if="menu.type === 'font_color'"
                    @on-back-to-menu="onBackToMenu"
                  />

                  <FontSize
                    v-if="menu.type === 'font_size'"
                    @on-back-to-menu="onBackToMenu"
                  />

                  <BackgroundColor
                    v-if="menu.type === 'background_color'"
                    @on-back-to-menu="onBackToMenu"
                  />

                  <BackgroundOpacity
                    v-if="menu.type === 'background_opacity'"
                    @on-back-to-menu="onBackToMenu"
                  />
                </div>
              </div>
            </div>
            <div>
              <img
                :src="isFullscreen ? iconFullScreenExit : iconFullScreen"
                width="24"
                height="24"
                class="my-auto icon-controls"
                @click="onFullScreen"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./styles.scss";
import { toHHMMSS } from "../../utils/index";
import { onMounted, provide, reactive, ref } from "vue";
import { listConfigMenu } from "./constants";
import { getData, setCaption, setMuted, setVolume } from "./localStore";
import type {
  MenuItem,
  MenuType,
  SubtitleOptions,
  TrackItem,
  VideoPlayState,
} from "./types";

import {
  iconBackward,
  iconForward,
  iconFullScreen,
  iconMediaPause,
  iconMediaPlay,
  iconPause,
  iconPlay,
  iconSettings,
  iconSubtitle,
  iconSubtitleDisable,
  iconVolumeL,
  iconVolumeM,
  iconVolumeOff,
  iconVolumeS,
  iconFullScreenExit,
  iconPIP,
} from "./icons/index";

import Volume from "./Controls/volume.vue";
import Captions from "./Captions/index.vue";
import MainMenu from "./Controls/Menu/MainMenu.vue";
import Speed from "./Controls/Menu/Speed.vue";
import BackgroundColor from "./Controls/Menu/subtitleOptions/BackgroundColor.vue";
import BackgroundOpacity from "./Controls/Menu/subtitleOptions/BackgroundOpacity.vue";
import FontColor from "./Controls/Menu/subtitleOptions/FontColor.vue";
import FontFamily from "./Controls/Menu/subtitleOptions/FontFamily.vue";
import FontSize from "./Controls/Menu/subtitleOptions/FontSize.vue";
import SubtitleOptionsMenu from "./Controls/Menu/subtitleOptions/index.vue";
import Subtitles from "./Controls/Menu/Subtitles.vue";
import Progress from "./Progress/index.vue";

export interface IProps {
  videoUrl: string;
  tracks: TrackItem[];
  width: number;
  height: number;
  videoDisplayName?: string;
  autoPlay?: boolean;
  isVertical?: boolean;
}

const {
  tracks,
  videoUrl,
  width,
  height,
  videoDisplayName = "",
  autoPlay = false,
  isVertical,
} = defineProps<IProps>();

const emits = defineEmits(["onEnded"]);

const videoRef = ref<HTMLVideoElement>();
const currentCue = ref<any>({});

const menuSettingRef = ref<HTMLDivElement>();
const isFocusMenu = ref<boolean>(false);
const isShowMenuSetting = ref<boolean>(false);
const listSubtitles = ref<any[]>([]);
const renderComponent = ref<boolean>(false);
const iconDisplay = ref<string>(iconMediaPlay);
const isFullscreen = ref<boolean>(false);
const isShowControl = ref<boolean>(false);

const screen = reactive({
  width: 0,
  height: 0,
});
const videoPlayState = reactive<VideoPlayState>({
  videoIsPlay: false,
  muted: false,
  currentTime: 0,
  duration: 0,
  currentTimeDisplay: "",
  durationDisplay: "",
  currentPercentTime: 0,
  percentVolume: 1,
  isCaption: true,
  trackIndexActive: 0,
  playbackRate: 1,
  currentTimeHover: 0,
  currentPercentTimeHover: 0,
  isDisplayName: false,
  bufferedPercent: 0,
});

const subtitleOptions = reactive<SubtitleOptions>({
  fontFamily: "system-ui",
  fontColor: "#FFFFFF",
  fontSize: 16,
  backgroundColor: [8, 8, 8],
  backgroundOpacity: 0.5,
});
provide("subtitleOptions", subtitleOptions);

const menu = ref<MenuItem>(listConfigMenu[0]);

const timeUpdate = (event: any) => {
  videoPlayState.currentTimeDisplay = toHHMMSS(event.target?.currentTime);
  videoPlayState.currentTime = event.target?.currentTime || 0;
  videoPlayState.currentPercentTime = Number(
    (event.target.currentTime.toFixed(0) / event.target.duration.toFixed(0)) *
      100
  );
  if (videoRef.value && videoRef.value?.duration === event.target.currentTime) {
    videoPlayState.videoIsPlay = false;
    videoRef.value.currentTime = 0;
  }

  if (videoRef.value) {
    const buffered = videoRef.value.buffered;
    if (videoPlayState.duration > 0) {
      for (var i = 0; i < videoRef.value.buffered.length; i++) {
        if (
          buffered.start(buffered.length - 1 - i) < videoPlayState.currentTime
        ) {
          videoPlayState.bufferedPercent =
            (buffered.end(buffered.length - 1 - i) / videoPlayState.duration) *
            100;
          break;
        }
      }
    }
  }
};

const volumeChange = (event: any) => {
  const isMuted = event.target.muted;
  const volumeValue = event.target.volume;
  videoPlayState.muted = isMuted;
  videoPlayState.percentVolume = isMuted ? 0 : Number(volumeValue);
  setMuted(isMuted);
  setVolume(isMuted ? 0 : Number(volumeValue));
  if (!isMuted) {
    if (event.target.volume === 0) {
      iconDisplay.value = iconVolumeOff;
    } else if (event.target.volume > 0 && event.target.volume <= 0.4) {
      iconDisplay.value = iconVolumeS;
    } else if (event.target.volume > 0.4 && event.target.volume < 0.7) {
      iconDisplay.value = iconVolumeM;
    } else {
      iconDisplay.value = iconVolumeL;
    }
  } else {
    iconDisplay.value = iconVolumeOff;
  }
  forceRerender();
};

const loadStart = (event: any) => {
  const listTrack = event.target.textTracks;
  event.target.muted = videoPlayState.muted;
  event.target.volume = videoPlayState.percentVolume;
  event.target.playbackRate = videoPlayState.playbackRate;
  event.target.onloadedmetadata = function () {
    if (videoRef.value) {
      videoPlayState.currentTimeDisplay = toHHMMSS(event.target.currentTime);
      videoPlayState.currentTime = event.target?.currentTime || 0;
      videoPlayState.durationDisplay = toHHMMSS(event.target.duration);
      videoPlayState.duration = event.target?.duration || 0;
    }
  };
  listSubtitles.value = listTrack as any;
  for (const track of listTrack) {
    track.mode = "hidden";
  }
  for (let i = 0; i < listTrack.length; i++) {
    listTrack[i].mode = "hidden";
    listTrack[i].oncuechange = function (e: Event) {
      const { currentTarget }: any = e;
      currentCue.value[i] = currentTarget?.activeCues[0]?.text;
    };
  }
  if (autoPlay && videoRef.value) {
    videoRef.value.play();
  }
};

const onPlaying = async (event: any) => {
  videoPlayState.videoIsPlay = true;
  forceRerender();
};

const onPause = async (event: any) => {
  videoPlayState.videoIsPlay = false;
  forceRerender();
};

const seeking = (event: any) => {};

const seeked = (event: any) => {};

onMounted(() => {
  const videoState = getData();
  videoPlayState.muted = videoState.muted;
  subtitleOptions.fontSize = videoState.fontSize;
  subtitleOptions.backgroundColor = videoState.backgroundColor || [8, 8, 8];
  subtitleOptions.backgroundOpacity = videoState.backgroundOpacity;
  subtitleOptions.fontColor = videoState.fontColor;
  subtitleOptions.fontFamily = videoState.fontFamily;
  videoPlayState.playbackRate = videoState.speed || 1;
  videoPlayState.isCaption = videoState.caption;
  videoPlayState.percentVolume = videoState.muted
    ? 0
    : Math.abs(Number(videoState.volume));
  videoPlayState.isDisplayName = videoState.isDisplayName;

  document.addEventListener("fullscreenchange", (event) => {
    if (document.fullscreenElement) {
      isFullscreen.value = true;
    } else {
      isFullscreen.value = false;
    }
  });

  window.addEventListener("keyup", (event: any) => {
    const code = event.code;
    switch (code) {
      case "KeyF":
        onFullScreen();
        break;
      case "KeyM":
        onChangeMuteState();
        break;
      case "Space":
        onPlayVideo();
        break;
      case "KeyC":
        onChangeCaption();
        break;
      case "ArrowLeft":
        onRewind();
        break;
      case "ArrowRight":
        onForward();
        break;
      case "ArrowUp":
        onVolumeUp();
        break;
      case "ArrowDown":
        onVolumeDown();
        break;
      default:
        break;
    }
  });
});

const onPlayVideo = () => {
  if (videoRef.value?.paused) {
    videoRef.value?.play();
    iconDisplay.value = iconMediaPlay;
  } else {
    videoRef.value?.pause();
    iconDisplay.value = iconMediaPause;
  }
};

const onChangeMuteState = () => {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted;
  }
};

const onUpdateProgress = (value: number) => {
  if (videoRef.value) {
    videoRef.value.currentTime = value;
  }
};

const onChangeVolume = (value: any) => {
  videoPlayState.percentVolume = value;
  setVolume(value);
  if (videoRef.value) {
    videoRef.value.volume = Number(value);
  }
};

const onFullScreen = () => {
  const videoContainer = document.getElementById("video-component");
  screen.width = window.screen.width;
  screen.height = window.screen.height;
  if (!isFullscreen.value) {
    if (videoContainer?.requestFullscreen) {
      videoContainer.requestFullscreen();
    } else {
      videoContainer?.requestFullscreen();
    }
    isFullscreen.value = true;
  } else {
    document.exitFullscreen();
    isFullscreen.value = false;
  }
};

const onChangeCaption = () => {
  setCaption(!videoPlayState.isCaption);
  videoPlayState.isCaption = !videoPlayState.isCaption;
  iconDisplay.value = videoPlayState.isCaption
    ? iconSubtitle
    : iconSubtitleDisable;
  forceRerender();
};

const onPictureInPicture = () => {
  if (videoRef.value) {
    videoRef.value.requestPictureInPicture();
  }
};

const onChangeMenuSetting = () => {
  if (!isShowMenuSetting.value) {
    menu.value = listConfigMenu[0];
  }
  isShowMenuSetting.value = !isShowMenuSetting.value;
};

const onBlurMenuSetting = () => {
  if (!isFocusMenu.value) {
    isShowMenuSetting.value = false;
    menu.value = listConfigMenu[0];
  }
};

const onChangePlayBackRate = (item: number) => {
  if (videoRef.value) {
    videoRef.value.playbackRate = item;
    videoPlayState.playbackRate = item;
  }
};

const onChangeSubtitles = (item: number) => {
  videoPlayState.trackIndexActive = item;
};

const onOpenSubMenu = (key: MenuType) => {
  const result = listConfigMenu.find((item) => item.type === key);
  if (result) menu.value = result;
};

const onBackToMenu = (key: MenuType) => {
  const result = listConfigMenu.find((item) => item.type === key);
  if (result) menu.value = result;
};

const onRepeat = (state: boolean) => {
  if (videoRef.value) {
    videoRef.value.loop = state;
  }
};

const onRewind = () => {
  if (videoRef.value) {
    videoRef.value.currentTime -= 5;
    iconDisplay.value = iconBackward;
    forceRerender();
  }
};

const onForward = () => {
  if (videoRef.value) {
    videoRef.value.currentTime += 5;
    iconDisplay.value = iconForward;
    forceRerender();
  }
};

const onVolumeUp = () => {
  if (videoRef.value) {
    videoRef.value.volume =
      +videoRef.value.volume + 0.1 > 1 ? 1 : videoRef.value.volume + 0.1;
  }
};

const onVolumeDown = () => {
  if (videoRef.value) {
    videoRef.value.volume =
      +videoRef.value.volume - 0.1 < 0 ? 0 : videoRef.value.volume - 0.1;
  }
};

const forceRerender = async () => {
  renderComponent.value = true;
  setTimeout(() => {
    renderComponent.value = false;
  }, 300);
};

let timeOut = -1;
const onMouseMoveVideoLayout = () => {
  isShowControl.value = true;
  clearInterval(timeOut);
  timeOut = setTimeout(() => {
    isShowControl.value = false;
  }, 3000);
};

const onMouseLeaveVideoLayout = () => {
  isShowControl.value = false;
};

const onEnded = () => {
  emits("onEnded");
};
</script>

<style lang="scss"></style>
