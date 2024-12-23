// stories/HealthStatus.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import HealthStatus from '@/components/organisms/card-status';
import blood from "../../images/cards/blood.svg";
import bmi from "../../images/cards/bmi.svg";
import colorBlood from "../../images/cards/color-status-blood.svg";
import colorBMI from "../../images/cards/color-status-bmi.svg";

export default {
  title: 'organisms/card-status', // Updated title for clarity
  component: HealthStatus,
} as Meta;


interface HealthStatusProps {
    icon: string;
    label: string;
    value1: number;
    value2?: number;
    health: string;
    colorStatus: string;
 }

const Template: StoryFn<HealthStatusProps> = (args) => <HealthStatus {...args} />;

export const GoodHealth = Template.bind({});
GoodHealth.args = {
  icon: blood.src,
  label: 'សម្ពាធឈាម',
  value1: 120,
  value2: 80,
  health: 'សុខភាពល្អ',
  colorStatus: colorBlood.src,
};

export const ModerateHealth = Template.bind({});
ModerateHealth.args = {
  icon: blood.src,
  label: 'សម្ពាធឈាម',
  value1: 130,
  value2: 85,
  health: 'សុខភាពល្អធម្យម',
  colorStatus: colorBlood.src,
};

export const PoorHealth = Template.bind({});
PoorHealth.args = {
  icon: blood.src,
  label: 'សម្ពាធឈាម',
  value1: 140,
  value2: 90,
  health: 'សុខភាពមានបញ្ហា',
  colorStatus: colorBlood.src,
};
