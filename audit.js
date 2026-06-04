const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Gather all files
function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        getAllFiles(filePath, fileList);
      }
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const srcFiles = getAllFiles(path.join(process.cwd(), 'src'));
const publicFiles = getAllFiles(path.join(process.cwd(), 'public'));

const allProjectFiles = [...srcFiles];

// 2. Scan all src files to build a massive text corpus to search against
let allSrcContent = '';
for (const file of srcFiles) {
  if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.js') || file.endsWith('.jsx')) {
    allSrcContent += fs.readFileSync(file, 'utf8') + '\n';
  }
}

// 3. Find Unused Public Assets
console.log('--- PUBLIC FOLDER AUDIT ---');
const unusedPublic = [];
for (const file of publicFiles) {
  // Ignore root level config files if necessary, but public/ usually has robots.txt, etc.
  const relativePath = path.relative(path.join(process.cwd(), 'public'), file).replace(/\\/g, '/');
  
  if (['favicon.ico', 'favicon.svg', 'robots.txt', 'site.webmanifest', 'opengraph-image.png', 'twitter-image.png', 'apple-touch-icon.png'].includes(relativePath)) {
    console.log(`[KEEP - SEO/Config] ${relativePath}`);
    continue;
  }

  // Check if file name is referenced anywhere
  const fileName = path.basename(file);
  const regex = new RegExp(fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  
  if (!regex.test(allSrcContent)) {
    unusedPublic.push(relativePath);
  }
}

console.log(`Found ${unusedPublic.length} unused public assets.`);
unusedPublic.forEach(p => console.log(`[UNUSED] public/${p}`));

// 4. Find Unused Components
console.log('\n--- COMPONENT AUDIT ---');
const componentsDir = path.join(process.cwd(), 'src', 'components');
const allComponents = srcFiles.filter(f => f.startsWith(componentsDir) && (f.endsWith('.tsx') || f.endsWith('.ts')));

const unusedComponents = [];
for (const comp of allComponents) {
  const relativePath = path.relative(componentsDir, comp).replace(/\\/g, '/');
  // Check if file name without extension is imported
  const baseName = path.parse(comp).name;
  
  if (baseName === 'index' || baseName === 'page' || baseName === 'layout') continue;
  
  // Look for import baseName or /baseName
  const regex1 = new RegExp(`import.*${baseName}`, 'i');
  const regex2 = new RegExp(`/${baseName}['"]`, 'i');
  
  if (!regex1.test(allSrcContent) && !regex2.test(allSrcContent)) {
    unusedComponents.push(relativePath);
  }
}

console.log(`Found ${unusedComponents.length} potentially unused components.`);
unusedComponents.forEach(c => console.log(`[UNUSED?] src/components/${c}`));

