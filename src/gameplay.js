import { Gamestate } from './game'
import { Background } from './background'
import { Notefield } from './notefield'
import { White } from './color'
import { clear } from './canvas'

const bindings = [
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyK',
  'KeyL',
  'Semicolon'
]

export function Gameplay () {
  const { width, height } = document.querySelector('#game')

  const song = {
    title: 'random song',
    artist: 'random person',
    notes: [
      { column: 0, time: 0 },
      { column: 1, time: 1 },
      { column: 2, time: 2 },
      { column: 3, time: 3 },
      { column: 4, time: 4 },
      { column: 5, time: 5 }
    ]
  }

  const config = { scrollSpeed: 3 }

  const field = Notefield(song, config)
  const bg = Background(width, height)

  function update (elapsed) {
    bg.update(elapsed)
    field.update(elapsed)
  }

  function draw () {
    clear(White)
    bg.draw()
    field.draw()
  }

  function keydown (event) {
    checkNotefieldInput(event, field.press)
  }

  function keyup (event) {
    checkNotefieldInput(event, field.lift)
  }

  function checkNotefieldInput ({ code, repeat }, action) {
    if (!repeat) {
      const index = bindings.indexOf(code)
      if (index > -1) action(index)
    }
  }

  return Gamestate({ update, draw, keydown, keyup })
}
