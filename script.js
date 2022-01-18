// calcRPNをcalcModuleとしてimport
// モジュール名は「* as 〇〇」の〇〇に当たる
import * as calcModule from './modules/calcRPN.js'

document.getElementById('submitCalc').addEventListener('click', e => {
  const ele = document.getElementById('calcInput')
  const val = ele.value // フォーム値
  try {
    // インスタンス化
    const rpnClass = new calcModule.CalcRPN()
    /* 変数の宣言 */
    rpnClass.crateVariable('x', 10)
    rpnClass.changeVariable('x', 50)
    rpnClass.crateVariable('y', 100)
    rpnClass.removeVariable('y')
    // rpnClass.viewVariableList()
    const res = rpnClass.calcByInput(val)
    console.log(`res : ${res.value}`)
    console.log(`rpn : ${res.rpn}`)
  } catch (e) {
    console.error(e)
  }
})