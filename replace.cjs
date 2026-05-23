const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(/gemini-3\.1-flash-lite/g, 'gemini-3.5-flash');
fs.writeFileSync('server.ts', code);
