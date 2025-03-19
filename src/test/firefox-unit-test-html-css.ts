import { By, WebDriver, Browser, Builder } from 'selenium-webdriver';
import * as assert from 'assert';
import { Options as FirefoxOptions } from 'selenium-webdriver/firefox';
import * as fs from 'fs';
import * as path from 'path';

const date: Date = new Date();
const dateString: string = date.toISOString().split(/T/)[0];
const results: { 
  browser: string,
  version: string | undefined,
  test: {
    name: string,
    description: string,
    priority: string,
    type: string[],
    passed: boolean,
    error?: any
  }
}[] = [];

const logFilePath = path.join(__dirname, 'logs', dateString + '-firefox-unit-test-html-css.json');

const versions = ['116.0', '117.0', '118.0', '119.0', '120.0', '121.0', '122.0', '123.0', '124.0', '125.0.1', '126.0', '127.0', '128.0', '129.0', '130.0', '131.0', '132.0', '133.0', '134.0', '135.0', '136.0'];

async function runTests(browser: string, options: any) {
  let driver: WebDriver;
  driver = await new Builder().forBrowser(browser).setFirefoxOptions(options).build();

  try {
    await driver.get("https://two024-2025-project-4-web-fpga-team-4.onrender.com/client.html");

    await runTest(driver, browser, 'Title Test', 'Check if the title is correct', 'high', ["typo"], async () => {
      const title = await driver.getTitle();
      assert.strictEqual("Client Side", title);
    });

    await driver.manage().setTimeouts({ implicit: 10000 });

    await runTest(driver, browser, 'Background Color Test', 'Check if the background color is correct', 'medium', ["css", "html"], async () => {
      const description = await driver.findElement(By.id('description')).getCssValue('background-color');
      assert.strictEqual("rgb(27, 38, 59)", description);
    });
    
    await runTest(driver, browser, 'Background Color Test', 'Check if the background color is correct in hex', 'medium', ["css"],  async () => {
      const description = await driver.findElement(By.id('description')).getCssValue('background-color');
      const hexColor = rgbToHex(description);
      assert.strictEqual("#1B263B", hexColor);
    });

    await runTest(driver, browser, 'Speed Value Test', 'Check if the speed value is correct', 'low', ["html", "js"], async () => {
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
    logResults();
  }
}

async function runTest(driver: WebDriver, browserName: string, testName: string, testDescription: string, testPriority: string, testTypes: string[], testFn: () => Promise<void>) {
  try {
    await testFn();
    results.push({ 
      browser: browserName,
      version: (await driver.getCapabilities()).getBrowserVersion(),
      test: {
        name: testName,
        description: testDescription,
        priority: testPriority,
        type: testTypes,
        passed: true
      }
    });
  } catch (e) {
    results.push({ 
      browser: browserName,
      version: (await driver.getCapabilities()).getBrowserVersion(),
      test: {
        name: testName,
        description: testDescription,
        priority: testPriority,
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

(async () => {
  for (const version of versions) {
    let firefoxOptions = new FirefoxOptions().addArguments('--headless').setBrowserVersion(`${version}`)
    await runTests(Browser.FIREFOX, firefoxOptions);
  }
})();