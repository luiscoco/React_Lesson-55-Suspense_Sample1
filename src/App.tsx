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
