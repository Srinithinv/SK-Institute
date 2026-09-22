const fs = require('fs');
const path = require('path');
const db = require('./db');

const coursesDir = path.join(__dirname, '../frontend/public/courses');

// A nice palette of vibrant gradients
const gradients = [
  ['#4158D0', '#C850C0'], // Purple/Pink
  ['#0093E9', '#80D0C7'], // Blue/Cyan
  ['#8EC5FC', '#E0C3FC'], // Light Blue/Purple
  ['#D9AFD9', '#97D9E1'], // Soft Pink/Blue
  ['#00DBDE', '#FC00FF'], // Cyan/Magenta
  ['#FBAB7E', '#F7CE68'], // Orange/Yellow
  ['#85FFBD', '#FFFB7D'], // Green/Yellow
  ['#FF9A9E', '#FECFEF'], // Rose
  ['#a18cd1', '#fbc2eb'], // Lavender
  ['#ff9a9e', '#fecfef'], // Peach
  ['#84fab0', '#8fd3f4'], // Mint
  ['#fccb90', '#d57eeb'], // Sunset
  ['#e0c3fc', '#8ec5fc'], // Cool Blue
];

// Hash function to pick a deterministic gradient
function getGradient(title) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

function createSVG(title, color1, color2) {
  // Wrap text if it's too long
  const words = title.split(' ');
  let line1 = title;
  let line2 = '';
  if (words.length > 3) {
    line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
    line2 = words.slice(Math.ceil(words.length / 2)).join(' ');
  }

  const textElement = line2 
    ? `<text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="42" font-weight="800" fill="white" style="text-shadow: 0px 4px 12px rgba(0,0,0,0.15)">${line1}</text>
       <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="42" font-weight="800" fill="white" style="text-shadow: 0px 4px 12px rgba(0,0,0,0.15)">${line2}</text>`
    : `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="42" font-weight="800" fill="white" style="text-shadow: 0px 4px 12px rgba(0,0,0,0.15)">${line1}</text>`;

  return `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad_${color1.replace('#','')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
    </linearGradient>
    <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="1.5" fill="rgba(255,255,255,0.1)"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad_${color1.replace('#','')})" />
  <rect width="100%" height="100%" fill="url(#pattern)" />
  ${textElement}
</svg>
  `.trim();
}

async function generateAllImages() {
  const res = await db.query('SELECT id, title FROM content_courses');
  
  for (let row of res.rows) {
    const [c1, c2] = getGradient(row.title);
    const svgContent = createSVG(row.title, c1, c2);
    
    // We create a unique file for every single course
    // But format the filename safely
    const safeTitle = row.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `course-${row.id}-${safeTitle}.svg`;
    const filepath = path.join(coursesDir, filename);
    
    fs.writeFileSync(filepath, svgContent);
    
    // Update DB
    await db.query('UPDATE content_courses SET image_url = $1 WHERE id = $2', [`/courses/${filename}`, row.id]);
  }
  
  console.log(`Generated completely unique gradient images for all ${res.rowCount} courses!`);
  process.exit(0);
}

generateAllImages();
