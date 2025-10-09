import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
    period: 'past',
    language: "en",
    warning: 'Warning message',
  },
  render: args => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    return (
      <RangeDatePicker
        {...args}
        values={[start, end]}
        setStateValues={[setStart, setEnd]}
      />
    );
  },
};
