export type MenuType =
  | "index"
  | "speed"
  | "subtitles"
  | "subtitles_options"
  | "font_family"
  | "font_color"
  | "font_size"
  | "background_color"
  | "background_opacity";

export interface MenuConfigType {
  with: string;
  height: string;
  left: string;
  bottom: string;
}
export interface MenuItem {
  type: MenuType;
  config: MenuConfigType;
}

export interface TrackItem {
  label: string;
  kind: string;
  srclang: string;
  src: string;
}

export interface VideoPlayState {
  videoIsPlay: boolean;
  muted: boolean;
  currentTime: number;
  currentTimeDisplay: string;
  duration: number;
  durationDisplay: string;
  currentPercentTime: number;
  currentTimeHover: number;
  currentPercentTimeHover: number;
  percentVolume: number;
  isCaption: boolean;
  trackIndexActive: number;
  playbackRate: number;
  isDisplayName: boolean;
  bufferedPercent: number;
}

export interface SubtitleOptions {
  fontFamily: string;
  fontColor: string;
  fontSize: number;
  backgroundColor: number[];
  backgroundOpacity: number;
}

export interface VideoState extends SubtitleOptions {
  muted: boolean;
  caption: boolean;
  volume: number;
  speed: number;
  isDisplayName: boolean;
}
