import { By, Builder, Browser, WebDriver } from 'selenium-webdriver';
import * as assert from 'assert';

(async function firstTest() {
  let driver: WebDriver | null = null;
  const results: { test: string, passed: boolean, error?: any }[] = [];

  try {
    driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    await driver.get("https://two024-2025-project-4-web-fpga-team-4.onrender.com/client.html");

    try {
      let title: string = await driver.getTitle();
      assert.strictEqual("Work Pge", title);
      results.push({ test: 'Title Test', passed: true });
    } catch (e) {
      results.push({ test: 'Title Test', passed: false, error: e });
    }

    try {
      await driver.manage().setTimeouts({ implicit: 10000 });
      let description: string = await driver.findElement(By.id('description')).getCssValue('background-color');
      assert.strictEqual("rgb(27, 38, 58)", description);
      results.push({ test: 'Description Background Color Test', passed: true });
    } catch (e) {
      results.push({ test: 'Description Background Color Test', passed: false, error: e });
    }

    try {
      let speed: string = await driver.findElement(By.id('speed')).getAttribute('value');
      let speedNumber: number = parseInt(speed);
      assert.strictEqual(1, speedNumber);
      results.push({ test: 'Speed Value Test', passed: true });
    } catch (e) {
      results.push({ test: 'Speed Value Test', passed: false, error: e });
    }

  } catch (e) {
    console.log(e);
  } finally {
    if (driver) {
      await driver.quit();
    }
    console.log('Test Summary:');
    results.forEach(result => {
      if (result.passed) {
        console.log(`${result.test}: PASSED`);
      } else {
        console.log(`${result.test}: FAILED`);
        console.log(`Error: ${result.error}`);
      }
    });
  }
})();
