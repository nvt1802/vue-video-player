import Component from "../components/Editor/index.vue";
import "./tailwind.scss"

export default {
  title: "Component/Editor",
  component: Component,
};

const Template = (args: any) => ({
  components: { Component },
  setup() {
    return { args };
  },
  template: '<Component v-bind="args" />',
});

export const Editor: any = Template.bind({});
Editor.args = {};
