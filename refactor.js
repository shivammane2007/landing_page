const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

// 1. Move Components
const moves = [
  // Layout
  { from: 'src/components/Navbar.tsx', to: 'src/components/layout/Navbar.tsx' },
  { from: 'src/components/Footer.tsx', to: 'src/components/layout/Footer.tsx' },
  { from: 'src/components/Providers.tsx', to: 'src/components/layout/Providers.tsx' },
  { from: 'src/components/ScrollProgress.tsx', to: 'src/components/layout/ScrollProgress.tsx' },
  { from: 'src/components/CommandMenu.tsx', to: 'src/components/layout/CommandMenu.tsx' },
  
  // Sections
  { from: 'src/components/Hero.tsx', to: 'src/components/sections/Hero.tsx' },
  { from: 'src/components/Trust.tsx', to: 'src/components/sections/Trust.tsx' },
  { from: 'src/components/ProductShowcase.tsx', to: 'src/components/sections/ProductShowcase.tsx' },
  { from: 'src/components/Technology.tsx', to: 'src/components/sections/Technology.tsx' },
  { from: 'src/components/Testimonials.tsx', to: 'src/components/sections/Testimonials.tsx' },
  { from: 'src/components/Pricing.tsx', to: 'src/components/sections/Pricing.tsx' },
  { from: 'src/components/FAQ.tsx', to: 'src/components/sections/FAQ.tsx' },
  { from: 'src/components/CaseStudies.tsx', to: 'src/components/sections/CaseStudies.tsx' },
  { from: 'src/components/FinalCTA.tsx', to: 'src/components/sections/ContactCTA.tsx' },
  { from: 'src/components/Features.tsx', to: 'src/components/sections/Features.tsx' },
  { from: 'src/components/HowItWorks.tsx', to: 'src/components/sections/HowItWorks.tsx' },
  { from: 'src/components/Impact.tsx', to: 'src/components/sections/Impact.tsx' },
  { from: 'src/components/FAQMarquee.tsx', to: 'src/components/sections/FAQMarquee.tsx' },
  
  // Navigation
  { from: 'src/components/PillNav.tsx', to: 'src/components/navigation/PillNav.tsx' },
  { from: 'src/components/PillNav.css', to: 'src/components/navigation/PillNav.css' },
  { from: 'src/components/FloatingProgressNav.tsx', to: 'src/components/navigation/FloatingProgressNav.tsx' },
  { from: 'src/components/ExploreMenu.tsx', to: 'src/components/navigation/ExploreMenu.tsx' },
  { from: 'src/components/FlowingMenu.tsx', to: 'src/components/navigation/FlowingMenu.tsx' },
  { from: 'src/components/FlowingMenu.css', to: 'src/components/navigation/FlowingMenu.css' },
  
  // Animations
  { from: 'src/components/Shuffle.tsx', to: 'src/components/animations/Shuffle.tsx' },
  { from: 'src/components/Shuffle.css', to: 'src/components/animations/Shuffle.css' },
  { from: 'src/components/CardSwap.tsx', to: 'src/components/animations/CardSwap.tsx' },
  { from: 'src/components/CardSwap.css', to: 'src/components/animations/CardSwap.css' },
  { from: 'src/components/CircularText.tsx', to: 'src/components/animations/CircularText.tsx' },
  { from: 'src/components/CircularText.css', to: 'src/components/animations/CircularText.css' },
  
  // Blocks
  { from: 'src/components/blocks/gallery4.tsx', to: 'src/components/blocks/gallery/gallery4.tsx' },
  { from: 'src/components/blocks/gallery4-demo.tsx', to: 'src/components/blocks/gallery/gallery4-demo.tsx' },
  { from: 'src/components/ContentBlocks/StatsSections/tsx/StatsClay.tsx', to: 'src/components/blocks/stats/StatsClay.tsx' },
  
  // Lib & Utils
  { from: 'src/lib/utils/counter.tsx', to: 'src/utils/counter.tsx' },
  { from: 'src/lib/utils.ts', to: 'src/utils/utils.ts' }
];

// Perform moves
console.log('Moving files...');
moves.forEach(move => {
  const source = path.join(cwd, move.from);
  const dest = path.join(cwd, move.to);
  if (fs.existsSync(source)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(source, dest);
    console.log(`Moved ${move.from} -> ${move.to}`);
  } else {
    console.log(`File not found: ${move.from}`);
  }
});

// Remove empty directory ContentBlocks
const contentBlocksPath = path.join(cwd, 'src/components/ContentBlocks');
if (fs.existsSync(contentBlocksPath)) {
  fs.rmSync(contentBlocksPath, { recursive: true, force: true });
}

// Move Public Assets
console.log('Moving public assets...');
const publicDir = path.join(cwd, 'public');
const files = fs.readdirSync(publicDir);
files.forEach(file => {
  const fullPath = path.join(publicDir, file);
  if (fs.statSync(fullPath).isFile()) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      fs.renameSync(fullPath, path.join(publicDir, 'images', file));
    } else if (file === 'vercel.svg' || file === 'next.svg') {
      fs.renameSync(fullPath, path.join(publicDir, 'logos', file));
    } else if (file.endsWith('.svg')) {
      fs.renameSync(fullPath, path.join(publicDir, 'icons', file));
    }
  }
});

