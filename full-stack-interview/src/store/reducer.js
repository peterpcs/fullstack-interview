import {
  CREATE_ROBOT,
  DELETE_ROBOT,
  FIGHT_MODE_ON,
  FIGHT_MODE_OFF,
  FIGHT_RECORD,
} from './actions'

const initialState = []

function nextRobotId(robots) {
  const maxId = robots.reduce((maxId, robot) => Math.max(robot.id, maxId), -1)
  return maxId + 1
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROBOT: {
      return [
        ...state,
        {
          id: nextRobotId(state),
          name: action.payload.name,
          color: action.payload.color,
          fightModeOn: false,
          attack: function () {
            return Math.random()
          },
          defend: function () {
            return Math.random()
          },
          race: function () {
            return new Promise((resolve) => setTimeout(resolve, 2000, this.id))
          },
          battles: [],
        },
      ]
    }

    case DELETE_ROBOT: {
      return state.filter(({ id }) => id !== action.payload)
    }

    case FIGHT_MODE_ON: {
      return state.map((robot) => {
        if (robot.id !== action.payload) {
          return robot
        }

        return {
          ...robot,
          fightModeOn: true,
        }
      })
    }

    case FIGHT_MODE_OFF: {
      return state.map((robot) => {
        if (robot.id !== action.payload) {
          return robot
        }

        return {
          ...robot,
          fightModeOn: false,
        }
      })
    }

    case FIGHT_RECORD: {
      return state.map((robot) => {
        if (robot.id !== action.payload.id) {
          return robot
        }

        return {
          ...robot,
          battles: [...robot.battles, action.payload.result],
        }
      })
    }

    default:
      return state
  }
}
