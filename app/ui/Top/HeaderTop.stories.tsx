import type { Meta, StoryObj } from '@storybook/react';
import HeaderTop from './HeaderTop';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'HeaderTop',
  component: HeaderTop,
} satisfies Meta<typeof HeaderTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};