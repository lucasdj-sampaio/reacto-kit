import type { Meta, StoryObj } from '@storybook/react';
import { RangeDatePicker } from '..';

const meta: Meta<typeof RangeDatePicker> = {
  title: 'Components/RangeDatePicker',
  component: RangeDatePicker,
};

export default meta;
type Story = StoryObj<typeof RangeDatePicker>;

export const Default: Story = {
  args: {
    name: 'datePicker',
    label: 'Select Date',
    placeholders: ['Select Initial Date', 'Select Final Date'],
    ableNextDates: true,
  },
};
