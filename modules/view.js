/**
 * 注意
 *   このファイルは計算結果を表示するためだけに作られたファイルです。
 *   CoaCa.jsには全く関係ないのでご注意ください。
 * 
 * Attention
 *   This file is just made for show calculation result.
 *   It do not have a relationship to CoaCa.js at all so be careful.
 */

export class ViewCaC {
  constructor () {
  }
  async viewCalcRes (res) {
    document.getElementById('calcResultText').style.opacity = 0
    await new Promise(resolve => setTimeout(resolve, 200))
    document.getElementById('calcResultText').innerText = res
    document.getElementById('calcResultText').style.opacity = 1
  }
}