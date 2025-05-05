
# 🌐 Agency Access Nexus

**Agency Access Nexus** is a full-stack web application built with a modern frontend and a Supabase-powered backend. It streamlines access management and user interactions through a sleek interface and real-time backend connectivity.

---

## 🚀 Features

- Responsive and minimal HTML/CSS UI
- Backend powered by Supabase (PostgreSQL + Auth + Storage)
- Environment-based configuration with `.env`
- Code linting with ESLint
- PostCSS for styling customization

---

## 🧰 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: [Supabase](https://supabase.com)
- **Tooling**: Node.js, ESLint, PostCSS

---

## 📦 Installation

```bash
git clone https://github.com/your-username/agency-access-nexus.git
cd agency-access-nexus
npm install
```

---

## 🔌 Supabase Configuration

This project connects to Supabase for backend services including authentication, database, and storage.

1. Create a project in [Supabase](https://app.supabase.com/).
2. Copy your **anon public API key** and **Supabase project URL**.
3. Update your `.env` file with the following entries:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-public-api-key
```

> ⚠️ **Do not share your anon key publicly.** Keep the `.env` file private and avoid pushing it to GitHub.

---

## 💻 Usage

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

---

## 🧪 Linting

Run ESLint to check for code style issues:

```bash
npm run lint
```

---

## 📁 File Structure

```
agency-access-nexus/
├── .env                # Environment variables (Supabase keys)
├── index.html          # Entry point
├── package.json        # Dependencies and scripts
├── postcss.config.js   # CSS config
├── eslint.config.js    # Linting rules
└── ...
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
