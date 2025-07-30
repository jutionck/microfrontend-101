# Microfrontend 101 - Implementasi Lengkap

Proyek microfrontend menggunakan React, Webpack Module Federation, dan Tailwind CSS dengan arsitektur yang sudah diperbaiki dan dioptimalkan.

## 🚀 Struktur Proyek

```
microfrontend-101/
├── host-app/          # Aplikasi utama (port 3000)
├── login-app/         # Microfrontend login (port 3001)
├── todo-app/          # Microfrontend todo (port 3002)
├── start-dev.sh       # Script jalankan semua aplikasi
├── stop-dev.sh        # Script stop semua aplikasi
└── README.md          # Dokumentasi ini
```

## ✨ Fitur Utama

### 🏠 Host App (Port 3000)

- **Shell aplikasi utama** yang mengintegrasikan semua microfrontend
- **Session management** dengan localStorage (24 jam expire)
- **Tailwind CSS** untuk styling modern dan responsive

### 🔐 Login App (Port 3001)

- **Demo credentials**: username: `admin`, password: `password`
- **Exposed component**: `loginApp/Login`

### ✅ Todo App (Port 3002)

- **Exposed component**: `todoApp/TodoList`

## 🔧 Teknologi yang Digunakan

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Webpack Module Federation** - Microfrontend architecture
- **Tailwind CSS v4** - Modern styling dengan CDN fallback
- **Bootstrap Pattern** - Async module loading untuk federation
- **localStorage** - Session persistence
- **PostCSS** - CSS processing

## 🚀 Quick Start

### 1. Jalankan Development Environment

```bash
# Buat script executable
chmod +x start-dev.sh stop-dev.sh

# Jalankan semua aplikasi
./start-dev.sh
```

Setelah menjalankan script, akses:

- **🏠 Host App**: http://localhost:3000 (Dashboard Utama)
- **🔐 Login App**: http://localhost:3001 (Standalone Login)
- **✅ Todo App**: http://localhost:3002 (Standalone Todo)

## 📱 Cara Penggunaan

1. **Buka http://localhost:3000**
2. **Login** dengan credentials:
   - Username: `admin`
   - Password: `password`
3. **Kelola todos** di dashboard
4. **Logout** untuk clear session

## 🛠️ Development Scripts

### Webpack Mode

```bash
# Jalankan individual dengan webpack
cd host-app && npm run dev:webpack
cd login-app && npm run dev:webpack
cd todo-app && npm run dev:webpack
```

## 🏗️ Build Production

```bash
# Build semua aplikasi
cd host-app && npm run build:webpack
cd login-app && npm run build:webpack
cd todo-app && npm run build:webpack
```

## 📋 Arsitektur Microfrontend

### Module Federation Configuration

```javascript
// Host App - Consumer
remotes: {
  loginApp: 'loginApp@http://localhost:3001/remoteEntry.js',
  todoApp: 'todoApp@http://localhost:3002/remoteEntry.js'
}

// Remote Apps - Producer
exposes: {
  './Login': './src/components/Login',
  './TodoList': './src/components/TodoList'
}
```

### Shared Dependencies

```javascript
shared: {
  react: { singleton: true, eager: false },
  'react-dom': { singleton: true, eager: false }
}
```

### Bootstrap Pattern

```javascript
// main.tsx
import('./bootstrap'); // Async loading

// bootstrap.tsx
import React from 'react';
// Component initialization
```

## 🐛 Troubleshooting

### Masalah Module Federation

```bash
# Pastikan semua app running di port yang benar
./start-dev.sh

# Check remoteEntry.js accessible
curl http://localhost:3001/remoteEntry.js
curl http://localhost:3002/remoteEntry.js
```

### Masalah Tailwind CSS

```bash
# Pastikan CDN Tailwind ter-load di host-app
# Check di browser DevTools > Network > tailwindcss

# Jika masih tidak work, restart semua service
./stop-dev.sh
./start-dev.sh
```

### Masalah Port Conflicts

```bash
# Check port yang terpakai
lsof -i :3000 -i :3001 -i :3002

# Kill process yang conflict
./stop-dev.sh
```

### Reset Complete

```bash
# Hard reset jika ada masalah
./stop-dev.sh
rm -rf */node_modules */package-lock.json
./install-deps.sh
./start-dev.sh
```

## 📝 Log Files

Script akan generate log files:

- `host-app.log` - Log dari host application
- `login-app.log` - Log dari login microfrontend
- `todo-app.log` - Log dari todo microfrontend
