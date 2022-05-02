import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header>
        <section>
          <h1 style={{ textAlign: 'center' }}>My Robots Collection</h1>
        </section>
      </header>

      <nav className="main_nav">
        <Link to="/home">Home</Link> | <Link to="/create">New Robot</Link> | <Link to="/robots">Robots</Link> | <Link to="/battle">Battle Ground</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
