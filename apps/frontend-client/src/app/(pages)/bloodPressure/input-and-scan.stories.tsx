// src/components/CameraComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { userEvent, within } from "@storybook/testing-library";
import CameraComponent from "./input-and-scan";

// Storybook metadata
const meta: Meta<typeof CameraComponent> = {
  component: CameraComponent,
  title: "pages/input-and-scan",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CameraComponent>;

// Default story for CameraComponent
export const Default: Story = {};

// Add Play function for interactions
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  // Click the toggle button to switch to camera scan mode
  await userEvent.click(canvas.getByText("ពិនិត្យសម្ពាធឈាម"));
  // Focus on the first input field and type "120"
  await userEvent.type(canvas.getByLabelText("សម្ពាធខ្ពស់"), "120");

  // Focus on the second input field and type "80"
  await userEvent.type(canvas.getByLabelText("សម្ពាធទាប"), "80");

  // Focus on the textarea field and type a note
  await userEvent.type(canvas.getByLabelText("កំណត់ចំណាំ"), "Testing note");
};
