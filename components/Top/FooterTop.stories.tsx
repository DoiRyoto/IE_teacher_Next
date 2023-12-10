import type { Meta, StoryObj } from '@storybook/react';
import FooterTop from './FooterTop';

const meta = {
  title: 'FooterTop',
  component: FooterTop,
} satisfies Meta<typeof FooterTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {}