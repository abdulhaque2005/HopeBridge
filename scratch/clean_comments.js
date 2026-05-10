import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const srcDir = 'src';

walk(srcDir, (filePath) => {
  if (filePath.endsWith('.ts') || filePath.endsWith('.tsx') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove block comments
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Remove single line comments, but be careful with URLs
    // This regex looks for // that is NOT preceded by http: or https:
    content = content.replace(/(?<!https?:)\/\/.*/g, '');
    
    // Remove empty lines created by comment removal
    content = content.replace(/^\s*[\r\n]/gm, '');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned: ${filePath}`);
  }
});
