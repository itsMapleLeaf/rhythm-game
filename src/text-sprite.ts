import * as canvas from './canvas'
import {White} from './color'

export class TextSprite {
  font = 'Unica One'
  fontSize = 32
  align = 'center'
  opacity = 1

  constructor (
    public text = '',
    public x = 0,
    public y = 0,
    public color = White,
  ) {}

  draw () {
    canvas.layer(() => {
      canvas.setFillColor(this.color.opacity(this.opacity))
      canvas.setFont(`${this.fontSize}px ${this.font}`)
      canvas.setTextAlign(this.align)
      canvas.fillText(this.text, this.x, this.y)
    })
  }
}