// Create import update mappings based on moves
const importReplacements = [
  { from: /@\/components\/Navbar/g, to: "@/components/layout/Navbar" },
  { from: /@\/components\/Footer/g, to: "@/components/layout/Footer" },
  { from: /@\/components\/Providers/g, to: "@/components/layout/Providers" },
  { from: /@\/components\/ScrollProgress/g, to: "@/components/layout/ScrollProgress" },
  { from: /@\/components\/CommandMenu/g, to: "@/components/layout/CommandMenu" },
  { from: /@\/components\/Hero/g, to: "@/components/sections/Hero" },
  { from: /@\/components\/Trust/g, to: "@/components/sections/Trust" },
  { from: /@\/components\/ProductShowcase/g, to: "@/components/sections/ProductShowcase" },
  { from: /@\/components\/Technology/g, to: "@/components/sections/Technology" },
  { from: /@\/components\/Testimonials/g, to: "@/components/sections/Testimonials" },
  { from: /@\/components\/Pricing/g, to: "@/components/sections/Pricing" },
  { from: /@\/components\/FAQ/g, to: "@/components/sections/FAQ" },
  { from: /@\/components\/CaseStudies/g, to: "@/components/sections/CaseStudies" },
  { from: /@\/components\/FinalCTA/g, to: "@/components/sections/ContactCTA" },
  { from: /@\/components\/Features/g, to: "@/components/sections/Features" },
  { from: /@\/components\/HowItWorks/g, to: "@/components/sections/HowItWorks" },
  { from: /@\/components\/Impact/g, to: "@/components/sections/Impact" },
  { from: /@\/components\/FAQMarquee/g, to: "@/components/sections/FAQMarquee" },
  { from: /@\/components\/PillNav/g, to: "@/components/navigation/PillNav" },
  { from: /@\/components\/FloatingProgressNav/g, to: "@/components/navigation/FloatingProgressNav" },
  { from: /@\/components\/ExploreMenu/g, to: "@/components/navigation/ExploreMenu" },
  { from: /@\/components\/FlowingMenu/g, to: "@/components/navigation/FlowingMenu" },
  { from: /@\/components\/Shuffle/g, to: "@/components/animations/Shuffle" },
  { from: /@\/components\/CardSwap/g, to: "@/components/animations/CardSwap" },
  { from: /@\/components\/CircularText/g, to: "@/components/animations/CircularText" },
  
  { from: /@\/components\/blocks\/gallery4/g, to: "@/components/blocks/gallery/gallery4" },
  { from: /@\/components\/blocks\/gallery4-demo/g, to: "@/components/blocks/gallery/gallery4-demo" },
  { from: /@\/components\/ContentBlocks\/StatsSections\/tsx\/StatsClay/g, to: "@/components/blocks/stats/StatsClay" },
  { from: /@\/lib\/utils\/counter/g, to: "@/utils/counter" },
  
  { from: /@\/lib\/utils/g, to: "@/utils/utils" },
];

// Re-write file content
function traverseDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      
      // Replace import paths
      importReplacements.forEach(rep => {
        newContent = newContent.replace(rep.from, rep.to);
      });

      newContent = newContent.replace(/from ["'](.*)\/lib\/utils["']/g, 'from "@/utils/utils"');

      // Replace public asset paths
      newContent = newContent.replace(/(\/media__\d+\.png)/g, '/images$1');
      newContent = newContent.replace(/(\/athlete_prosthetic_.*\.png)/g, '/images$1');
      newContent = newContent.replace(/(\/bionic_hand_.*\.png)/g, '/images$1');
      newContent = newContent.replace(/(\/everyday_bionic_.*\.png)/g, '/images$1');
      newContent = newContent.replace(/(\/marathon_runner_.*\.png)/g, '/images$1');
      newContent = newContent.replace(/(\/morning_breakfast_.*\.png)/g, '/images$1');
      newContent = newContent.replace(/(\/robotic_.*\.png)/g, '/images$1');
      newContent = newContent.replace(/(\/surgeon_.*\.png)/g, '/images$1');

      newContent = newContent.replace(/\/file\.svg/g, '/icons/file.svg');
      newContent = newContent.replace(/\/window\.svg/g, '/icons/window.svg');
      newContent = newContent.replace(/\/globe\.svg/g, '/icons/globe.svg');
      
      newContent = newContent.replace(/\/next\.svg/g, '/logos/next.svg');
      newContent = newContent.replace(/\/vercel\.svg/g, '/logos/vercel.svg');

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated imports in ${fullPath}`);
      }
    }
  });
}

console.log('Traversing src/ and updating imports...');
traverseDir(path.join(cwd, 'src'));
console.log('Done.');
