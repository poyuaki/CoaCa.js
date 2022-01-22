import * as CoacaModule from './modules/coaca.js'
import * as viewModule from './modules/view.js' // It just show result.

const viewClass = new viewModule.ViewCaC()

viewClass.viewHintText()

function errorFlow (e) {
  viewClass.viewCalcRes('Error!') // view error message
  console.error(e)
}

// instantiate
const coacaClass = new CoacaModule.Coaca()


try {
  coacaClass.createVariable('x', 10)
  coacaClass.changeVariable('x', 50)
  coacaClass.createVariable('y', 100)
  coacaClass.removeVariable('y')
} catch (e) {
  errorFlow(e)
}

document.getElementById('submitCalc').addEventListener('click', e => {
  const ele = document.getElementById('calcInput')
  const val = ele.value // form value
  try {
    coacaClass.setFormula(val) // set a formula
    coacaClass.convertToRPN() // convert to RPN
    const res = coacaClass.rpnCalc() // calculate
    viewClass.viewCalcRes(res) // view result
    console.log(`res : ${res}`)
    console.log(`rpn : ${coacaClass.rpnArr.join(' ')}`)
  } catch (e) {
    errorFlow(e)
  }
})