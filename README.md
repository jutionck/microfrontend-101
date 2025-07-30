# Microfrontend 101

Microfrontend dengan **React**, **Webpack Module Federation**, dan **Tailwind CSS**

## Struktur Proyek

```
microfrontend-101/
├── host-app/          # Host app (port 3000)
├── login-app/         # Remote app login (port 3001)
├── todo-app/          # Remote app todo (port 3002)
└── README.md          # Dokumentasi ini
```

## Fitur

### Host App

- **Host aplikasi utama** yang mengintegrasikan semua microfrontend

### Login App

- **Demo credentials**: username: `admin`, password: `password`
- **Exposed component**: `loginApp/Login`

### Todo App

- **Exposed component**: `todoApp/TodoList`

## Teknologi

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Webpack Module Federation** - Microfrontend architecture
- **Tailwind CSS v4** - Modern styling dengan CDN fallback
- **Bootstrap Pattern** - Async module loading untuk federation
- **localStorage** - Session persistence
- **PostCSS** - CSS processing

## Quick Start

### Development Environment

```bash
cd host-app && npm run dev:webpack
cd login-app && npm run dev:webpack
cd todo-app && npm run dev:webpack
```

Setelah menjalankan script, akses:

- **Host App**: http://localhost:3000
- **Login App**: http://localhost:3001
- **Todo App**: http://localhost:3002

## Cara Penggunaan

1. **Buka http://localhost:3000**
2. **Login** dengan credentials:
   - Username: `admin`
   - Password: `password`
3. **Kelola todos** di dashboard
4. **Logout** untuk clear session

## Build Production

```bash
cd host-app && npm run build:webpack
cd login-app && npm run build:webpack
cd todo-app && npm run build:webpack
```

## Arsitektur Microfrontend

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

## Log Files

Script akan generate log files:

- `host-app.log` - Log dari host application
- `login-app.log` - Log dari login microfrontend
- `todo-app.log` - Log dari todo microfrontend
