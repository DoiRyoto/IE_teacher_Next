import type { Meta, StoryObj } from '@storybook/react';
import SearchBarTop from './SearchBarTop';

const meta = {
  title: 'SearchBarTop',
  component: SearchBarTop,
} satisfies Meta<typeof SearchBarTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};