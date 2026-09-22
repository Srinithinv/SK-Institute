const fs = require('fs');
const path = require('path');

const components = [
  'src/components/sections/AboutFounder.tsx',
  'src/components/sections/AboutInstitute.tsx',
  'src/components/sections/CourseDiscovery.tsx',
  'src/components/sections/Testimonials.tsx',
  'src/components/sections/VideoGallery.tsx',
  'src/components/sections/VideoReviews.tsx',
  'src/pages/CoursesPage.tsx'
];

components.forEach(file => {
  const filePath = path.join(__dirname, '../frontend', file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Only process if it hasn't been processed yet
  if (content.includes('import dbData from')) return;

  // Calculate relative path to data/db.json
  const depth = file.split('/').length - 2;
  const relativePath = '../'.repeat(depth) + 'data/db.json';
  
  // Add import statement after other imports
  const lastImportIndex = content.lastIndexOf('import ');
  const insertIndex = content.indexOf('\n', lastImportIndex) + 1;
  content = content.slice(0, insertIndex) + `import dbData from '${relativePath}';\n` + content.slice(insertIndex);

  // Replace fetches
  // Instead of fetching from API, we resolve the promise with our static data
  content = content.replace(/fetch\([^\)]*\/api\/content\/(.*?)[`']\)/g, (match, endpoint) => {
    // Determine the key based on endpoint
    const key = endpoint.replace(/['"`$]/g, '');
    return `Promise.resolve({ ok: true, json: () => Promise.resolve(dbData['${key}']) })`;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file} to use static data.`);
});
