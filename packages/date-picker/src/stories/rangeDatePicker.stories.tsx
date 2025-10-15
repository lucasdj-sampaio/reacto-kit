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
    period: 'all',
    language: 'jp',
    warning: '',
  },
  render: args => {
    const [start, setStart] = useState<string | null>(null);
    const [end, setEnd] = useState<string | null>(null);

    return (
      <div className="w-lg">
        <RangeDatePicker
          {...args}
          values={[start, end]}
          onChange={next => {
            setStart(next[0]);
            setEnd(next[1]);
          }}
        />
      </div>
    );
  },
};
