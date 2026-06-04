const fs = require('fs');

const fixes = [
  {
    file: 'src/app/layout.tsx',
    replacements: [
      { from: /from\s+['"]\.\.\/components\/Providers['"]/g, to: 'from "../components/layout/Providers"' }
    ]
  },
  {
    file: 'src/components/sections/Hero.tsx',
    replacements: [
      { from: /from\s+['"]\.\/CircularText['"]/g, to: 'from "../animations/CircularText"' },
      { from: /from\s+['"]\.\/Shuffle['"]/g, to: 'from "../animations/Shuffle"' }
    ]
  },
  {
    file: 'src/components/layout/Navbar.tsx',
    replacements: [
      { from: /from\s+['"]\.\/PillNav['"]/g, to: 'from "../navigation/PillNav"' }
    ]
  },
  {
    file: 'src/components/blocks/stats/StatsClay.tsx',
    replacements: [
      { from: /from\s+['"]@\/src\/lib\/utils\/counter['"]/g, to: 'from "@/utils/counter"' }
    ]
  }
];

fixes.forEach(fix => {
  let content = fs.readFileSync(fix.file, 'utf8');
  let original = content;
  fix.replacements.forEach(rep => {
    content = content.replace(rep.from, rep.to);
  });
  if (content !== original) {
    fs.writeFileSync(fix.file, content, 'utf8');
    console.log(`Fixed ${fix.file}`);
  }
});
