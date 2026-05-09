import fs from 'fs';
import path from 'path';

const file = path.resolve(process.cwd(), 'src/App.tsx');
let content = fs.readFileSync(file, 'utf8');

// The line is:                            {synthesisMessage.text}
// We will replace it with the new component.

const newLine = `                            <div className="flex flex-col items-center gap-2">
                              {synthesisMessage.type === 'plus' && <PlusCircle size={32} />}
                              {synthesisMessage.type === 'minus' && <MinusCircle size={32} />}
                              {synthesisMessage.type === 'buff' && <Zap size={32} />}
                              <span className="text-xl font-black">{synthesisMessage.text}</span>
                            </div>`;

// Use a regex that matches optional whitespace, then the text
content = content.replace(/\s*\{synthesisMessage\.text\}/, newLine);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed synthesis modal via script.');
