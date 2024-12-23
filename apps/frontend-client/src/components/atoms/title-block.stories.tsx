import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import TitleBlock from "./title-block";

export default {
  title: "atoms/title-block",
  component: TitleBlock,
  argTypes: {
    text: { control: 'text' },
    color: {control: 'color'},
  },
} as Meta;

const Template: StoryFn<{ text: string; color?: string }> = (args) => <TitleBlock {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "this is the tiltle-block",
  color: "#000000",
};
