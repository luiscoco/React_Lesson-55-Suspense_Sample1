# Suspense Lazy Loading Demo

A tiny Vite + React (TypeScript) app that demonstrates React Suspense with a lazy-loaded `Profile` component and a visible loading state.

## Features
- Lazy-loads `Profile` with a 1.2s artificial delay so the fallback is visible.
- Suspense boundary renders a clear "Loading profile..." message while waiting.
- "Reload profile" button bumps a version key to re-trigger the lazy import and fallback.

## Key Code
```tsx
// src/App.tsx
import { Suspense, lazy, useMemo, useState } from 'react'
import './App.css'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function App() {
  const [version, setVersion] = useState(0)

  const Profile = useMemo(
    () => lazy(() => wait(1200).then(() => import('./Profile'))),
    [version]
  )

  return (
    <div className="app">
      <h1>Suspense demo</h1>
      <p>Lazy-loaded profile waits 1.2s so you can see the fallback.</p>

      <button onClick={() => setVersion((v) => v + 1)}>Reload profile</button>

      <Suspense
        key={version}
        fallback={<p className="loader">Loading profile...</p>}
      >
        <Profile />
      </Suspense>
    </div>
  )
}

export default App
```

```tsx
// src/Profile.tsx
export default function Profile() {
  return <p>This is the profile content.</p>
}
```

## Run the app
```bash
npm install
npm run dev
```
Then open the printed local URL (usually http://localhost:5173). Click "Reload profile" to see the Suspense fallback each time.
