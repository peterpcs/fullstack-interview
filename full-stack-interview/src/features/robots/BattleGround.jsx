import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { FIGHT_MODE_OFF, FIGHT_RECORD } from '../../store/actions'

const selectRobotsToFight = (state) => {
  return state.filter((robot) => robot.fightModeOn)
}
// TODO: split into small coponents and reuse
// TODO: a lot of duplicate code that can be grouped and resused
const BattleGround = () => {
  const robots = useSelector((state) => selectRobotsToFight(state)) || []
  const navigate = useNavigate()
  const location = useLocation()
  const [player1WinCounter, setPlayer1WinCounter] = useState(0)
  const [player2WinCounter, setPlayer2WinCounter] = useState(0)
  const [showRound1, setShowRound1] = useState(true)
  const [showRound2, setShowRound2] = useState(true)
  const [showRound3, setShowRound3] = useState(true)
  const [winner1, setWinner1] = useState('')
  const [winner2, setWinner2] = useState('')
  const [winner3, setWinner3] = useState('')
  const [winner, setWinner] = useState('')

  const dispatch = useDispatch()

  const goToPlayers = (e) => {
    e.preventDefault()

    navigate('/robots' + location.search)
  }

  useEffect(() => {
    if (player1WinCounter === 2) {
      setWinner(robots[0].name + ' ' + robots[0].color)
      dispatch({
        type: FIGHT_RECORD,
        payload: {
          id: robots[0].id,
          result: `Won against ${robots[1].name} ${robots[1].color}`,
        },
      })

      dispatch({
        type: FIGHT_RECORD,
        payload: {
          id: robots[1].id,
          result: `Lost against ${robots[0].name} ${robots[0].color}`,
        },
      })
    }

    if (player2WinCounter === 2) {
      setWinner(robots[1].name + ' ' + robots[1].color)
      dispatch({
        type: FIGHT_RECORD,
        payload: {
          id: robots[1].id,
          result: `Won against ${robots[0].name} ${robots[0].color}`,
        },
      })
      dispatch({
        type: FIGHT_RECORD,
        payload: {
          id: robots[0].id,
          result: `Lost against ${robots[1].name} ${robots[1].color}`,
        },
      })
    }
  }, [player1WinCounter, player2WinCounter])

  const SelectTwoPlayers = (
    <>
      <p>Choose two players from Robots list to fight!</p>
      <button className="button" onClick={goToPlayers}>
        Click here!
      </button>
    </>
  )

  const SelectAnotherPlayer = () => (
    <>
      <p>
        Choose another player to fight against{' '}
        <b>{`${robots[0].name} ${robots[0].color}`}</b>
      </p>
      <button className="button" onClick={goToPlayers}>
        Click here!
      </button>
    </>
  )

  const onAttack = (p1, p2) => {
    if (p1.attack() > p2.defend()) {
      setPlayer1WinCounter((player1WinCounter) => player1WinCounter + 1)
      return p1.name + ' ' + p1.color
    } else {
      setPlayer2WinCounter((player2WinCounter) => player2WinCounter + 1)
      return p2.name + ' ' + p2.color
    }
  }

  const onAttack1 = (e, p1, p2) => {
    e.preventDefault()
    setWinner1(onAttack(p1, p2))
  }
  const onAttack2 = (e, p1, p2) => {
    e.preventDefault()
    setWinner2(onAttack(p1, p2))
  }

  const onRace = (e, p1, p2) => {
    e.preventDefault()
    e.currentTarget.style.visibility = 'hidden'

    const p1Ready = p1.race()
    const p2Ready = p2.race()

    Promise.race([p1Ready, p2Ready]).then((response) => {
      if (response === p1.id) {
        setPlayer1WinCounter((player1WinCounter) => player1WinCounter + 1)
        setWinner3(p1.name + p1.color)
      } else {
        setPlayer2WinCounter((player2WinCounter) => player2WinCounter + 1)
        setWinner3(p2.name + p2.color)
      }
    })
  }

  const onClose = () => {
    dispatch({ type: FIGHT_MODE_OFF, payload: robots[0].id })
    dispatch({ type: FIGHT_MODE_OFF, payload: robots[1].id })
  }

  const Battle = () => {
    const player1 = `${robots[0].name} ${robots[0].color}`
    const player2 = `${robots[1].name} ${robots[1].color}`
    return (
      <>
        <p>This is a battle between:</p>
        <b>{player1}</b>
        <p>vs</p>
        <b>{player2}</b>
        <p>There are three rounds to deicde who wins:</p>
        <div>
          <p>
            Round 1: <b>{player1}</b> will atack and <b>{player2}</b> will
            defend
          </p>
          {showRound1 && (
            <div>
              <button
                onClick={(e) => {
                  onAttack1(e, robots[0], robots[1])
                  setShowRound1(false)
                }}
              >
                Attack
              </button>
            </div>
          )}
          {winner1 && (
            <p>
              <b style={{ color: 'yellowgreen' }}>{winner1} wins Round 1</b>
            </p>
          )}
        </div>

        <div>
          <p>
            Round 2: <b>{player2}</b> will atack and <b>{player1}</b> will
            defend
          </p>
          {showRound2 && (
            <div>
              <button
                onClick={(e) => {
                  onAttack2(e, robots[1], robots[0])
                  setShowRound2(false)
                }}
              >
                Attack
              </button>
            </div>
          )}
          {winner2 && (
            <p>
              <b style={{ color: 'yellowgreen' }}>{winner2} wins Round 2</b>
            </p>
          )}
        </div>

        <div>
          <p>
            Round 3: <b>{player1}</b> and <b>{player2}</b> will race against
            each other
          </p>
          {showRound3 && (
            <div>
              <button
                onClick={(e) => {
                  onRace(e, robots[0], robots[1])
                  setShowRound3(false)
                }}
              >
                Race
              </button>
            </div>
          )}

          {winner3 && (
            <p>
              <b style={{ color: 'yellowgreen' }}>{winner3} wins Round 3</b>
            </p>
          )}
        </div>
        {winner && (
          <>
            <p style={{ color: 'green' }}>
              <b>Overall {winner} wins the battle!</b>
            </p>
            <button onClick={onClose} className="button">
              Finish
            </button>
          </>
        )}
      </>
    )
  }

  return (
    <div className="battle_ground">
      {robots.length === 0 && SelectTwoPlayers}
      {robots.length === 1 && <SelectAnotherPlayer />}
      {robots.length >= 2 && <Battle />}
    </div>
  )
}

export default BattleGround
