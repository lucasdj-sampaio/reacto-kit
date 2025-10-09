# 📅 **@reacto-kit/date-picker**

Date Picker components for React applications.
Part of the **Reacto Kit** — built with **React + Tailwind + TypeScript**.

---

## 🚀 **Installation**

```bash
npm install @reacto-kit/date-picker
# or
yarn add @reacto-kit/date-picker
# or
pnpm add @reacto-kit/date-picker
```

---

## 📦 **Included Components**

| Component              | Description                                                  |
| ---------------------- | ------------------------------------------------------------ |
| 🗓️ **Calendar**       | Core calendar UI (month navigation, hover and range support) |
| 📅 **DatePicker**      | Single-date selection with an inline/dropdown calendar       |
| 🔁 **RangeDatePicker** | Two-input picker for selecting date ranges                   |

### ✨ **Key Features**

* Works with multiple locales via the `language` prop
* Range hover/select behavior (start → hover → end)
* Lightweight, Tailwind-friendly styling
* Fully typed with TypeScript

---

## 🧱 **Quick Example**

```tsx
import { DatePicker, RangeDatePicker } from '@reacto-kit/date-picker';
import { useState } from 'react';

export const Example = () => {
  const [date, setDate] = useState<string | null>(null);
  const [range, setRange] = useState<[string | null, string | null]>([null, null]);

  return (
    <div className="p-6 flex flex-col gap-4">
      <DatePicker
        name="single"
        label="Select a date"
        placeholder="Pick a day"
        value={date}
        onChange={v => setDate(v)}
        language="en"
        period="all"
      />

      <RangeDatePicker
        name="range"
        label="Select a period"
        placeholders={['Start', 'End']}
        values={range}
        onChange={next => setRange(next)}
        language="en"
        period="all"
      />
    </div>
  );
};
```

---

## ⚙️ **Props**

### 🗓️ **DatePicker**

| Prop          | Type                                                   | Description                                                                        |
| ------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `name`        | `string`                                               | Input name/identifier                                                              |
| `label`       | `string`                                               | Label text above the input                                                         |
| `placeholder` | `string`                                               | Input placeholder                                                                  |
| `value`       | `string \| null`                                       | Controlled value. String format is per `language` (or ISO). Use `null` when empty. |
| `onChange`    | `(v: string \| null) => void`                          | Callback when value changes. Receives the formatted string or `null`.              |
| `language`    | `'en' \| 'pt' \| 'es' \| 'fr' \| 'jp' \| 'de' \| 'ru'` | Locale used for UI formatting (defaults to `en`).                                  |
| `period`      | `'all' \| 'past' \| 'future' \| 'fromToday'`           | Restrict selectable dates (defaults to `all`).                                     |
| `warning`     | `string`                                               | Optional warning message shown below the input.                                    |

---

### 🗓️ **RangeDatePicker**

| Prop           | Type                                               | Description                                                                         |
| -------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `name`         | `string`                                           | Component identifier                                                                |
| `label`        | `string`                                           | Label above the inputs                                                              |
| `placeholders` | `[string, string]`                                 | Placeholders for start and end inputs                                               |
| `values`       | `[string \| null, string \| null]`                 | Controlled pair `[start, end]` where each item can be a formatted string or `null`. |
| `onChange`     | `(next: [string \| null, string \| null]) => void` | Called when either start or end is updated.                                         |
| `language`     | same as DatePicker                                 | Locale for formatting and parsing                                                   |
| `period`       | same as DatePicker                                 | Date range restriction                                                              |
| `warning`      | `string`                                           | Optional warning text                                                               |

---

## 🧠 **Implementation Notes (for Contributors)**

* Internally, the **Calendar** parses incoming strings using a locale-aware parser and also accepts ISO as fallback (`toDateSafe`).
* Hover and range selection logic use Date objects internally, only formatted strings are emitted via `onChange`.
* `values` and `value` use `null` for empty/unset values this is important for controlled components.

### ♿ **Accessibility**

* Inputs are `readOnly` and controlled.
* Consider adding ARIA roles/labels if you need deeper accessibility coverage.

### 🧪 **Testing**

* Includes unit tests for utilities and core behaviors (recommended to run with `vitest`).

---

## 💻 **Local Development**

Clone the repository and run (from monorepo root):

```bash
pnpm install
pnpm dev
```

Open **Storybook** to preview components:

```bash
pnpm storybook
```

Or directly inside the package:

```bash
cd packages/date-picker
pnpm dev
```

---

## 🏗️ **Build**

```bash
cd packages/date-picker
pnpm build
```

Build output goes to `/dist`.
