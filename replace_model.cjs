const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(/gemini-3\.5-flash/g, 'gemini-2.0-flash');
fs.writeFileSync('server.ts', code);
