import type { Preview } from "@storybook/react";
import "../src/app/globals.css";


const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/profile",
        query: {
          user: "santa",
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      // theme: MyTheme,
    },
  },
};

export default preview;
