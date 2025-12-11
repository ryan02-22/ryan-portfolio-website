#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');

const inputFile = path.join(__dirname, 'src', 'input.css');
const outputDir = path.join(__dirname, 'dist');
const outputFile = path.join(outputDir, 'styles.css');

// Ensure dist directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read input CSS
const inputCSS = fs.readFileSync(inputFile, 'utf-8');

// Process with Tailwind PostCSS
const plugins = [
  tailwindcss()
];

postcss(plugins)
  .process(inputCSS, { from: inputFile, to: outputFile })
  .then((result) => {
    // Write output
    fs.writeFileSync(outputFile, result.css);
    
    if (result.map) {
      fs.writeFileSync(outputFile + '.map', result.map);
    }
    
    console.log(`✓ Tailwind CSS built successfully!`);
    console.log(`  Output: ${outputFile}`);
  })
  .catch((error) => {
    console.error('Error building Tailwind CSS:');
    console.error(error);
    process.exit(1);
  });
