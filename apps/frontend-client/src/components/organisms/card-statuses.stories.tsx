// stories/CardStatuses.stories.tsx

import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import CardStatuses from "@/components/organisms/card-statuses";
import blood from "../../images/cards/blood.svg";
import bmi from "../../images/cards/bmi.svg";
import colorBlood from "../../images/cards/color-status-blood.svg";
import colorBMI from "../../images/cards/color-status-bmi.svg";

export default {
  title: "organisms/card-statuese",
  component: CardStatuses,
  argTypes: {
    icon1: { control: "text", description: "Icon for the first card" },
    label1: { control: "text", description: "Label for the first card" },
    value11: {
      control: "number",
      description: "First value for the first card",
    },
    value21: {
      control: "number",
      description: "Second value for the first card",
    },
    health1: {
      control: "text",
      description: "Health status for the first card",
    },
    colorStatus1: {
      control: "text",
      description: "Color status image for the first card",
    },
    icon2: { control: "text", description: "Icon for the second card" },
    label2: { control: "text", description: "Label for the second card" },
    value12: {
      control: "number",
      description: "First value for the second card",
    },
    value22: {
      control: "number",
      description: "Second value for the second card",
    },
    health2: {
      control: "text",
      description: "Health status for the second card",
    },
    colorStatus2: {
      control: "text",
      description: "Color status image for the second card",
    },
  },
} as Meta;

const Template: StoryFn<{
  icon1: string;
  label1: string;
  value11: number;
  value21: number;
  health1: string;
  colorStatus1: string;
  icon2: string;
  label2: string;
  value12: number;
  value22: number;
  health2: string;
  colorStatus2: string;
}> = (args) => <CardStatuses />;

export const Default = Template.bind({});
Default.args = {
  icon1: blood.src,
  label1: "សម្ពាធឈាម",
  value11: 110,
  value21: 75,
  health1: "សុខភាពល្អ",
  colorStatus1: colorBlood.src,
  icon2: bmi.src,
  label2: "ទម្ងន់(BMI)",
  value12: 21.1,
  value22: undefined,
  health2: "សុខភាពមានបញ្ហា",
  colorStatus2: colorBMI.src,
};
