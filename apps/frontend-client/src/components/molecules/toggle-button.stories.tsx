import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import ToggleButton from "./toggle-button";

export default {
  title: "molecules/ToggleButton",
  component: ToggleButton,
  argTypes: {
    button1Label: { control: "text" },
    button2Label: { control: "text" },
    activeBgColor: { control: "color" },
    inactiveBgColor: { control: "color" },
    activeTextColor: { control: "color" },
    inactiveTextColor: { control: "color" },
  },
} as Meta<typeof ToggleButton>;

const Template: StoryFn<typeof ToggleButton> = (args) => (
  <ToggleButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  button1Label: "Button 1",
  button2Label: "Button 2",
  content1: <div>Content 1</div>,
  content2: <div>Content 2</div>,
  activeBgColor: "bg-blue-500",
  inactiveBgColor: "bg-white",
  activeTextColor: "text-white",
  inactiveTextColor: "text-black",
};
