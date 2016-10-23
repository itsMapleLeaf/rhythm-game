// import Background from './background'
import Notefield from './notefield'
// import {White} from './color'
// import * as canvas from './canvas'

class Gameplay {
  field = new Notefield({}, {})

  update (elapsed: number) {
    this.field.update(elapsed)
  }

  draw () {
    this.field.draw()
  }
}

export default Gameplay