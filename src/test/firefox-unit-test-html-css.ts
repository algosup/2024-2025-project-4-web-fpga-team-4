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
  
    await runTest(driver, browser, Category.HTML, [SubCategory.Text], 'Title Homepage', 'Check if the title is correct', Priority.HIGH, async () => {
      const title = await driver.getTitle();
      assert.strictEqual("Client Side", title);
    });

    await driver.manage().setTimeouts({ implicit: 10000 });

    await runTest(driver, browser, Category.CSS, [SubCategory.Colors], 'Background Color Test', 'Check if the background color is correct', Priority.MEDIUM, async () => {
      const description = await driver.findElement(By.id('description')).getCssValue('background-color');
      assert.strictEqual("rgb(27, 38, 59)", description);
    });
    
    await runTest(driver, browser, Category.CSS, [SubCategory.Colors] , 'Background Color Test', 'Check if the background color is correct in hex', Priority.MEDIUM, async () => {
      const description = await driver.findElement(By.id('description')).getCssValue('background-color');
      const hexColor = rgbToHex(description);
      assert.strictEqual("#1B263B", hexColor);
    });

    await runTest(driver, browser, Category.HTML, [SubCategory.Value, SubCategory.Text], 'Speed Value Test', 'Check if the speed value is correct', Priority.LOW, async () => {
      const speed = await driver.findElement(By.id('speed')).getAttribute('value');
      const speedNumber = parseInt(speed);
      assert.strictEqual(1, speedNumber);
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
    summary: `Test Summary for file: ${path.basename(__filename)}`,
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
