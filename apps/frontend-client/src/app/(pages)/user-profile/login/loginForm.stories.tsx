"use client";

import { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { action } from "@storybook/addon-actions";
import LoginForm from "./page";

const meta: Meta<typeof LoginForm> = {
  title: "signupLogin/LoginForm",
  component: LoginForm,
  argTypes: {
    className: {
      control: "text",
      description: "CSS class applied to the root element",
    },
    loginEmail: {
      control: "text",
      description: "Initial value for the login email",
    },
    showPassword: {
      control: "boolean",
      description: "Toggles password visibility",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {
    className: "",
    loginEmail: "user@example.com",
    showPassword: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      canvas.getByRole("textbox", { name: /អុីម៉ែល/i }),
      "user@example.com",
    );
    await new Promise((r) => setTimeout(r, 1200));

    await userEvent.type(canvas.getByLabelText("ពាក្យសម្ងាត់"), "password123");
    await new Promise((r) => setTimeout(r, 1200));

    await userEvent.click(canvas.getByRole("button", { name: /បញ្ជូលគណនី/i }));
    await new Promise((r) => setTimeout(r, 1200));

    action("Form data")({
      email: "user@example.com",
      password: "password123",
    });

    console.log("Form data submitted:", {
      email: "user@example.com",
      password: "password123",
    });
  },
};