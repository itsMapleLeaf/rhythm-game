import {Scene, Font, TextAlign, FillText, FillColor} from './rendering'
import {clamp} from './util'
import {Blue, Orange, Green, Red} from './color'

export const JudgeLevels = {
  absolute: { text: 'ABSOLUTE', color: Blue, window: 15 / 1000 },
  perfect: { text: 'PERFECT', color: Orange, window: 70 / 1000 },
  good: { text: 'GOOD', color: Green, window: 130 / 1000 },
  break: { text: 'BREAK', color: Red }
}

export function Judgement () {
  let animation = 1
  let lastJudgement

  function trigger (score) {
    animation = 1
    lastJudgement = score
  }

  function update (elapsed) {
    animation = clamp(animation - (elapsed / 0.8), 0, 1)
  }

  function render () {
    if (lastJudgement == null) {
      return Scene()
    } else if (lastJudgement !== JudgeLevels.break) {
      const opacity = clamp(animation * 5, 0, 1)
      const offset = (animation ** 8) * 20
      return renderJudgement(lastJudgement, opacity, offset)
    } else {
      const opacity = clamp(animation * 2, 0, 1)
      const offset = (1 - animation) * 20
      return renderJudgement(lastJudgement, opacity, offset)
    }
  }

  function renderJudgement ({ text, color }, opacity, offset) {
    return Scene(
      FillColor(color.opacity(opacity)),
      Font('40pt Unica One'),
      TextAlign('center'),
      FillText(text, 0, offset),
    )
  }

  return { update, render, trigger }
}

export function getJudgement (timing) {
  const diff = Math.abs(timing)
  if (diff < JudgeLevels.absolute.window) return JudgeLevels.absolute
  if (diff < JudgeLevels.perfect.window) return JudgeLevels.perfect
  if (diff < JudgeLevels.good.window) return JudgeLevels.good
  return JudgeLevels.break
}

export function isMissed (timing) {
  return timing > JudgeLevels.good.window
}
