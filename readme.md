# ⚛️ Reacto Kit

Welcome to **Reacto Kit** — a modular monorepo built to host reusable, elegant, and accessible React components powered by:  
⚛️ **React 19**, 💅 **TailwindCSS v4**, and 📖 **Storybook 9**.

---

## 🚀 Purpose

This repository is focused on creating **UI components** that are:

- ♻️ Reusable across projects
- 🎨 Styled consistently with Tailwind
- 🧱 Built for modular publishing on npm
- 🧠 Fully documented with Storybook

Each component lives inside the `/packages` folder, making it easy to develop, test, and publish them individually.

---

## 📦 Current Packages

| Component                                | Description                                                       | npm Package   |
| ---------------------------------------- | ----------------------------------------------------------------- | ------------- |
| 📆 [Date Picker](./packages/date-picker) | Select single dates or ranges with a clean and flexible calendar. | _coming soon_ |

---

## 🧩 Stack Overview

| Tool                  | Purpose                                   |
| --------------------- | ----------------------------------------- |
| ⚛️ **React 19**       | Component logic and hooks                 |
| 💅 **TailwindCSS v4** | Styling and responsive design             |
| 📖 **Storybook 9**    | Component visualization and documentation |
| 🧰 **TypeScript 5.9** | Type safety and developer experience      |
| ⚙️ **Tsup**           | Fast bundling for npm packages            |
| 🧪 **Vitest**         | Unit testing and Storybook integration    |

---

## 📁 Project Structure

```

reacto-kit/
├── packages/
│   └── date-picker/
│       ├── src/
│       │   ├── components/
│       │   │   ├── calendar.tsx
│       │   │   ├── datePicker.tsx
│       │   │   └── rangeDatePicker.tsx
│       │   ├── stories/
│       │   ├── util/
│       │   ├── shared/interfaces/
│       │   └── index.tsx
│       ├── package.json
│       ├── tsconfig.json
│       └── README.md
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── package.json
├── tsconfig.json
└── README.md

```

---

## 🧭 Local Development

To start working locally, clone the repository and install dependencies:

```bash
# 1️⃣ Clone the repo
git clone https://github.com/your-username/reacto-kit.git

# 2️⃣ Navigate to the project
cd reacto-kit

# 3️⃣ Install dependencies
pnpm install

# 4️⃣ Run Storybook
pnpm run dev
```

Storybook will start at 👉 [http://localhost:6006](http://localhost:6006)

---

## 📦 Publishing to npm

Each component package can be published individually:

```bash
# Inside a specific package
cd packages/date-picker
npm publish --access public
```

---

## 📖 Storybook Integration

All components are documented and showcased in **Storybook 9**.
Add stories inside each component folder:

```
📁 DatePicker/
 ├── DatePicker.tsx
 ├── DatePicker.stories.tsx
 └── index.ts
```

Then run:

```bash
pnpm run dev
```

---

## 🤝 Contributing

Contributions are welcome!
Please feel free to open a **pull request** or suggest features in the **issues** tab.

---

## 🧑‍💻 Author

Made with 💙 by [Lucas Sampaio](https://github.com/lucasdj-sampaio)

---

## ⭐ Support

If you like this project, please consider **starring** ⭐ the repository — it helps a lot!
Let’s build better UIs together 🚀
