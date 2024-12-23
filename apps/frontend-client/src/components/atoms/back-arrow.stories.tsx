// src/components/BackArrow.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import BackArrow from "./back-arrow";

// Metadata for Storybook
const meta: Meta<typeof BackArrow> = {
  component: BackArrow,
  title: "atoms/BackArrow", // Organize your component in the Storybook sidebar
  tags: ["autodocs"], // Enables autodocs for this component
};

export default meta;

// Type alias for Storybook stories
type Story = StoryObj<typeof BackArrow>;

// Default story for the BackArrow component
export const Default: Story = {
  args: {
    text: "Go Back", // Default argument for the 'text' prop
  },
};
