import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'

const RobotList = () => {
  const robots = useSelector((state) => state, shallowEqual)

  const renderedListItems = robots.map(({ id, name, color }) => (
    <NavLink
      style={({ isActive }) => {
        return {
          display: 'block',
          margin: '1rem 0',
          color: isActive ? 'red' : '',
        }
      }}
      to={`/robots/${id}`}
      key={id}
    >
      {`${name} ${color}`}
    </NavLink>
  ))

  return (
    <div className="robots_list" style={{ display: 'flex' }}>
      <nav style={{ borderRight: 'solid 1px', padding: '1rem' }}>
        {renderedListItems}
      </nav>
      <Outlet />
    </div>
  )
}

export default RobotList
