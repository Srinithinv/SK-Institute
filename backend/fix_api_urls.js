const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, '../frontend/src'));
let updatedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('http://localhost:5000')) {
        // Handle single quotes
        content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, "`\\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}$1`");
        // Handle backticks
        content = content.replace(/`http:\/\/localhost:5000([^`]*)`/g, "`\\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}$1`");
        
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
        updatedCount++;
    }
});

console.log(`Finished updating ${updatedCount} files.`);
