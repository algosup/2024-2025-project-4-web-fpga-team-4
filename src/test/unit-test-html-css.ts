import { By, Builder, Browser, WebDriver } from 'selenium-webdriver';
import * as assert from 'assert';
const fs = require('fs');
const path = require('path');

const date: Date = new Date();
const dateString: string = date.toISOString().split(/T/)[0];
const results: { test: string, passed: boolean, error?: any }[] = [];
const logFilePath = path.join(__dirname, 'logs', dateString + '-test.log');

async function runTests() {
  let driver: WebDriver | null = null;
  driver = await new Builder().forBrowser(Browser.FIREFOX).build();

  try {
    await driver.get("https://two024-2025-project-4-web-fpga-team-4.onrender.com/client.html");

    await runTest(driver, 'Title Test', async () => {
      const title = await driver.getTitle();
      assert.strictEqual("Client Side", title);
    });

    await driver.manage().setTimeouts({ implicit: 10000 });

    await runTest(driver, 'Description Background Color Test', async () => {
      const description = await driver.findElement(By.id('description')).getCssValue('background-color');
      assert.strictEqual("rgb(27, 38, 58)", description);
    });

    await runTest(driver, 'Speed Value Test', async () => {
      const speed = await driver.findElement(By.id('speed')).getAttribute('value');
      const speedNumber = parseInt(speed);
      assert.strictEqual(1, speedNumber);
    });

  } catch (e) {
    console.log(e);
  } finally {
    if (driver) {
      await driver.quit();
    }
    logResults();
  }
}

async function runTest(driver: WebDriver, testName: string, testFn: () => Promise<void>) {
  try {
    await testFn();
    results.push({ test: testName, passed: true });
  } catch (e) {
    results.push({ test: testName, passed: false, error: e });
  }
}

function logResults() {
  let passedCount: number = 0;
  const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });
  logStream.write('------------------\n');
  logStream.write(`Test Summary for file: ${path.basename(__filename)}\n`);
  logStream.write('------------------\n');
  results.forEach(result => {
    passedCount = passedCount+1;
    if (result.passed) {
      logStream.write(`${passedCount}\t${result.test}: PASSED\n`);
    } else {
      logStream.write(`${passedCount}\t${result.test}: FAILED\n`);
      logStream.write(`\tError: ${result.error.name}\n`);
      logStream.write(`\tExpected: ${result.error.expected}\n`);
      logStream.write(`\tActual: ${result.error.actual}\n`);
    }
    logStream.write('____________________\n');
  });
  logStream.end();
}

runTests();
