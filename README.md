# Zustand Auth Starter Kit 🔐

[![Zustand Version](https://img.shields.io/badge/zustand-^4.0.0-blue)](https://zustand-demo.pmnd.rs/)
[![React Version](https://img.shields.io/badge/react-^18.0.0-blue)](https://react.dev/)

A production-ready authentication starter with Zustand state management, mock API support, and seamless persistence.

![Auth Flow Demo](https://via.placeholder.com/1280x600.png?text=Login+%E2%86%92+Dashboard+%E2%86%92+Profile+Demo)

## Features ✨

- **Complete Authentication Flow**  
  Login, Signup, Logout with persistent sessions
- **Mock Backend Included**  
  LocalStorage-powered database with realistic API simulation
- **Zero-Boilerplate Architecture**  
  Ready-to-use stores and components
- **TypeSafe Implementation**  
  Full TypeScript support with strict types
- **Dev-Friendly Tools**  
  Built-in debug panel & configurable API delays
- **Easy Real API Migration**  
  Switch to real backend with minimal changes

## Tech Stack 🛠️

| Component        | Technology                   |
| ---------------- | ---------------------------- |
| State Management | Zustand + Persist Middleware |
| Routing          | Next.js App Router           |
| Styling          | Tailwind CSS                 |
| Build Tool       | Vite                         |
| Testing          | Vitest + MSW (Ready)         |

## Getting Started 🚀

### Prerequisites

- Node.js v18+
- npm (v9+) or pnpm

### Installation

```bash
git clone https://github.com/yourusername/zustand-auth-starter.git
cd zustand-auth-starter
pnpm install
pnpm dev

Project Structure 📂

/src
├── stores/
│   ├── auth.store.ts       # Auth state & actions
│   └── mock.store.ts       # Persistent mock database
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx   # Login UI
│   │   └── PrivateRoute.tsx# Route protection
│   └── debug/
│       └── DebugPanel.tsx  # State visualization
├── mock/
│   ├── api.ts              # API response handlers
│   └── schema.ts           # Database types
└── app/
    ├── layout.tsx          # Root layout
    └── dashboard/
        └── page.tsx        # Protected route example



Core Usage 💡

1. Authentication Flow

// components/auth/LoginForm.tsx
const LoginForm = () => {
  const { login, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      await login(
        formData.get('email') as string,
        formData.get('password') as string
      );
      router.push('/dashboard');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form inputs */}
    </form>
  );
};

2. Route Protection

// app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <PrivateRoute>
      <h1>Welcome to your Dashboard!</h1>
      <UserProfile />
    </PrivateRoute>
  );
}


Mock API Endpoints 🌐

Endpoint	Method	Description
/api/login	POST	Authenticate user
/api/signup	POST	Create new user
/api/validate	GET	Validate session token
/api/logout	POST	Invalidate session
Transition to Real API 🔄

1. Disable Mock Mode
Set VITE_MOCK_ENABLED=false in .env

2. Implement API Service

// services/auth.ts
export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  }
};

3. Update Store Actions

// In auth.store.ts
login: async (email, password) => {
  const { user, token } = await authService.login({ email, password });
  set({ user, token, isAuthenticated: true });
}

Contributing 🤝

1. Fork the repository
2. Create feature branch: git checkout -b feat/amazing-feature
3. Commit changes: git commit -m 'Add amazing feature'
4. Push to branch: git push origin feat/amazing-feature
5. Open a Pull Request
```
