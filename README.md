# CoaCa.js :<br>Convert and Calculate by RPN

<div align="center">
  <a href="./DOC/ドキュメント.md">
    ドキュメント(日本語)
  </a>
</div>

## Attention!
I do not understand English perfectly, so I sometimes use translating application, 'deepl'. But I may make mistakes, so if you realize my mistake, please tell me!

## Todo(Japanese)
- [ ] 英語への対応
- [ ] 三角関数、階乗などに対応
- [ ] 対数のルールに従う
- [ ] カッコの終わりがなかった場合自動的に式の一番最後に追加


## What's CoaCa.js?
This is the library can convert Infix Notation with Reverse Polish Notation(RPN) and calculate by RPN.

## Usage
It follow an object-oriented approach.

### Script tag
```html
<script src="script.js" type="module"></script>
```

### Import
```js
import * as CoacaModule from './modules/coaca.js'
```

### Instantiate
```js
const coacaClass = new CoacaModule.Coaca()
```

### Set formula
```js
coacaClass.setFormula(val)
```

### Convert to RPN
```js
coacaClass.convertToRPN()
```

### Calculate
```js
const res = coacaClass.rpnCalc()
```

### About "variable"
※The term "variable" here has a mathematical connotation.

#### Rule
- Do not use only number
- The maximum number of characters is 20.
- Do not remove and change value default variable.

If you do not protect this rule, The program throws errors.

#### Default variable
This library support default variable.
- pie : pi (Math.PI)
- e : Napier number (Math.E)

#### Create and set
```js
coacaClass.createVariable('x', 10)
```
If set same one of variables already setting, the method throw a error.

#### Changes the value of the variable
```js
coacaClass.changeVariable('x', 50)
```

#### Removes the variable
```js
coacaClass.removeVariable('x')
```


#### Usage
```js
const formula = '3*(1+x)'
const coacaClass = new CoacaModule.Coaca()
coacaClass.createVariable('x', 9)
coacaClass.setFormula(formula)
coacaClass.convertToRPN()
const res = coacaClass.rpnCalc()
console.log(res) // 30
```

## About formula
This library use original operators. Show operators using.
- \+ : addition
- \- : subtraction
- \* : multiplication
- / : division
- ^ : raising a number to a power
- _ : logarithmic calculation


### Usage
```js
// It is same '(log[2](2^3))*2-6'
((2^3)_2)*2-6 // result: 0
```

## Example
### Heron's formula
```js
import * as CoacaModule from './modules/coaca.js'

const variableList = {
  a: 15,
  b: 13,
  c: 14
}

const setVariable =  (classVal, variableList) => {
  const resClass = classVal
  for (const key in variableList) {
    resClass.createVariable(key, variableList[key])
  }
  return resClass
}

/* Find the variable s */
let coacaClassS = new CoacaModule.Coaca()
coacaClassS = setVariable(coacaClassS, variableList) // set variables
coacaClassS.setFormula('(a+b+c)/2') // set a formula
coacaClassS.convertToRPN()
variableList.s = coacaClassS.rpnCalc() // set a variable, 's'

/* Find a result */
let coacaClassR = new CoacaModule.Coaca()
const formula = '(s*(s-a)*(s-b)*(s-c))^(1/2)'
coacaClassR = setVariable(coacaClassR, variableList)
coacaClassR.setFormula(formula)
coacaClassR.convertToRPN()
const res = coacaClassR.rpnCalc()
console.log(res) // res : 84

```

Tips: If you want to use square root, you write '^(1/2)'.