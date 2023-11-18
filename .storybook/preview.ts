import type { Preview } from "@storybook/react";
import { withScreenshot } from "storycap";

import '../app/ui/globals.css';

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
};

export default preview;
