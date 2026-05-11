const fs = require('fs');
const content = fs.readFileSync('src/lib/i18n.ts', 'utf8');
const lines = content.split('\n');

// Find each language section and remove duplicate keys
const sections = [
  { name: 'hi', search: '  hi: {' },
  { name: 'gu', search: '  gu: {' },
  { name: 'ur', search: '  ur: {' },
];

const linesToRemove = new Set();

for (const section of sections) {
  const sectionStart = lines.findIndex(l => l.trimEnd() === section.search || l.trim().startsWith(section.name + ': {'));
  if (sectionStart < 0) {
    console.log(`Section "${section.name}" not found, skipping.`);
    continue;
  }
  
  let braceCount = 0;
  let started = false;
  let sectionEnd = -1;
  
  for (let i = sectionStart; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '{') { braceCount++; started = true; }
      if (ch === '}') { braceCount--; if (started && braceCount === 0) { sectionEnd = i; break; } }
    }
    if (sectionEnd >= 0) break;
  }
  
  console.log(`Section "${section.name}": lines ${sectionStart+1} to ${sectionEnd+1}`);
  
  const keys = {};
  for (let i = sectionStart; i <= sectionEnd; i++) {
    const line = lines[i];
    // Match quoted keys like "key": or unquoted keys like key:
    let match = line.match(/^\s+"([^"]+)"\s*:/);
    if (!match) match = line.match(/^\s+(\w+)\s*:/);
    if (match) {
      const key = match[1];
      if (keys[key]) {
        console.log(`  Removing duplicate at line ${i+1}: "${key}"`);
        linesToRemove.add(i);
      } else {
        keys[key] = i + 1;
      }
    }
  }
}

console.log(`\nTotal lines to remove: ${linesToRemove.size}`);

// Build new content without duplicate lines
const newLines = lines.filter((_, i) => !linesToRemove.has(i));
fs.writeFileSync('src/lib/i18n.ts', newLines.join('\n'), 'utf8');
console.log('File updated successfully!');
