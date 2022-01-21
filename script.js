import * as calcModule from './modules/calcRPN.js'
import * as viewModule from './modules/view.js' // It just show result.

const viewClass = new viewModule.ViewCaC()

document.getElementById('submitCalc').addEventListener('click', e => {
  const ele = document.getElementById('calcInput')
  const val = ele.value // form value
  try {
    // instantiate
    const rpnClass = new calcModule.CalcRPN()
    /* control variables */
    rpnClass.crateVariable('x', 10)
    rpnClass.changeVariable('x', 50)
    rpnClass.crateVariable('y', 100)
    rpnClass.removeVariable('y')
    rpnClass.setFormula(val) // set a formula
    rpnClass.convertToRPN() // convert to RPN
    const res = rpnClass.rpnCalc() // calculate
    viewClass.viewCalcRes(res) // view result
    console.log(`res : ${res}`)
    console.log(`rpn : ${rpnClass.rpnArr.join(' ')}`)
  } catch (e) {
    viewClass.viewCalcRes('Error!') // view error message
    console.error(e)
  }
})