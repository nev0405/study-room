# StudyRoom — Pitagora Durrës

A React + Vite web app for reserving study room seats at Universiteti "Aleksandër Moisiu", Durrës.

---

## 🛠 How to Run This Project

Follow these steps from scratch, even if you have never used React or Node.js before.

---

### Step 1 — Install Node.js

Node.js is required to run React projects. It also installs **npm** (the package manager) automatically.

1. Go to **https://nodejs.org**
2. Download the **LTS** version (the one that says "Recommended For Most Users")
3. Run the installer — keep all default options checked
4. When asked about "Add to PATH", make sure it is **checked**
5. Finish the installation and **restart your computer** (or at least restart VS Code / your terminal)

To verify it installed correctly, open a terminal and run:
```
node --version
npm --version
```
Both should print version numbers (e.g. `v22.x.x` and `10.x.x`). If they do, you are ready.

---

### Step 2 — Fix PowerShell (Windows only — do this once)

If you are on Windows and get an error like *"running scripts is disabled on this system"*, run this once in your terminal:
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
```
You only need to do this one time.

---

### Step 3 — Open the project folder

Open a terminal (in VS Code: press **Ctrl + `**) and navigate to the `my-app` folder:
```
cd path\to\StudyRoom\my-app
```
For example:
```
cd C:\Users\YourName\Desktop\StudyRoom\my-app
```

> ⚠️ Make sure you are **inside** the `my-app` folder, not the `StudyRoom` folder. You can confirm by running `dir` — you should see a `package.json` file listed.

---

### Step 4 — Install dependencies

The first time you open the project (or after cloning it), you need to install the packages it depends on. Run:
```
npm install
```
This downloads everything listed in `package.json` into a `node_modules` folder. This only needs to be done **once** (or again if you delete `node_modules`).

---

### Step 5 — Start the development server

```
npm run dev
```

You will see output like:
```
  VITE v6.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
```

Open your browser and go to **http://localhost:5173** — the website is now running live.

> Any changes you save in the code will automatically update in the browser instantly.

---

### Step 6 — Stop the server

To stop the dev server, go back to the terminal and press:
```
Ctrl + C
```

---

## 📁 Project Structure

```
my-app/
├── public/
│   └── images/          ← Put your image files here (e.g. swivel-chair.png)
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx / Sidebar.css
│   │   ├── SeatsGrid.jsx / SeatsGrid.css
│   │   ├── BookingPanel.jsx / BookingPanel.css
│   │   ├── Calendar.jsx / Calendar.css
│   │   └── Modal.jsx / Modal.css
│   ├── App.jsx          ← Main page, manages all state
│   ├── App.css          ← Layout styles
│   ├── index.css        ← Global styles
│   └── main.jsx         ← Entry point
└── index.html
```

---

## 🖼 Adding the Chair Image

1. Copy your `swivel-chair.png` file into `public/images/`
2. The app will automatically use it — no code changes needed

---

## 📦 Useful npm Commands

| Command | What it does |
|---|---|
| `npm install` | Installs all project dependencies |
| `npm run dev` | Starts the local development server |
| `npm run build` | Builds the app for production (creates a `dist/` folder) |
| `npm run preview` | Previews the production build locally |

---

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
