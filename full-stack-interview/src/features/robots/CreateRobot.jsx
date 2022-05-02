import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const CreateRobot = () => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name && color) setError(false)
    else {
      setError(true)
      return
    }

    dispatch({ type: 'CREATE_ROBOT', payload: { name, color } })
    setName('')
    setColor('')
  }

  return (
    <form onSubmit={handleSubmit} className="create_robot_form">
      {error && <p style={{ color: 'red' }}>Please enter name and color!</p>}
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Your robot's name"
          autoFocus={true}
          onChange={(e) => setName(e.target.value.trim())}
        />
      </label>
      <label>
        Color:
        <input
          type="text"
          name="color"
          value={color}
          placeholder="Your robot's color"
          onChange={(e) => setColor(e.target.value.trim())}
        />
      </label>
      <input className="submit button" type="submit" value="Create" />
    </form>
  )
}

export default CreateRobot
