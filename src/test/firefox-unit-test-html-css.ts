import { By, WebDriver, Browser, Builder } from 'selenium-webdriver';
import * as assert from 'assert';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';
import * as fs from 'fs';
import * as path from 'path';

enum Category {
  HTML = 'HTML',
  CSS = 'CSS',
  JS = 'JavaScript',
  PARSER = 'Parser'
}
enum SubCategory {
  Colors = 'Colors',
  LightTheme  = 'LightTheme',
  DarkTheme = 'DarkTheme',
  Text = 'Text',
  Size = 'Size',
  Button = 'Button',
  Border = 'Border',
  Value = 'Value',
  CompoInput = 'CompoInput',
  CompoClock = 'CompoClock',
  Radius = 'Radius',
  Footer = 'Footer',
  Nav = 'Nav',
  CompoOutput = 'CompoOutput',
  CompoLUT = 'CompoLUT',
  CompoFlipFlop = 'CompoFlip-Flop',
  Background = 'Background',
  Image = 'Image',
}

enum Priority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

const date: Date = new Date();
const dateString: string = date.toISOString().split(/T/)[0];
const results: { 
  browser: string,
  version: string | undefined,
  test: {
    category: Category,
    subCategory: SubCategory [] | null,
    name: string,
    description: string,
    priority: Priority,
    passed: boolean,
    error?: any
  }
}[] = [];

const logFilePath = path.join(__dirname, 'logs', dateString + '-firefox-unit-test-html-css.json');

const versions = ['116.0', '117.0', '118.0', '119.0', '120.0', '121.0', '122.0', '123.0', '124.0', '125.0.1', '126.0', '127.0', '128.0', '129.0', '130.0', '131.0', '132.0', '133.0', '134.0', '135.0', '136.0'];

(async () => {
  for (const version of versions) {
    let firefoxOptions = new FirefoxOptions().addArguments('--headless').setBrowserVersion(`${version}`);
    await runTests(Browser.FIREFOX, firefoxOptions);
  }
  logResults();
})();

