var __readline = require('readline-sync')
__readline.setDefaultOptions({ prompt: '' })
var readline = __readline.prompt
var line = parseInt(readline())
for (let i = 0; i < line; i++) {
  var num = parseInt(readline())
  test(num)
}
function test(num) {
  var arr = num.toString(2)
  var res = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == '1') res.push(i + 1)
  }
  console.log(res.length)
  console.log(res)
}
