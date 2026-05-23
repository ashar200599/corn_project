const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(/} else \{\s+resultText = resultText\.replace\(\/```json\/gi, ''\)\.replace\(\/```\/g, ''\)\.trim\(\);\s+\}/g, '} else {\n        resultText = "{}";\n      }');
fs.writeFileSync('server.ts', code);
