import * as CoacaModule from './modules/coaca.js'
import * as viewModule from './modules/view.js' // It just show result.

const viewClass = new viewModule.ViewCaC()

document.getElementById('submitCalc').addEventListener('click', e => {
  const ele = document.getElementById('calcInput')
  const val = ele.value // form value
  try {
    // instantiate
    const coacaClass = new CoacaModule.Coaca()
    /* control variables */
    coacaClass.crateVariable('x', 10)
    coacaClass.changeVariable('x', 50)
    coacaClass.crateVariable('y', 100)
    coacaClass.removeVariable('y')
    coacaClass.setFormula(val) // set a formula
    coacaClass.convertToRPN() // convert to RPN
    const res = coacaClass.rpnCalc() // calculate
    viewClass.viewCalcRes(res) // view result
    console.log(`res : ${res}`)
    console.log(`rpn : ${coacaClass.rpnArr.join(' ')}`)
  } catch (e) {
    viewClass.viewCalcRes('Error!') // view error message
    console.error(e)
  }
})