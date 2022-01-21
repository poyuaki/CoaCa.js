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
import * as calcModule from './modules/calcRPN.js'
```

### Instantiate
```js
const rpnClass = new calcModule.CalcRPN()
```

### Set formula
```js
rpnClass.setFormula(val)
```

### Convert to RPN
```js
rpnClass.convertToRPN()
```

### Calculate
```js
const res = rpnClass.rpnCalc()
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
rpnClass.crateVariable('x', 10)
```
If set same one of variables already setting, the method throw a error.

#### Changes the value of the variable
```js
rpnClass.changeVariable('x', 50)
```

#### Removes the variable
```js
rpnClass.removeVariable('x')
```


#### Usage
```js
const formula = '3*(1+x)'
const rpnClass = new calcModule.CalcRPN()
rpnClass.createVariable('x', 9)
rpnClass.setFormula(formula)
rpnClass.convertToRPN()
const res = rpnClass.rpnCalc()
console.log(res)
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