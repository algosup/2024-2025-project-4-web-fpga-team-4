import { By, WebDriver, Browser, Builder } from 'selenium-webdriver';
import * as assert from 'assert';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { Options as EdgeOptions } from 'selenium-webdriver/edge';
import { Options as SafariOptions } from 'selenium-webdriver/safari';
import * as fs from 'fs';
import * as path from 'path';

const date: Date = new Date();
const dateString: string = date.toISOString().split(/T/)[0];
const results: { 
  browser: string,
  test: {
    name: string,
    description: string,
    type: string[],
    passed: boolean,
    error?: any
  }
}[] = [];

const logFilePath = path.join(__dirname, 'logs', dateString + '-unit-test-html-css.json');

const chromeOptions = new ChromeOptions().addArguments('--headless');


async function runTests(browser: string, options: any) {
  let driver: WebDriver;
    driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();

  try {
    await driver.get("https://two024-2025-project-4-web-fpga-team-4.onrender.com/client.html");

    await runTest(driver, 'Title Test', 'Check if the title is correct', ["typo"], async () => {
      const title = await driver.getTitle();
      assert.strictEqual("Client Side", title);
    });

    await driver.manage().setTimeouts({ implicit: 10000 });

    await runTest(driver, 'Background Color Test', 'Check if the background color is correct', ["css", "html"], async () => {
      const description = await driver.findElement(By.id('description')).getCssValue('background-color');
      assert.strictEqual("rgb(27, 38, 59)", description);
    });
    
    await runTest(driver, 'Background Color Test', 'Check if the background color is correct in hex', ["css"],  async () => {
      const description = await driver.findElement(By.id('description')).getCssValue('background-color');
      const hexColor = rgbToHex(description);
      assert.strictEqual("#1B263B", hexColor);
    });

    await runTest(driver, 'Speed Value Test', 'Check if the speed value is correct', ["html", "js"], async () => {
      const speed = await driver.findElement(By.id('speed')).getAttribute('value');
      const speedNumber = parseInt(speed);
      assert.strictEqual(1, speedNumber);
    });

  } catch (e) {
    console.error(`Error running tests on ${browser}:`, e);
  } 
  finally {
    if (driver) {
      await driver.quit();
    }
    logResults();
  }
}

async function runTest(driver: WebDriver, testName: string, testDescription: string, testTypes: string[], testFn: () => Promise<void>) {
  const browserName = (await driver.getCapabilities()).get('browserName');
  try {
    await testFn();
    results.push({ 
      browser: browserName,
      test: {
        name: testName,
        description: testDescription,
        type: testTypes,
        passed: true
      }
    });
  } catch (e) {
    results.push({ 
      browser: browserName,
      test: {
        name: testName,
        description: testDescription,
        type: testTypes,
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

runTests(Browser.CHROME, chromeOptions);