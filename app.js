const express = require('express')
const app = express()

app.use(express.static(__dirname));

app.get(/^\/tree\/(\d+)\/(\d+)\/(\d+)/, function (req, res) {
  var match = req.path.match(/^\/tree((\/\d+)+)/)

  var pieces = match[1].split('/');
  var depth = parseInt(pieces[1], 10);
  var branchingFactor = parseInt(pieces[2], 10);
  var currentDepth = pieces.length - 4;

  var out;
  if (currentDepth >= depth) {
    out = "";
  } else {
    var outPieces = [];
    outPieces.push("define(function(require) {");
    for (var i = 0; i < branchingFactor; i++) {
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
