import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Logo, { LogoProps } from "./logo";

export default {
  title: "atoms/logo",
  component: Logo,
} as Meta<typeof Logo>;

const Template: StoryFn<typeof Logo> = (args: LogoProps) => <Logo {...args} />;

export const Default = Template.bind({});
Default.args = {
  src: "/CheckMe.svg",
  alt: "Logo",
  text: "CheckMe",
};
