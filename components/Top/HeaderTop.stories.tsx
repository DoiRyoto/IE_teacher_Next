import type { Meta, StoryObj } from '@storybook/react';
import HeaderTop from './HeaderTop';

const meta = {
  title: 'HeaderTop',
  component: HeaderTop,
} satisfies Meta<typeof HeaderTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};