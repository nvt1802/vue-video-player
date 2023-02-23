import Component from "../components/VideoPlayer/index.vue";
import "./tailwind.scss";

export default {
  title: "Component/VideoPlayer",
  component: Component,
};

const Template = (args: any) => ({
  components: { Component },
  setup() {
    return { args };
  },
  template: '<Component v-bind="args" />',
});

export const VideoPlayer: any = Template.bind({});
VideoPlayer.args = {
  videoUrl: "https://video-koss.web.app/assets/ThuyenQuyen-b3664583.mp4",
  tracks: [
    {
      label: "Tiếng Việt",
      kind: "subtitles",
      srclang: "vn",
      src: "https://video-koss.web.app/ThuyenQuyen/[VN]ThuyenQuyen.vtt",
    },
  ],
  width: 720,
  height: 405,
  videoDisplayName: "Thuyền Quyên",
  autoPlay: false,
};
