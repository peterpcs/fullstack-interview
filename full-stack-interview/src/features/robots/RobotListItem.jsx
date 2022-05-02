import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { FIGHT_MODE_ON, DELETE_ROBOT } from '../../store/actions'

const selectRobotById = (state, robotId) => {
  return state.find((robot) => robot.id === parseInt(robotId))
}

const RobotListItem = () => {
  const { robotId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const robot = useSelector((state) => selectRobotById(state, robotId))
  const { name, color } = robot

  const dispatch = useDispatch()

  const onDelete = (e) => {
    e.preventDefault()

    dispatch({ type: DELETE_ROBOT, payload: robot.id })
    navigate('/robots' + location.search)
  }

  const onFight = (e) => {
    e.preventDefault()
    dispatch({ type: FIGHT_MODE_ON, payload: robot.id })
    navigate('/battle' + location.search)
  }

  return (
    <div className="robot_details">
      <div className="detail_actions">
        <div
          className="robot-text"
          style={{ color: color.toLowerCase() }}
        >{`${name} ${color}`}</div>

        <button className="button robot_action" onClick={onFight}>
          Fight
        </button>
        <button onClick={onDelete} className="button robot_action">
          Delete
        </button>
      </div>
      <div>
        <p>Battle Results:</p>
        <ul>
          {robot.battles.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RobotListItem
