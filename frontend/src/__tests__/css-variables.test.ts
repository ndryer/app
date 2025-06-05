import fs from 'fs';
import path from 'path';

describe('CSS Variables', () => {
  let cssContent: string;
  let isCompiledCss: boolean = false;

  beforeAll(() => {
    try {
      // First try to find the compiled CSS file
      const buildCssDir = path.resolve(__dirname, '../../build/static/css');

      if (fs.existsSync(buildCssDir)) {
        const cssFiles = fs
          .readdirSync(buildCssDir)
          .filter(file => file.startsWith('main.') && file.endsWith('.css'));

        if (cssFiles.length > 0) {
          // Read the compiled CSS file
          cssContent = fs.readFileSync(
            path.resolve(buildCssDir, cssFiles[0]),
            'utf8'
          );
          isCompiledCss = true;
          console.log('Testing with compiled CSS file:', cssFiles[0]);
        }
      }
    } catch (error) {
      console.log('Compiled CSS not found, will fall back to source CSS');
    }

    // If compiled CSS is not available, fall back to the source CSS file
    if (!cssContent) {
      try {
        const sourceCssPath = path.resolve(__dirname, '../index.css');
        if (fs.existsSync(sourceCssPath)) {
          cssContent = fs.readFileSync(sourceCssPath, 'utf8');
          console.log('Testing with source CSS file: index.css');
        } else {
          throw new Error('Source CSS file not found');
        }
      } catch (error) {
        console.error('Error reading CSS files:', error);
        throw new Error('Neither compiled nor source CSS files could be found');
      }
    }
  });

  it('should contain the --space-component variable with value 24px', () => {
    // Check if the CSS contains the --space-component variable with the correct value
    expect(cssContent).toMatch(/--space-component:\s*24px/);
  });

  it('should contain the --space-section variable with value 64px', () => {
    // Check if the CSS contains the --space-section variable with the correct value
    expect(cssContent).toMatch(/--space-section:\s*64px/);
  });

  it('should include both spacing variables in the :root selector', () => {
    // Verify that the variables are defined within a :root selector
    const rootRegex =
      /:root\s*{[^}]*--space-component:[^}]*--space-section:[^}]*}|:root\s*{[^}]*--space-section:[^}]*--space-component:[^}]*}/;
    expect(cssContent).toMatch(rootRegex);
  });

  // Additional test to verify which CSS file was used
  it('should log which CSS file was used for testing', () => {
    console.log(
      `Testing with ${isCompiledCss ? 'compiled' : 'source'} CSS file`
    );
    // This is just an informational test that always passes
    expect(true).toBe(true);
  });
});
