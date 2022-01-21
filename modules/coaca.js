/**
 * CoaCa.js
 *  Convert and Calculate by RPN
 * 
 * version: v0.0.0
 * test version
**/

const operatorList = ['+', '-', '*', '/', '^', '_', '%'] // 演算子

/**
 * calcRPNのエラーハンドリング
 * 
 * @param {number} typeId エラーのID
 * @param {string} message エラー時のメッセージ
 */
function ErrorHandling (typeId, message) {
  this.typeId = typeId
  this.message = message
}

/**
 * 演算子かどうかを判定する関数
 * @param {string} val 文字
 * @returns {bool} 判定結果
 */
function isOperator (val) {
  return operatorList.indexOf(val) !== -1
}

/**
 * 丸括弧かどうかを判定する関数
 * 
 * @param {string} val 文字
 * @returns {bool} 判定結果
 */

function isBracket (val) {
  return val === '(' || val === ')'
}

/**
 * 演算子と数値を配列に分割する関数
 * @param {string} formula  計算式
 * @returns {array} 分割した配列
 */
function setOperatorAndNum (formula) {
  let res = []
  let add = ''
  let flag = false
  for (let i = 0; i < formula.length; i++) {
    let val = formula.substring(i, i + 1)
    val = val.replace(/\s+/g, "")
    if (!isOperator(val) && !isBracket(val)) {
      add += val
    } else {
      if (add !== '') {
        if (val === ')' && flag) {
          add = '-' + add
          flag = false
        }
        res.push(add) // 数値があったら
      }
      if (res[res.length - 1] === '(' && val === '-') { // 演算子があったら
        flag = true
        continue
      } else {
        res.push(val)
      }
      add = ''
    }
  }
  if (add !== '') res.push(add)
  return res
}

/**
 * 演算子の優先度を返す関数
 * @param {string} val 演算子
 * @returns {number} 優先度
 */
