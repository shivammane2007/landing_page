const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix relative imports pointing to ui components from the old components root
  content = content.replace(/from\s+['"]\.\/ui\/(.*?)['"]/g, 'from "@/components/ui/$1"');
  
  // Fix relative imports to hooks
  content = content.replace(/from\s+['"]\.\.\/hooks\/(.*?)['"]/g, 'from "@/hooks/$1"');
  content = content.replace(/from\s+['"]\.\/hooks\/(.*?)['"]/g, 'from "@/hooks/$1"');

  // Specific misses from the first pass
  content = content.replace(/@\/components\/ui\/providers/g, '@/components/layout/Providers');
  content = content.replace(/@\/components\/Providers/g, '@/components/layout/Providers');
  content = content.replace(/@\/src\/components\/ContentBlocks\/StatsSections\/tsx\/StatsClay/g, '@/components/blocks/stats/StatsClay');

  // Fix app/layout.tsx which probably imports providers
  // The original import in layout.tsx might have been `@/components/Providers` or `@/components/ui/providers` (if it was mistaken for ui)
  // Let's replace any `from "@/components/Providers"` to `from "@/components/layout/Providers"`
  // Already covered by the first pass if it was exactly `@/components/Providers`, but maybe it was `./components/Providers`?
  content = content.replace(/from\s+['"]\.\/components\/Providers['"]/g, 'from "@/components/layout/Providers"');
  content = content.replace(/from\s+['"]@\/components\/ui\/providers['"]/g, 'from "@/components/layout/Providers"');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed relative imports in ${filePath}`);
  }
}

function traverse(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      fixFile(fullPath);
    }
  });
}

traverse(path.join(process.cwd(), 'src'));
