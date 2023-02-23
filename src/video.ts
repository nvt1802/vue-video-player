import CaPheVideo from "@/../video/CaPhe/CaPhe.mp4";
import HongChieuNguyenVideo from "@/../video/HongChieuNguyen/HongChieuNguyen.mp4";
import lacNhanVideo from "@/../video/lacNhan/lacNhan.mp4";
import SaranghaeVideo from "@/../video/Saranghae/Saranghae.mp4";
import ThuyenQuyenVideo from "@/../video/ThuyenQuyen/ThuyenQuyen.mp4";
import TramHuongVideo from "@/../video/TramHuong/TramHuong.mp4";
import YSuNganNamVideo from "@/../video/YSuNganNam/YSuNganNam.mp4";
import TestVideo from "@/../video/test.mp4";

export interface TrackItem {
  label: string;
  kind: string;
  srclang: string;
  src: string;
}

export interface VideoItem {
  key: number | string;
  name: string;
  video: string;
  tracks: TrackItem[];
  isVertical?: boolean;
}

export const listVideo: VideoItem[] = [
  {
    key: 0,
    name: "Lạc Nhạn",
    video: lacNhanVideo,
    tracks: [
      {
        label: "Tiếng Việt",
        kind: "subtitles",
        srclang: "vn",
        src: "LacNhan/[VN]LacNhan.vtt",
      },
      {
        label: "Tiếng Trung",
        kind: "subtitles",
        srclang: "cn",
        src: "LacNhan/[CN]LacNhan.vtt",
      },
    ],
  },
  {
    key: 1,
    name: "Saranghae",
    video: SaranghaeVideo,
    tracks: [
      {
        label: "Tiếng Việt",
        kind: "subtitles",
        srclang: "vn",
        src: "Saranghae/[VN]Saranghae.vtt",
      },
      {
        label: "Tiếng Trung",
        kind: "subtitles",
        srclang: "cn",
        src: "Saranghae/[CN]Saranghae.vtt",
      },
    ],
  },
  {
    key: 2,
    name: "Thuyền Quyên",
    video: ThuyenQuyenVideo,
    tracks: [
      {
        label: "Tiếng Việt",
        kind: "subtitles",
        srclang: "vn",
        src: "ThuyenQuyen/[VN]ThuyenQuyen.vtt",
      },
    ],
  },
  {
    key: 3,
    name: "Cà Phê",
    video: CaPheVideo,
    tracks: [
      {
        label: "Tiếng Việt",
        kind: "subtitles",
        srclang: "vn",
        src: "CaPhe/[VN]CaPhe.vtt",
      },
      {
        label: "Tiếng Anh",
        kind: "subtitles",
        srclang: "en",
        src: "CaPhe/[EN]CaPhe.vtt",
      },
      {
        label: "Tiếng Trung",
        kind: "subtitles",
        srclang: "cn",
        src: "CaPhe/[CN]CaPhe.vtt",
      },
      {
        label: "Tiếng Nhật",
        kind: "subtitles",
        srclang: "jp",
        src: "CaPhe/[JP]CaPhe.vtt",
      },
    ],
  },
  {
    key: 4,
    name: "Trầm Hương",
    video: TramHuongVideo,
    tracks: [
      {
        label: "Tiếng Việt",
        kind: "subtitles",
        srclang: "vn",
        src: "TramHuong/[Vietnamese]TramHuong.vtt",
      },
      {
        label: "Tiếng Anh",
        kind: "subtitles",
        srclang: "en",
        src: "TramHuong/[English]TramHuong.vtt",
      },
    ],
  },
  {
    key: 5,
    name: "Ý Sứ Thiên Niên",
    video: YSuNganNamVideo,
    tracks: [
      {
        label: "Tiếng Việt",
        kind: "subtitles",
        srclang: "vn",
        src: "YSuNganNam/[Vietnamese]YSuNganNam.vtt",
      },
      {
        label: "Tiếng Trung",
        kind: "subtitles",
        srclang: "cn",
        src: "YSuNganNam/[Chinese]YSuNganNam.vtt",
      },
      {
        label: "Tiếng Trung (Giản Thể)",
        kind: "subtitles",
        srclang: "cn",
        src: "YSuNganNam/[ChineseSimplified]YSuNganNam.vtt",
      },
      {
        label: "Tiếng Trung (Phồn Thể)",
        kind: "subtitles",
        srclang: "cn",
        src: "YSuNganNam/[ChineseTraditional]YSuNganNam.vtt",
      },
    ],
  },
  {
    key: 6,
    name: "Hồng Chiêu Nguyện",
    video: HongChieuNguyenVideo,
    tracks: [
      {
        label: "Tiếng Việt",
        kind: "subtitles",
        srclang: "vn",
        src: "HongChieuNguyen/[Vietnamese]HongChieuNguyen.vtt",
      },
      {
        label: "Tiếng Trung",
        kind: "subtitles",
        srclang: "cn",
        src: "HongChieuNguyen/[Chinese]HongChieuNguyen.vtt",
      },
      {
        label: "Tiếng Trung (Giản Thể)",
        kind: "subtitles",
        srclang: "cn",
        src: "HongChieuNguyen/[ChineseSimplified]HongChieuNguyen.vtt",
      },
      {
        label: "Tiếng Trung (Phồn Thể)",
        kind: "subtitles",
        srclang: "cn",
        src: "HongChieuNguyen/[ChineseTraditional]HongChieuNguyen.vtt",
      },
    ],
  },
  {
    key: 7,
    name: "Test",
    video: TestVideo,
    tracks: [],
    isVertical: true,
  },
];