function importantceNum (val) {
  if (isBracket(val)) return 5
  if (val === '^' || val === '%' || val === '_') return 4
  if (val === '*' || val === '/') return 3
  if (val === '+' || val === '-') return 2
  else return 1
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

/**
 * 
 * 演算子によって計算をする関数
 * 
 * @param {string} ope 演算子
 * @param {string} val1 値1
 * @param {string} val2 値2
 * @returns {number} 計算結果
 */
function calc (ope, val1, val2) {
  if (ope === '+') return val1 + val2
  if (ope === '-') return val2 - val1
  if (ope === '*') return val1 * val2
  if (ope === '/') return val2 / val1
  if (ope === '^') return val2 ** val1
  if (ope === '%') return val2 % val1
  if (ope === '_') return getBaseLog(val1, val2)
}

/**
 * 引数が正しい形式の計算式になっているか
 * 
 * @param {string} tar 文字列
 * @return {boolean} 正しいかどうか
 */
function isTrueExp (tar) {
  for (let i = 0; i < tar.length; i++) {
    const val = tar.substring(i, i + 1)
    if (!isBracket(val) && !isOperator(val) && isNaN(val) && val !== '!') {
      return false
    }
  }
  return true
}

export class Coaca {
  constructor () {
    this.init()
  }
  /**
   * 初期化
   */
  init () {
    // 変数のリスト
    this.variableList = [
      {
        name: 'pie',
        value: Math.PI
      },
      {
        name: 'e',
        value: Math.E
      }
    ]
    // 式
    this.formula = ''
    // RPNの配列
    this.rpnArr = []
    // 中置記法にて演算子と数値を分別した配列
    this.splitOpeArr = []
    /* デフォルトの変数であるフラグを追加する */
    this.variableList.forEach(e => {
      e.isDefalut = true
    })
  }
  setFormula (formula) {
    this.formula = formula
  }
  /**
   * 中置記法を逆ポーランド記法に変換する関数
   * @param {string} formula 計算式
   * @returns {array} 逆ポーランド記法
   */
  convertToRPN (data = '') {
    let res = [] // 結果を格納する配列
    let stock = [] // ストック用配列
    let formula = data
    if (formula === '') formula = this.formula
    let valList = setOperatorAndNum(formula) // 演算子と数値を分割した配列
    let flag = false // 初回かどうかのフラグ(演算子)
    for (let i = 0; i < valList.length; i++) {
      const val = valList[i]
      if (!this.isInVariableList(val) && !isOperator(val) && !isBracket(val) && isNaN(val)) {
        throw  `Undefined character,'${val}'. please check the formula.`
      }
      if (val === '') continue // よくわからん原因で空白が出るのでとりまcontinue
      if (!isOperator(val) && !isBracket(val)) { // もしも数値なら
        res.push(val) // とりまAdo
        if (stock.length) res.push(stock.pop()) // 演算子がスタックされてたらそれをresにpush
      } else if (isOperator(val)) { // 演算子なら
        if (!stock.length && !res.length && val === '-') {
          const num = valList.slice(i, valList.length).join('')
          res.push(num)
          break
        }
        // 優先度による調整
        if (flag && importantceNum(val) > importantceNum(res[res.length - 1])) stock.push(res.pop())
        flag = true
        stock.push(val) // Ado
      } else if (isBracket(val)) { // 丸括弧なら
        const startIndex = i + 1 // 切り取り開始をするindex
        let nestCount = 0 // 丸括弧のネストの数
        let endIndex = 0 // 切り取り終了をするindex(ただしそのindexは含まない)
        for (let j = i; j < valList.length; j++) { // ネストを考慮して最後の丸括弧までを探す
          if (valList[j] === '(') nestCount++
          if (valList[j] === ')') nestCount--
          if (nestCount === 0) {
            endIndex = j
            break
          }
          if (j + 1 === valList.length) { // カッコが閉じられてない場合
            endIndex = j + 1
            break
          }
        }
        const subFormula = valList.slice(startIndex, endIndex).join('') // 丸括弧内の文字列を取得
        res.push(...this.convertToRPN(subFormula)) // 丸括弧内の計算式を逆ポーランドに変換
        if (stock.length) res.push(stock.pop()) // 演算子がスタックされてたらそれをresにpush
         i = endIndex // ショートカット。ついでに俺はボブ派
      }
    }
    // 薙ぎ払え！！(スタックされてる演算子をresにpushの訳)
    stock.forEach(i => res.push(i))
    this.rpnArr = res
    return res
  }
  /**
   * 逆ポーランド記法の計算を行う関数
   * @returns {number} 計算結果
   */
  rpnCalc () {
    this.convertVariable()
    let stack = []
    this.rpnArr.forEach(val => {
      if (!isOperator(val)) stack.push(val)
      else stack.push(calc(val, Number(stack.pop()), Number(stack.pop())))
    })
    return stack[0]
  }

  /**
   * 数式中に変数が存在するかどうか
   * 
   * whether the formula is in variables or not.
   * 
   * @return {boolean} 存在するか
   */
  isInVariableListInFormula () {
    for (let i = 0; i < this.rpnArr.length; i++) {
      for (let k = 0; k < this.variableList.length; k++) {
        if (this.rpnArr[i] === this.variableList[k].name) return true
      }
    }
    return false
  }
  /**
   * 逆ポーランド記法に変換した配列をセットする
   * 
   * set a array converted by RPN
   * 
   * @param {string} formula 計算式
   */
  setRpnArr (formula) {
    this.rpnArr = formatReversePolishNonation(formula)
  }
  /**
   * 
   */
  isBecomeVariable (variable) {
    return !isOperator(variable) && !isBracket(variable) && this.isTrueVariableName(variable)
  }
  /**
   * すでに変数を格納している配列に格納されているかどうか
   * 
   * is already value inputed in a variable array.
   * 
   * @param {string} name 変数名
   * @return {boolean} 存在するかどうか
   */
  isInVariableList (name) {
    let res = false
    for (let i = 0; i < this.variableList.length; i++) {
      if (this.variableList[i].name === name) {
        res = true
        break
      }
    }
    return res
  }
  /**
   * 変数の書式が正しいかどうか
   * 
   * whether the format of the variable is correct or not
   * 
   * @param {string} name 変数名
   * @return {boolean} 正しいかどうか
   */
  isTrueVariableName (name) {
    const func = (name) => {
      for (let i = 0; i < name.length; i++) {
        const val = name.substring(i, i + 1)
        if (isOperator(val) || isBracket(val)) return true
      }
      return false
    }
    return !(!isNaN(name) || name.length > 20 || this.isInVariableList(name) || func(name))
  }
  /**
   * 新しい変数を追加する
   * 
   * add a new variable
   * 
   * @param {string} name 変数名
   * @param {number} value 初期値
   */
  crateVariable (name, value) {
    const isTrueFormat = this.isTrueVariableName(name) // 変数名が正しい形式かどうか
    if (isTrueFormat) {
      this.variableList.push({
        name: name,
        value: Number(value),
        isDefalut: false
      })
    } else {
      throw `The variable name "${name}" is not in the correct format.`
    }
  }
  /**
   * 既存の変数かどうかを判定する
   * 
   * Judge whether a variable is default or not.
   * 
   * @param {string} name 変数名
   * @return {boolean} デフォルトかどうか
   */
  isDefaultVariable (name) {
    return this.variableList.find(item => item.name === name && item.isDefalut) !== undefined
  }
  /**
   * 既存の変数を削除する
   * 
   * remove a variable
   * 
   * @param {string} name 変数名
   */
  removeVariable (name) {
    this.variableList = this.variableList.filter(item => item.name !== name || item.isDefalut)
  }
  /**
   * 既存の変数を変更する
   * 
   * change a variable's value
   */
  changeVariable (name, value) {
    this.variableList.forEach(item => {
      if (item.name === name) item.value = Number(value)
    })
  }
  /**
   * RPNの配列にある変数名を数値に置き換える
   * 
   * Replace variables in a RPN array with values.
   * 
   */
  convertVariable () {
    for (let i = 0; i < this.rpnArr.length; i++) {
      for (let k = 0; k < this.variableList.length; k++) {
        if (this.rpnArr[i] === this.variableList[k].name) {
          this.rpnArr[i] = this.variableList[k].value
          break
        }
      }
    }
  }
}