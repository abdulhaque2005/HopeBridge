const fs = require('fs');
const content = fs.readFileSync('src/lib/i18n.ts', 'utf8');
const lines = content.split('\n');

// Find all language sections and check for duplicate keys
const sections = ['hi', 'gu', 'ur'];
for (const section of sections) {
  const sectionStart = lines.findIndex(l => l.trim().startsWith(section + ':') || l.trim().startsWith(section + ' :'));
  if (sectionStart < 0) continue;
  
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
  
  console.log(`\n=== Section "${section}" (lines ${sectionStart+1} to ${sectionEnd+1}) ===`);
  
  const keys = {};
  const dupes = [];
  for (let i = sectionStart; i <= sectionEnd; i++) {
    const line = lines[i];
    // Match keys like "key": or key:
    const match = line.match(/^\s+["']?([^"':]+)["']?\s*:/);
    if (match) {
      const key = match[1].trim();
      if (keys[key]) {
        dupes.push({ key, firstLine: keys[key], dupeLine: i + 1 });
        console.log(`DUPLICATE at line ${i+1}: "${key}" (first at line ${keys[key]})`);
      } else {
        keys[key] = i + 1;
      }
    }
  }
  if (dupes.length === 0) console.log('No duplicates found.');
}
