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
  async viewHintText () {
    const hintText = document.getElementById('hintText')
    const hintList = [
      'I cannot understand English',
      '\'pie\' is a variable, pi',
      '\'e\' is a napier number',
      'I\'m Japanese',
      'This program uses RPN',
      'The ( at the end can be omitted.',
      'you can use a variable, \'x\'',
      'you can see RPN result, if you click F12'
    ]
    while (true) {
      hintText.style.opacity = 0
      await new Promise(resolve => setTimeout(resolve, 500))
      hintText.innerText = hintList[Math.floor(Math.random() * hintList.length)]
      hintText.style.opacity = 1
      await new Promise(resolve => setTimeout(resolve, 10 * 1000))
    }
  }
}