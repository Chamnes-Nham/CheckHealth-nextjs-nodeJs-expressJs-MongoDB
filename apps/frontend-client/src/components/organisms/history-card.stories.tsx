import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import BloodPressureCard from "./history-card";

export default {
  title: "organisms/blood-pressure-history",
  component: BloodPressureCard,
  argTypes: {
    systolic: { control: "number" },
    diastolic: { control: "number" },
    label: { control: "text" },
    description: { control: "text" },
    date: { control: "text" },
    time: { control: "text" },
  },
} as Meta<typeof BloodPressureCard>;

const Template: StoryFn<typeof BloodPressureCard> = (args) => (
  <BloodPressureCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  systolic: 120,
  diastolic: 80,
  label: "Normal",
  description: "This is within the normal range",
  date: "2024-08-21",
  time: "08:00 AM",
};
