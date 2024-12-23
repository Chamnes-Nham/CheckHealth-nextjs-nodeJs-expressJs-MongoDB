// src/components/molecules/Header.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Header from "./header";

export default {
  title: "organisms/header",
  component: Header,
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = () => <Header />;

export const Default = Template.bind({});
