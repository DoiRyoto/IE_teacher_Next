import type { Preview } from "@storybook/react";
import { withScreenshot } from "storycap";
import { ThemeProvider } from "../components/theme-provider";
import React from "react";

import '../app/globals.css';

export const decorators = [withScreenshot];
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      
    },
  },
  decorators: [
    (Story) => {
      return (
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
