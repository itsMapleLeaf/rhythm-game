import * as canvas from './canvas'
import {clamp, lerp} from './util'
import {Blue, Orange, Green, Red, Cloudy} from './color'

const {ceil} = Math

export const enum Judgement { None, Break, Good, Perfect, Absolute }

export const TimingWindow = {
  Absolute: 15 / 1000,
  Perfect: 70 / 1000,
  Good: 130 / 1000,
}

const JudgementColor = {
  [Judgement.Absolute]: Blue,
  [Judgement.Perfect]: Orange,
  [Judgement.Good]: Green,
  [Judgement.Break]: Red,
}

const JudgementText = {
  [Judgement.Absolute]: 'ABSOLUTE',
  [Judgement.Perfect]: 'PERFECT',
  [Judgement.Good]: 'GOOD',
  [Judgement.Break]: 'BREAK',
}

export class JudgementAnimation {
  time = 0
  judgement = Judgement.None

  play (score: Judgement) {
    this.time = 1
    this.judgement = score
  }

  update (dt: number) {
    this.time = clamp(this.time - (dt / 0.8), 0, 1)
  }

  draw (x: number, y: number) {
    if (this.judgement === Judgement.None) return

    const text = JudgementText[this.judgement]
    const color = JudgementColor[this.judgement]
    const position = this.getPosition()
    const opacity = this.getOpacity()

    canvas.layer(() => {
      canvas.setFillColor(color.opacity(opacity))
      canvas.setFont('40pt Unica One')
      canvas.setTextAlign('center')
      canvas.fillText(text, x, y + position)
    })
  }

  getPosition (): number {
    if (this.judgement !== Judgement.Break) {
      return (this.time ** 8) * 20
    } else {
      return (1 - this.time) * 20
    }
  }

  getOpacity (): number {
    if (this.judgement !== Judgement.Break) {
      return clamp(this.time * 5, 0, 1)
    } else {
      return clamp(this.time * 2, 0, 1)
    }
  }
}

export class ComboAnimation {
  combo = 0
  time = 1

  add (combo: number) {
    if (combo > 0) {
      this.combo += combo
      this.time = 0
    }
  }

  reset () {
    this.combo = 0
  }

  update (dt: number) {
    this.time = lerp(this.time, 1, dt * 15)
  }

  draw (x: number, y: number) {
    if (this.combo < 1) return

    canvas.setFont('72px Unica One')
    canvas.setTextAlign('center')

    canvas.layer(() => {
      const scale = lerp(0.8, 1, this.time)
      canvas.translate(x, y)
      canvas.ctx.scale(scale, scale)
      canvas.setFillColor(Cloudy)
      canvas.fillText(this.combo.toString(), 0, 0)
    })
  }
}