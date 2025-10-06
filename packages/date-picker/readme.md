# 📅 @reacto-kit/date-picker

Date Picker component for React applications.  
Part of the **Reacto Kit** — a modular, composable UI component library built with **React + Tailwind + TypeScript**.

---

## 🚀 Installation

```bash
npm install @reacto-kit/date-picker
# or
yarn add @reacto-kit/date-picker
# or
pnpm add @reacto-kit/date-picker
```

---

The **Date Picker** package currently includes:

| Component              | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| 🗓️ **Calendar**        | Core calendar UI with month navigation and date selection.   |
| 📅 **DatePicker**      | Single-date selection with an interactive dropdown calendar. |
| 🔁 **RangeDatePicker** | Dual input calendar for selecting date ranges.               |

✅ Supports keyboard navigation
✅ Restricts previous or next dates dynamically
✅ Lightweight and styled using **Tailwind v4 utilities**

---

## 🧱 Example Usage

```tsx
import { DatePicker, RangeDatePicker } from '@reacto-kit/date-picker';
import { useState } from 'react';

export const Example = () => {
  const [date, setDate] = useState('');
  const [range, setRange] = useState(['', '']);

  return (
    <div className="p-6 flex flex-col gap-4">
      <DatePicker
        name="single"
        label="Select a date"
        placeholder="Pick a day"
        value={date}
        setStateValue={setDate}
      />

      <RangeDatePicker
        name="range"
        label="Select a period"
        placeholders={['Start', 'End']}
        values={range}
        setStateValues={[setRange[0], setRange[1]]}
      />
    </div>
  );
};
```

---

## 🧩 Props

| Prop       | Type                   | Description                               |
| ---------- | ---------------------- | ----------------------------------------- |
| `label`    | `string`               | Label displayed above the input.          |
| `value`    | `Date`                 | Controlled value for the selected date.   |
| `onChange` | `(date: Date) => void` | Callback triggered when the date changes. |
| `disabled` | `boolean`              | Disables the input.                       |
| `minDate`  | `Date`                 | Sets the earliest selectable date.        |
| `maxDate`  | `Date`                 | Sets the latest selectable date.          |

---

## 🧠 Features

- Built with **React + TypeScript**
- **Fully typed** props for great DX
- **Tailwind-ready** styling
- Keyboard and screen reader accessible
- Modular — works standalone or as part of the Reacto Kit

---

## 🧪 Local Development

Clone the Reacto Kit monorepo and run:

```bash
pnpm install
pnpm dev
```

Then open Storybook to preview the component:

```bash
pnpm storybook
```

Or directly inside the package:

```bash
cd packages/date-picker
pnpm dev
```

---

## 🏗️ Build

```bash
cd packages/date-picker
pnpm build
```

This will output the compiled files in `/dist`.