async function runTests(browser: string, options: any) {
  let driver: WebDriver;
  driver = await new Builder().forBrowser(browser).setFirefoxOptions(options).build();

  try {
    await driver.get("https://two024-2025-project-4-web-fpga-team-4.onrender.com/client.html");
    
    // L.2
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the download button", "Ensure the download button functions correctly.", Priority.HIGH, async () => {
      // Testlogic here
    });

    // L.3
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the first step button", "Ensure the first step button functions correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.4
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the hide/show button", "Ensure the hide/show button toggles visibility correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.5  
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the last step button", "Ensure the last step button functions correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.6
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the light/dark button", "Check if theme switch button works correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.7
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the upload button (.json)", "Ensure the upload button correctly processes JSON files.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.8
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the upload button (.random)", "Ensure the upload button correctly processes random files.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.9
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the upload button (.sdf)", "Ensure the upload button correctly processes SDF files.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.10
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the next step button", "Ensure the next step button functions correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.11
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the panel button", "Ensure clicking panel button performs intended action.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.12
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the pause button", "Validate the pause button's functionality.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.13
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the previous step button", "Check if the previous step button works correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.14
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the resume button", "Ensure the resume button resumes the animation correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.15  
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the settings button", "Ensure the settings button opens the settings menu correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.16
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the speed controller button (Plus)", "Ensure that the speed increase works correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.17
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the speed controller button (Minus)", "Ensure that the speed decrease works correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.18
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the zoom button (zoom in)", "Ensure the zoom-in button functions correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.19
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the zoom button (zoom out)", "Validate zoom-out functionality.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.20
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the radius of the buttons", "Ensure the toolbar's buttons match the design.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.21
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the wire", "Validate the wire colors based on the component's output.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.22
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the electricity flow", "Ensure the electric flow's color is correct in dark theme.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.23
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the electricity flow", "Ensure the electric flow's color is correct in light theme.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.24
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the clock component", "Check that the clock component is correctly colored.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.25  
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the number of inputs and outputs for the clock component", "Ensure correct inputs/outputs for the clock component.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.26
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the width and height of the clock component", "Validate the dimensions of the clock component.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.27
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the flip-flop component", "Check that the flip-flop component is correctly colored.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.28
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the number of inputs and outputs for the flip-flop component", "Ensure correct inputs/outputs for the flip-flop component.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.29
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the width and height of the flip-flop component", "Validate the dimensions of the flip-flop component.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.30
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the input component", "Check that the input component is correctly colored.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.31
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the number of inputs and outputs for the input component", "Ensure correct inputs/outputs for the input component.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.32
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the width and height of the input component", "Validate the dimensions of the input component.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.33
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the LUT component", "Check that the LUT component is correctly colored.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.34
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the number of inputs and outputs for the LUT component", "Ensure correct inputs/outputs for the LUT component.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.35  
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the width and height of the LUT component", "Validate the dimensions of the LUT component.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.36
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the output component", "Check that the output component is correctly colored.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.37
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the number of inputs and outputs for the output component", "Ensure correct inputs/outputs for the output component.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.38
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the width and height of the output component", "Validate the dimensions of the output component.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.39
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the background", "Ensure background color complies with the dark theme design guidelines.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.40
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the intensity of the blur in the footer (Dark Theme)", "Validate the blur effect in the dark theme.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.41
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the footer", "Ensure the dark theme footer's color is correct.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.42
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the icon (Dark Theme)", "Ensure the correct icon is displayed in dark theme.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.43
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the width and height of the footer", "Validate that the footer dimensions match the design guidelines.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.44  
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the icon (Light Theme)", "Ensure the correct icon is displayed in light theme.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.45
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the background", "Ensure background color complies with the light theme design guidelines.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.46
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the intensity of the blur in the footer (Light Theme)", "Validate the blur effect in the light theme.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.47
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the color of the footer", "Ensure the light theme footer's color is correct.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.48
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the radius of the toolbar", "Ensure the toolbar's corners match the design.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.49
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the size of the columns for the components", "Ensure columns are correctly sized for components.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.50
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the size of the electricity flow", "Ensure the electricity flow's size is appropriate.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.51
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the width of the wire based on screen size", "Check if wire width adapts to screen size.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.52
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the name of the website", "Ensure the website's name displays correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.53
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the value of the current speed", "Check that the speed value updates properly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.54  
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the size of the text", "Ensure the text's size is correct.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.55
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the displayed value of the zoom", "Check that the zoom level updates properly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.56
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the parser-sdf-to-json.js transformation of a wire", "Ensure wire data converts correctly to JSON.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.57
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the parser-json-to-HTML.js transformation of a wire", "Ensure wires render correctly in HTML.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.58
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify if the electricity's flow follows the right path", "Check if simulated electricity's flow follows logic.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.59
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify if the electricity's flow follows the right speed", "Ensure speed is accurate.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.60
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify if the animation of the electricity's flow runs correctly", "Validate that the electricity's flow animation is running.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.61
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-sdf-to-json.js creates wire connections", "Ensure wires connect properly post-conversion.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.62
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-sdf-to-json.js doesn't create duplicates", "Check if duplicate elements are avoided.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.63
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-json-to-HTML creates a wire", "Ensure wires render correctly in HTML.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.64  
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-json-to-HTML connection of wires", "Validate wire connections in HTML output.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.65
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-json-to-HTML doesn't create duplicates", "Ensure no duplicate elements exist.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.66
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify if the electricity follows the right path", "Check if simulated electricity behaves as required.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.67
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify if the electricity's flow follows the right speed", "Ensure speed is accurate.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.68
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify if the animation of the electric flow runs correctly", "Validate electricity animation.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.69
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-json-to-HTML creates a clock component", "Validate clock component rendering.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.70
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-sdf-to-json.js create a flip-flop component", "Validate flip-flop component conversion.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.71
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-json-to-HTML creates a flip-flop component", "Ensure flip-flop renders correctly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.72
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-json-to-HTML creates an input component", "Ensure input component renders properly.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.73
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-json-to-HTML creates a LUT component", "Check LUT rendering.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    // L.74
    await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-json-to-HTML creates an output component", "Validate output component in HTML.", Priority.MEDIUM, async () => {
      // Testlogic here
    });

    console.log('Tests finished for ' + browser + ' version ' + (await driver.getCapabilities()).getBrowserVersion());

  } catch (e) {
    console.error(`Error running tests on ${browser} version ${(await driver.getCapabilities()).getBrowserVersion}:`, e);
  } 
  finally {
    if (driver) {
      await driver.quit();
    }
  }
}

async function runTest(driver: WebDriver, browserName: string, testCategory: Category, testSubCategory: SubCategory [],testName: string, testDescription: string, testPriority: Priority, testFn: () => Promise<void>) {
  try {
    await testFn();
    results.push({ 
      browser: browserName,
      version: (await driver.getCapabilities()).getBrowserVersion(),
      test: {
        category: testCategory,
        subCategory: testSubCategory,
        name: testName,
        description: testDescription,
        priority: testPriority,
        passed: true
      }
    });
  } catch (e) {
    results.push({ 
      browser: browserName,
      version: (await driver.getCapabilities()).getBrowserVersion(),
      test: {
        category: testCategory,
        subCategory: testSubCategory,
        name: testName,
        description: testDescription,
        priority: testPriority,
        passed: false,
        error: e
      }
    });
  }
}

function logResults() {
  const logData = {
    summary: `TestSummary for file: ${path.basename(__filename)}`,
    date: dateString,
    results: results
  };
  fs.writeFileSync(logFilePath, JSON.stringify(logData, null, 2));
}

function rgbToHex(rgb: string): string {
  const result = rgb.match(/\d+/g);
  if (!result || result.length < 3) {
    throw new Error('Invalid RGB format');
  }
  const [r, g, b] = result.map(Number);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}
