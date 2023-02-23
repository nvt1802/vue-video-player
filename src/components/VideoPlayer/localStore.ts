import type { VideoState } from "./types";

const key = "video-state";

const defaultVideoObject: VideoState = {
  muted: false,
  caption: true,
  volume: 1,
  speed: 1,
  fontFamily: "system-ui",
  fontColor: "#FFFFFF",
  fontSize: 16,
  backgroundColor: [8, 8, 8],
  backgroundOpacity: 0.5,
  isDisplayName: false,
};

export const getData = (): VideoState =>
  localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || "")
    : defaultVideoObject;

export const setMuted = (status: boolean) => {
  const currentObject = { ...getData() };
  currentObject.muted = status;
  localStorage.setItem(key, JSON.stringify(currentObject));
};

export const setCaption = (status: boolean) => {
  const currentObject = { ...getData() };
  currentObject.caption = status;
  localStorage.setItem(key, JSON.stringify(currentObject));
};

export const setVolume = (status: number) => {
  const currentObject = { ...getData() };
  currentObject.volume = status;
  localStorage.setItem(key, JSON.stringify(currentObject));
};

export const setFontFamily = (fontFamily: string) => {
  const currentObject = { ...getData() };
  currentObject.fontFamily = fontFamily;
  localStorage.setItem(key, JSON.stringify(currentObject));
};

export const setFontColor = (fontColor: string) => {
  const currentObject = { ...getData() };
  currentObject.fontColor = fontColor;
  localStorage.setItem(key, JSON.stringify(currentObject));
};

export const setFontSize = (fontSize: number) => {
  const currentObject = { ...getData() };
  currentObject.fontSize = fontSize;
  localStorage.setItem(key, JSON.stringify(currentObject));
};

export const setBackgroundColor = (backgroundColor: number[]) => {
  const currentObject = { ...getData() };
  currentObject.backgroundColor = backgroundColor;
  localStorage.setItem(key, JSON.stringify(currentObject));
};

export const setBackgroundOpacity = (backgroundOpacity: number) => {
  const currentObject = { ...getData() };
  currentObject.backgroundOpacity = backgroundOpacity;
  localStorage.setItem(key, JSON.stringify(currentObject));
};

export const setSpeed = (speed: number) => {
  const currentObject = { ...getData() };
  currentObject.speed = speed;
  localStorage.setItem(key, JSON.stringify(currentObject));
};

export const setDisplayName = (state: boolean) => {
  const currentObject = { ...getData() };
  currentObject.isDisplayName = state;
  localStorage.setItem(key, JSON.stringify(currentObject));
};