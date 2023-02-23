import type { MenuItem } from "./types";

export const speedOptions = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
export const subtitlesOptions = [
  {
    type: "font_family",
    label: "font chữ",
  },
  {
    type: "font_color",
    label: "màu chữ",
  },
  {
    type: "font_size",
    label: "kích thước",
  },
  {
    type: "background_color",
    label: "màu nền",
  },
  {
    type: "background_opacity",
    label: "Độ mờ màu nền",
  },
];
export const fontFamilyOptions = [
  "ui-sans-serif",
  "Georgia",
  "Cambria",
  "Times New Roman",
  "Consolas",
  "Courier New",
  "Segoe UI",
  "Roboto",
  "Arial",
  "Segoe UI Emoji",
  "system-ui",
].sort();

export const colorOptions = [
  {
    hex: "#FFFFFF",
    label: "Trắng",
  },
  {
    hex: "#FFFF00",
    label: "Vàng",
  },
  {
    hex: "#00FF00",
    label: "Xanh lục",
  },
  {
    hex: "#00FFFF",
    label: "Xanh lơ",
  },
  {
    hex: "#0000FF",
    label: "Màu lam",
  },
  {
    hex: "#FF00FF",
    label: "Đỏ tía",
  },
  {
    hex: "#FF0000",
    label: "Đỏ",
  },
  {
    hex: "#080808",
    label: "Đen",
  },
];

export const backgroundColorOptions = [
  {
    rgba: [255, 255, 255],
    label: "Trắng",
  },
  {
    rgba: [255, 255, 0],
    label: "Vàng",
  },
  {
    rgba: [0, 255, 0],
    label: "Xanh lục",
  },
  {
    rgba: [0, 255, 255],
    label: "Xanh lơ",
  },
  {
    rgba: [0, 0, 255],
    label: "Màu lam",
  },
  {
    rgba: [255, 0, 255],
    label: "Đỏ tía",
  },
  {
    rgba: [255, 0, 0],
    label: "Đỏ",
  },
  {
    rgba: [8, 8, 8],
    label: "Đen",
  },
];

export const fontSizeOptions = [8, 10, 12, 14, 16, 18, 20, 22, 24];

export const backgroundOpacityOptions = [
  {
    label: "0%",
    value: 0,
  },
  {
    label: "25%",
    value: 0.25,
  },
  {
    label: "50%",
    value: 0.5,
  },
  {
    label: "75%",
    value: 0.75,
  },
  {
    label: "100%",
    value: 1,
  },
];

export const listConfigMenu: MenuItem[] = [
  {
    type: "index",
    config: {
      with: "254px",
      height: "204px",
      left: "-190px",
      bottom: "44px",
    },
  },
  {
    type: "speed",
    config: {
      with: "150px",
      height: "208px",
      left: "-85px",
      bottom: "44px",
    },
  },
  {
    type: "subtitles",
    config: {
      with: "200px",
      height: "208px",
      left: "-135px",
      bottom: "44px",
    },
  },
  {
    type: "subtitles_options",
    config: {
      with: "240px",
      height: "200px",
      left: "-176px",
      bottom: "44px",
    },
  },
  {
    type: "font_family",
    config: {
      with: "200px",
      height: "250px",
      left: "-135px",
      bottom: "44px",
    },
  },
  {
    type: "font_color",
    config: {
      with: "200px",
      height: "208px",
      left: "-135px",
      bottom: "44px",
    },
  },
  {
    type: "font_size",
    config: {
      with: "200px",
      height: "208px",
      left: "-135px",
      bottom: "44px",
    },
  },
  {
    type: "background_color",
    config: {
      with: "200px",
      height: "208px",
      left: "-135px",
      bottom: "44px",
    },
  },
  {
    type: "background_opacity",
    config: {
      with: "200px",
      height: "208px",
      left: "-135px",
      bottom: "44px",
    },
  },
];

export const VideoSnapper = {
  captureAsCanvas: (
    video: HTMLVideoElement,
    time: number,
    canvas: any,
    width?: number,
    height?: number
  ) => {
    const callback = () => {
      canvas.width = width || 160;
      canvas.height = height || 100;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, width || 160, height || 100);
        if (prevPos) {
          video.currentTime = prevPos;
          video?.removeEventListener("seeked", callback);
        }
      }
    };

    if (time > 0) {
      var prevPos = video.currentTime;
      video.currentTime = time;
      video?.addEventListener("seeked", callback);
      return;
    }
    return callback.apply(video);
  },
};
