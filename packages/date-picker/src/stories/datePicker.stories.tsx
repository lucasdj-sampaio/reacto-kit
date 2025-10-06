import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '..';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    name: 'datePicker',
    label: 'Select Date',
    placeholder: 'Select Date',
    ableNextDates: true,
  },
};
