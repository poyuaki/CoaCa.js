# CaCRPN.js : Convert and Calculate by RPN

<div style="text-align: center">
  <a href="./DOC/ドキュメント.md">
    ドキュメント(日本語)
  </a>
</div>

## Attention!
I do not understand English perfectly, so I sometimes use translating application, 'deepl'. But I may make mistakes, so if you realize my mistake, please tell me!

## What's CaCRPN.js?
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

### Calculate
```js
const res = rpnClass.calcByInput(formula)
```
The method responses this data.
```json
{
  value: result value,
  rpn: the formula converted by RPN
  measure: calculate time
}
```
If you want to get only result value, you should write this.
```js
const resVal = rpnClass.calcByInput(formula).value
```
In my opinion, you must store the result in the variable.

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

#### Change value
```js
rpnClass.changeVariable('x', 50)
```

#### Remove value
```js
rpnClass.removeVariable('x')
```


#### Usage
```js
const formula = '3*(1+x)'

const rpnClass = new calcModule.CalcRPN()
rpnClass.createVariable('x', 9)
const res = rpnClass.calcByInput(formula)
console.log(res.value) // 30
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
// It is same '(log[2]2^3)*2-6'
((2^3)_2)*2-6 // result: 0
```