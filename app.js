const express = require('express')
const app = express()

app.use(express.static(__dirname));

function generalParseInt(digits, radix) {
  // Apparently, parseInt is limited to radix 2-36
  var total = 0;
  for (var i = 0; i < digits.length; i++) {
    total *= radix;
    total += parseInt(digits[i], 10);
  }
  return total;
}

function index(branchingFactor, digits) {
  var depth = digits.length - 1; // Expect leading digit to be 0
  if (depth === 0) return 1;
  if (branchingFactor === 1) return depth + 1;
  var offset = 1 + (Math.pow(branchingFactor, depth) - 1) / (branchingFactor - 1);
  return offset + generalParseInt(digits, branchingFactor);
}

app.get(/^\/tree\/(\d+)\/(\d+)\/(\d+)/, function (req, res) {
  var match = req.path.match(/^\/tree((\/\d+)+)/)

  var pieces = match[1].split('/');
  var numFiles = parseInt(pieces[1], 10);
  var branchingFactor = parseInt(pieces[2], 10);
  var digits = pieces.slice(3);

  var out;
  if (index(branchingFactor, digits) > numFiles) {
    out = "";
  } else {
    var outPieces = [];
    outPieces.push("define(function(require) {");
    for (var i = 0; i < branchingFactor && index(branchingFactor, digits.concat(i)) <= numFiles; i++) {
      outPieces.push("  require('tree" + match[1] + '/' + i + "');");
    }
    outPieces.push("});");
    out = outPieces.join("\n");
  }

  res.set({
    'Content-Type': 'application/javascript',
  });

  res.send(out);
});

app.listen(8001, function () {
  console.log('Example app listening on port 8001!')
})
