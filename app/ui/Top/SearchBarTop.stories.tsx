import type { Meta, StoryObj } from '@storybook/react';
import SearchBarTop from './SearchBarTop';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'SearchBarTop',
  component: SearchBarTop,
} satisfies Meta<typeof SearchBarTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};