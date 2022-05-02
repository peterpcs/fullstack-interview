import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CreateRobot from './features/robots/CreateRobot'
import RobotList from './features/robots/RobotList'
import RobotListItem from './features/robots/RobotListItem'
import BattleGround from './features/robots/BattleGround'
import Home from './features/robots/Home'
import store from './store/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="create" element={<CreateRobot />} />
            <Route path="robots" element={<RobotList />}>
              <Route path=":robotId" element={<RobotListItem />} />
              <Route
                index
                element={
                  <main style={{ padding: '1rem' }}>
                    Select or Create a Robot
                  </main>
                }
              />
            </Route>
            <Route path="battle" element={<BattleGround />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
