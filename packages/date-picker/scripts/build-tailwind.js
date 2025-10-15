const fs = require('fs');
const path = require('path');
const postcss = require('postcss');

// Try to require tailwind and autoprefixer from workspace
let tailwindPostcss;
let autoprefixer;
try {
  // use the dedicated Tailwind PostCSS plugin package
  tailwindPostcss = require('@tailwindcss/postcss');
  autoprefixer = require('autoprefixer');
} catch (err) {
  console.error(
    'Could not find @tailwindcss/postcss and/or autoprefixer in node_modules. Please install them.'
  );
  console.error(err);
  process.exit(1);
}

const inputPath = path.resolve(
  __dirname,
  '..',
  'src',
  'styles',
  'tailwind.css'
);
const outDir = path.resolve(__dirname, '..', 'dist');
const outPath = path.resolve(outDir, 'styles.css');

(async () => {
  try {
    const css = fs.readFileSync(inputPath, 'utf8');
    const processor = postcss([tailwindPostcss, autoprefixer]);
    const result = await processor.process(css, {
      from: inputPath,
      to: outPath,
      map: false,
    });

    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, result.css, 'utf8');
    console.log('Built CSS to', outPath);

    // Create runtime injector modules (CJS + ESM) that insert the CSS into
    // document.head when running in the browser. This avoids importing CSS
    // files directly (which Next may block for global CSS) and lets the
    // package auto-inject styles on first import.
    const cssEscaped = JSON.stringify(result.css);

    const injectorCjs = `if (typeof document !== 'undefined') {\n  if (!document.getElementById('reacto-kit-date-picker-styles')) {\n    const css = ${cssEscaped};\n    const s = document.createElement('style');\n    s.id = 'reacto-kit-date-picker-styles';\n    s.appendChild(document.createTextNode(css));\n    document.head.appendChild(s);\n  }\n}\n`;

    const injectorEsm = `if (typeof document !== 'undefined') {\n  if (!document.getElementById('reacto-kit-date-picker-styles')) {\n    const css = ${cssEscaped};\n    const s = document.createElement('style');\n    s.id = 'reacto-kit-date-picker-styles';\n    s.appendChild(document.createTextNode(css));\n    document.head.appendChild(s);\n  }\n}\nexport default {};\n`;

    fs.writeFileSync(
      path.resolve(outDir, 'styles-inject.js'),
      injectorCjs,
      'utf8'
    );
    fs.writeFileSync(
      path.resolve(outDir, 'styles-inject.mjs'),
      injectorEsm,
      'utf8'
    );

    // Create wrapper modules that import the injector (not the raw CSS)
    // so that importing the package will run the injector at runtime.
    const cjsWrapper = `require('./styles-inject.js');\nmodule.exports = require('./index.js');\n`;
    const esmWrapper = `import './styles-inject.mjs';\nexport * from './index.js';\nexport { default } from './index.js';\n`;
    fs.writeFileSync(
      path.resolve(outDir, 'index-with-css.js'),
      cjsWrapper,
      'utf8'
    );
    fs.writeFileSync(
      path.resolve(outDir, 'index-with-css.mjs'),
      esmWrapper,
      'utf8'
    );
    console.log('Wrote index-with-css wrappers and injector modules');
  } catch (err) {
    console.error('Error building tailwind CSS:');
    console.error(err);
    process.exit(1);
  }
})();
