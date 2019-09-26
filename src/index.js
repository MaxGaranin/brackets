module.exports = function check(str, bracketsConfig) {
  let beginBrackets = [];
  let endBrackets = [];
  let endToBeginMap = {};
  let equalBrackets = [];

  bracketsConfig.forEach(cfg => {
    let beginBr = cfg[0];
    let endBr = cfg[1];

    beginBrackets.push(beginBr);
    endBrackets.push(endBr);
    endToBeginMap[endBr] = beginBr;

    if (beginBr === endBr) {
      equalBrackets.push(beginBr);
    }
  });

  let stack = [];
 
  for (const ch of str) {
    let isFoundEqualBr = false;
    if (equalBrackets.indexOf(ch) >= 0) {
      isFoundEqualBr = true;
    }

    if (beginBrackets.indexOf(ch) >= 0) {
      if (isFoundEqualBr && stack.length > 0) {
        var br = stack[stack.length - 1];
        if (br == ch) {
          stack.pop();
        }
        else {
          stack.push(ch);
        }
      }
      else {
        stack.push(ch);
      }
    }
    else if (endBrackets.indexOf(ch) >= 0) {
      if (stack.length == 0) return false;

      let br = stack.pop();
      if (endToBeginMap[ch] != br) {
        return false;
      }
    }
    else {
      continue;
    }
  }

  return stack.length == 0;
}
