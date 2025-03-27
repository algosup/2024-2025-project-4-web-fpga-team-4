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
    let firefoxOptions = new FirefoxOptions().setBrowserVersion(`${version}`);
    await runTests(Browser.FIREFOX, firefoxOptions);
  }
  logResults();
})();

async function runTests(browser: string, options: any) {
  let driver: WebDriver;
  driver = await new Builder().forBrowser(browser).setFirefoxOptions(options).build();

  try {
      await driver.get("https://two024-2025-project-4-web-fpga-team-4.onrender.com/client.html");
      
      // // L.2
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the download button", "Ensure the download button functions correctly.", Priority.HIGH, async () => {
      //   let downloadButton = await driver.findElement(By.id('upload-file'));
      //   downloadButton.click();
      //   // Check if the download button works correctly and if data.json exists
      // });
  
      // // L.3
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the first step button", "Ensure the first step button functions correctly.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.4
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the hide/show button", "Ensure the hide/show button toggles visibility correctly.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.5  
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the last step button", "Ensure the last step button functions correctly.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // L.6
      await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the light/dark button", "Check if theme switch button works correctly.", Priority.MEDIUM, async () => {
  
        let themeButton = await driver.findElement(By.id('theme'));
        await themeButton.click();
  
        let newTheme = await driver.executeScript('return document.documentElement.getAttribute("data-theme");');
        if (newTheme === 'light') {
        assert.strictEqual(newTheme, 'light', 'The theme should be light after clicking the theme button');
        } else {
        assert.strictEqual(newTheme, 'dark', 'The theme should be dark after clicking the theme button');
        }
      });
  
      // L.7
      await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the upload button (.json)", "Ensure the upload button correctly processes JSON files.", Priority.HIGH, async () => {
      
        let uploadButton = await driver.findElement(By.id('open-folder'));
        uploadButton.click();
      
        // Path to the valid test file
        const filePath = path.join(__dirname, 'test-files', 'example.json');
        console.log(filePath);
      
        // Find file input and upload the file
        const fileInput = await driver.findElement(By.css('input[type="file"]')).sendKeys(filePath);
        await fileInput
  
        await driver.sleep(500);
      
        try {
          // Try to switch to an alert (if it exists)
          let alert = await driver.switchTo().alert();
          await alert.accept(); // Accept the alert
          assert.fail("Unexpected alert detected, meaning file validation failed.");
        } catch (error) {
          if (error instanceof Error && error.name === "NoSuchAlertError") {
            console.log("No alert detected, file validation likely passed.");
            assert.ok(true); // Assert that the test passes
          } else {
            throw error; // If another error occurs, throw it
          }
        }
      });  
  
      // L.8
      await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the upload button (.random)", "Ensure the upload button correctly processes random files.", Priority.HIGH, async () => {
        let uploadButton = await driver.findElement(By.id('open-folder'));
        uploadButton.click();
      
        // Path to the valid test file
        const filePath = path.join(__dirname, 'test-files', 'example.csv');
        console.log(filePath);
      
        // Find file input and upload the file
        const fileInput = await driver.findElement(By.css('input[type="file"]'));
        await fileInput.sendKeys(filePath);
  
        await driver.sleep(500);
      
        try {
        // Try to switch to an alert (if it exists)
        let alert = await driver.switchTo().alert();
        await alert.accept(); // Accept the alert
        assert.ok(true);
        } catch (error) {
        if (error instanceof Error && error.name === "NoSuchAlertError") {
          assert.ok(false, "No alert detected, meaning the test should fail."); // Assert that the test fails
        } else {
          throw error;
        }
        }
      });
  
      // // L.9
      await runTest(driver, browser, Category.JS, [SubCategory.Button], 
        "Verify the event trigger for the upload button (.sdf)", 
        "Ensure the upload button correctly processes SDF files.", 
        Priority.HIGH, async () => {
    
        let uploadButton = await driver.findElement(By.id('open-folder'));
        uploadButton.click();
    
        // Path to the valid test file
        const filePath = path.join(__dirname, 'test-files', 'example.sdf');
        console.log(filePath);
    
        // Find file input and upload the file
        const fileInput = await driver.findElement(By.css('input[type="file"]'));
        await fileInput.sendKeys(filePath);
  
        await driver.sleep(500);
    
        try {
            let alert = await driver.switchTo().alert();
            await alert.dismiss(); // Dismiss the alert
            assert.fail("Unexpected alert detected, meaning file validation failed.");
        } catch (error) {
            if (error instanceof Error && error.name === "NoSuchAlertError") {
                console.log("No alert detected, file validation likely passed.");
                assert.ok(true); // Assert that the test passes
            } else {
                throw error; // If another error occurs, throw it
            }
        }
    });  
  
      // // L.10
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the next step button", "Ensure the next step button functions correctly.", Priority.HIGH, async () => {
  
      // });
  
      // // L.11
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the panel button", "Ensure clicking panel button performs intended action.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.12
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the pause button", "Validate the pause button's functionality.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.13
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the previous step button", "Check if the previous step button works correctly.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.14
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the resume button", "Ensure the resume button resumes the animation correctly.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.15  
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the settings button", "Ensure the settings button opens the settings menu correctly.", Priority.MEDIUM, async () => {
      //   // Test logic here
      // });
  
      // // L.16
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the speed controller button (Plus)", "Ensure that the speed increase works correctly.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.17
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the speed controller button (Minus)", "Ensure that the speed decrease works correctly.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.18
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the zoom button (zoom in)", "Ensure the zoom-in button functions correctly.", Priority.MEDIUM, async () => {
      //   // Test logic here
      // });
  
      // // L.19
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the event trigger for the zoom button (zoom out)", "Validate zoom-out functionality.", Priority.MEDIUM, async () => {
      //   // Test logic here
      // });
  
      // L.20
      await runTest(driver, browser, Category.CSS, [SubCategory.Button, SubCategory.Radius], "Verify the radius of the buttons", "Ensure the toolbar's buttons match the design.", Priority.LOW, async () => {
        let buttons = [];
        let uploadButton = await driver.findElement(By.id('open-folder'));
        let downloadButton = await driver.findElement(By.id('upload-file'));
        let pauseButton = await driver.findElement(By.id('pause'));
        let resumeButton = await driver.findElement(By.id('play'));
        let speedControl = await driver.findElement(By.id('speed-control'));
        let firstStepButton = await driver.findElement(By.id('first'));
        let lastStepButton = await driver.findElement(By.id('last'));
        let backStepButton = await driver.findElement(By.id('back'));
        let nextStepButton = await driver.findElement(By.id('next'));
        let zoomInButton = await driver.findElement(By.id('zoom-in'));
        let zoomOutButton = await driver.findElement(By.id('zoom-out'));
        let dataViewButton = await driver.findElement(By.id('data-view-trigger'));
        let themeButton = await driver.findElement(By.id('theme'));
        let settingsButton = await driver.findElement(By.id('settings'));
  
        buttons.push(uploadButton, downloadButton, pauseButton, resumeButton, speedControl, firstStepButton, lastStepButton, backStepButton, nextStepButton, zoomInButton, zoomOutButton, dataViewButton, themeButton, settingsButton);
        for (let button of buttons) {
          let radius = await button.getCssValue('border-radius');
          assert.strictEqual(radius, '10px', 'The radius of the button should be 10px');
        }
      });
  
      // // L.21
      // await runTest(driver, browser, Category.CSS, [SubCategory.Colors], "Verify the color of the wire", "Validate the wire colors based on the component's output.", Priority.MEDIUM, async () => {
      //   // Test logic here
      // });
  
      // L.22
      await runTest(driver, browser, Category.CSS, [SubCategory.Colors, SubCategory.DarkTheme], "Verify the color of the electricity flow", "Ensure the electric flow's color is correct in dark theme.", Priority.MEDIUM, async () => {
        // Need to upload a file to see the electricity flow
        uploadSDF(driver);
        let electricityFlow = await driver.findElement(By.className('animation'));
        let hexColor = await rgbToHex(await electricityFlow.getCssValue('background-color'));
        assert.strictEqual(hexColor, '#FFFFFF', 'The color of the electricity flow should be white');
      });
  
      // L.23
      await runTest(driver, browser, Category.CSS, [SubCategory.Colors, SubCategory.LightTheme], "Verify the color of the electricity flow", "Ensure the electric flow's color is correct in light theme.", Priority.MEDIUM, async () => {
        let buttonTheme = await driver.findElement(By.id('theme'));
        // Need to switch to light theme
        await buttonTheme.click();
        let electricityFlow = await driver.findElement(By.className('animation'));
        let hexColor = await rgbToHex(await electricityFlow.getCssValue('background-color'));
        assert.strictEqual(hexColor, '#000000', 'The color of the electricity flow should be black');
      });
  
      // L.24
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoClock], "Verify the color of the clock component", "Check that the clock component is correctly colored.", Priority.LOW, async () => {
        let clock = await driver.findElement(By.className('clock-element'));
        let backgroundColor = await clock.findElement(By.css('div')).getCssValue('background-color');
        let hexColor = rgbToHex(backgroundColor);
        assert.strictEqual(hexColor, '#AE15BF', 'The background color of the clock component should be purple');
      });
  
      // L.25  
      await runTest(driver, browser, Category.HTML, [SubCategory.CompoClock], "Verify the number of inputs and outputs for the clock component", "Ensure correct inputs/outputs for the clock component.", Priority.MEDIUM, async () => {
        let clock = await driver.findElement(By.className('clock-element'));
        let clockContainer = await clock.findElement(By.css('div'));
        let outputs = await clockContainer.findElements(By.className('input-out-after'));
        let inputs = await clockContainer.findElements(By.className('output-in-before'));
  
        let outputCount = outputs.length;
        let inputCount = inputs.length;
  
        assert.strictEqual(outputCount, 1, 'The clock component should have exactly 1 output.');
        assert.strictEqual(inputCount, 0, 'The clock component should have exactly 1 input.');
      });
  
      // L.26
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoClock], "Verify the width of the clock component", "Validate the dimensions of the clock component.", Priority.MEDIUM, async () => {
        let clock = await driver.findElement(By.className('clock-element'));
        let width = await clock.getCssValue('width');
        let expectedWidth = await getWidthInPixels(driver, 10); // Convert 10vw to pixels
        let actualWidth = parseFloat(width.replace('px', '')); // Convert height to a number
        assert.strictEqual(actualWidth, expectedWidth,  'The width of the clock component should be 10% of the screen');
      });
  
      // L.27
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoClock], "Verify the height of the clock component", "Validate the dimensions of the clock component.", Priority.MEDIUM, async () => {
        let clock = await driver.findElement(By.className('clock-element'));
        let height = await clock.getCssValue('height');
        let expectedHeight = await getHeightInPixels(driver, 12); // Convert 12vh to pixels
        let actualHeight = parseFloat(height.replace('px', '')); // Convert height to a number
        assert.strictEqual(actualHeight, expectedHeight, 'The height of the clock component should be 12% of the screen');
      });
  
      // L.28
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoFlipFlop], "Verify the color of the flip-flop component", "Check that the flip-flop component is correctly colored.", Priority.LOW, async () => {
        let flip_flop = await driver.findElement(By.className('ff-element'));
        let backgroundColor = await flip_flop.findElement(By.css('div')).getCssValue('background-color');
        let hexColor = rgbToHex(backgroundColor);
        assert.strictEqual(hexColor, '#BF1518', 'The background color of the flip-flop component should be red');
      });
  
      // L.29
      await runTest(driver, browser, Category.HTML, [SubCategory.CompoFlipFlop], "Verify the number of inputs and outputs for the flip-flop component", "Ensure correct inputs/outputs for the flip-flop component.", Priority.MEDIUM, async () => {
        let flip_flop = await driver.findElement(By.className('ff-element'));
        let flip_flopContainer = await flip_flop.findElement(By.css('div'));
        let outputs = await flip_flopContainer.findElements(By.className('ff-out-after'));
        let inputs = await flip_flopContainer.findElements(By.className('ff-in-before'));
  
        let outputCount = outputs.length;
        let inputCount = inputs.length;
  
        assert.strictEqual(outputCount, 1, 'The flip-flop component should have exactly 1 output.');
        assert.strictEqual(inputCount, 2, 'The flip-flop component should have exactly 1 input.');
      });
  
      // L.30
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoFlipFlop], "Verify the width of the flip-flop component", "Validate the dimensions of the flip-flop component.", Priority.MEDIUM, async () => {
        let flip_flop = await driver.findElement(By.className('ff-element'));
        let width = await flip_flop.getCssValue('width');
        let expectedWidth = await getWidthInPixels(driver, 10); // Convert 10vw to pixels
        let actualWidth = parseFloat(width.replace('px', '')); // Convert width to a number
        assert.strictEqual(actualWidth, expectedWidth, 'The width of the clock component should be 10% of the screen');
      });
  
      // L.31
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoFlipFlop], "Verify the height of the flip-flop component", "Validate the dimensions of the flip-flop component.", Priority.MEDIUM, async () => {
        let flip_flop = await driver.findElement(By.className('ff-element'));
        let height = await flip_flop.getCssValue('height');
        let expectedHeight = await getHeightInPixels(driver, 18); // Convert 18vh to pixels
        let actualHeight = parseFloat(height.replace('px', '')); // Convert height to a number
        assert.strictEqual(actualHeight, expectedHeight, 'The height of the flip-flop component should be 18% of the screen');
      });
  
      // L.32
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoInput], "Verify the color of the input component", "Check that the input component is correctly colored.", Priority.LOW, async () => {
        let resetInput = await driver.findElement(By.className('reset-element'));
        let backgroundColor = await resetInput.findElement(By.css('div')).getCssValue('background-color');
        console.log(backgroundColor);
        
        let hexColor = rgbToHex(backgroundColor);
        console.log(hexColor);
        assert.strictEqual(hexColor, '#999997', 'The background color of the input component should be gray');
      });
  
      // L.33
      await runTest(driver, browser, Category.HTML, [SubCategory.CompoInput], "Verify the number of inputs and outputs for the input component", "Ensure correct inputs/outputs for the input component.", Priority.HIGH, async () => {
        let resetInput = await driver.findElement(By.className('reset-element'));
        let resetInputContainer = await resetInput.findElement(By.css('div'));
        let outputs = await resetInputContainer.findElements(By.className('input-out-after'));
        let inputs = await resetInputContainer.findElements(By.className('output-in-before'));
  
        let outputCount = outputs.length;
        let inputCount = inputs.length;
  
        assert.strictEqual(outputCount, 1, 'The async_reset component should have exactly 1 output.');
        assert.strictEqual(inputCount, 0, 'The async_reset component should have exactly 0 input.');
      });
  
      // L.34
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoInput], "Verify the width of the input component", "Validate the dimensions of the input component.", Priority.MEDIUM, async () => {
        let resetInput = await driver.findElement(By.className('reset-element'));
        let width = await resetInput.getCssValue('width');
        let expectedWidth = await getWidthInPixels(driver, 10); // Convert 10vw to pixels
        let actualWidth = parseFloat(width.replace('px', '')); // Convert width to a number
        assert.strictEqual(actualWidth, expectedWidth, 'The width of the input component should be 10% of the screen');
      });
  
      // L.35
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoInput], "Verify the height of the input component", "Validate the dimensions of the input component.", Priority.MEDIUM, async () => {
        let resetInput = await driver.findElement(By.className('reset-element'));
        let height = await resetInput.getCssValue('height');
        let expectedHeight = await getHeightInPixels(driver, 12); // Convert 12vh to pixels
        let actualHeight = parseFloat(height.replace('px', '')); // Convert height to a number
        assert.strictEqual(actualHeight, expectedHeight, 'The height of the input component should be 12% of the screen');
      });
  
      // L.36
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoLUT], "Verify the color of the LUT component", "Check that the LUT component is correctly colored.", Priority.LOW, async () => {
        let lut = await driver.findElement(By.className('lut-element'));
        let backgroundColor = await lut.findElement(By.css('div')).getCssValue('background-color');
        let hexColor = rgbToHex(backgroundColor);
        assert.strictEqual(hexColor, '#15BF9A', 'The background color of the LUT component should be cyan');
      });
  
      // L.37
      await runTest(driver, browser, Category.HTML, [SubCategory.CompoLUT], "Verify the number of inputs and outputs for the LUT component", "Ensure correct inputs/outputs for the LUT component.", Priority.HIGH, async () => {
        let lut = await driver.findElement(By.className('lut-element'));
        let lutContainer = await lut.findElement(By.css('div'));
        let outputs = await lutContainer.findElements(By.className('lut-out-after'));
        let inputs = await lutContainer.findElements(By.className('lut-in-before'));
  
        let outputCount = outputs.length;
        let inputCount = inputs.length;
  
        assert.strictEqual(outputCount, 1, 'The LUT component should have exactly 1 output.');
        assert.strictEqual(inputCount, 3, 'The LUT component should have exactly 3 inputs.');
  
      });
  
      // L.38
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoLUT], "Verify the width of the LUT component", "Validate the dimensions of the LUT component.", Priority.MEDIUM, async () => {
        let lut = await driver.findElement(By.className('lut-element'));
        let width = await lut.getCssValue('width');
        let expectedWidth = await getWidthInPixels(driver, 10); // Convert 10vw to pixels
        let actualWidth = parseFloat(width.replace('px', '')); // Convert width to a number
        assert.strictEqual(actualWidth, expectedWidth, 'The width of the LUT component should be 10% of the screen');
      });
  
      // L.39 
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoLUT], "Verify the height of the LUT component", "Validate the dimensions of the LUT component.", Priority.MEDIUM, async () => {
        let lut = await driver.findElement(By.className('lut-element'));
        let height = await lut.getCssValue('height');
        let expectedHeight = await getHeightInPixels(driver, 16); // Convert 16vh to pixels
        let actualHeight = parseFloat(height.replace('px', '')); // Convert height to a number
        assert.strictEqual(actualHeight, expectedHeight, 'The height of the LUT component should be 16% of the screen');
      });
  
      // L.40
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoOutput], "Verify the color of the output component", "Check that the output component is correctly colored.", Priority.LOW, async () => {
        let output = await driver.findElement(By.className('output-element'));
        let backgroundColor = await output.findElement(By.css('div')).getCssValue('background-color');
        let hexColor = rgbToHex(backgroundColor);
        assert.strictEqual(hexColor, '#007ACC', 'The background color of the output component should be blue');
      });
  
      // L.41
      await runTest(driver, browser, Category.HTML, [SubCategory.CompoOutput], "Verify the number of inputs and outputs for the output component", "Ensure correct inputs/outputs for the output component.", Priority.HIGH, async () => {
        let out = await driver.findElement(By.className('output-element'));
        let outContainer = await out.findElement(By.css('div'));
  
        let outputs = await outContainer.findElements(By.className('output-out-after'));
        let inputs = await outContainer.findElements(By.className('output-in-before'));
  
        let outputCount = outputs.length;
        let inputCount = inputs.length;
  
        assert.strictEqual(outputCount, 0, 'The output component should have exactly 0 output.');
        assert.strictEqual(inputCount, 1, 'The output component should have exactly 1 input.');
      });
  
      // L.42
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoOutput], "Verify the width of the output component", "Validate the dimensions of the output component.", Priority.MEDIUM, async () => {
        let output = await driver.findElement(By.className('output-element'));
        let width = await output.getCssValue('width');
        let expectedWidth = await getWidthInPixels(driver, 10); // Convert 10vw to pixels
        let actualWidth = parseFloat(width.replace('px', '')); // Convert width to a number
        assert.strictEqual(actualWidth, expectedWidth, 'The width of the output component should be 10% of the screen');
      });
  
      // L.43
      await runTest(driver, browser, Category.CSS, [SubCategory.CompoOutput], "Verify the height of the output component", "Validate the dimensions of the output component.", Priority.MEDIUM, async () => {
        let output = await driver.findElement(By.className('output-element'));
        let height = await output.getCssValue('height');
        let expectedHeight = await getHeightInPixels(driver, 12); // Convert 12vh to pixels
        let actualHeight = parseFloat(height.replace('px', '')); // Convert height to a number
        assert.strictEqual(actualHeight, expectedHeight, 'The height of the output component should be 12% of the screen');
      });
  
      // L.44
      await runTest(driver, browser, Category.CSS, [SubCategory.DarkTheme, SubCategory.Background], "Verify the color of the background", "Ensure background color complies with the dark theme design guidelines.", Priority.LOW, async () => {
        let body = await driver.findElement(By.id('visualization-area'));
        let backgroundColor = await body.getCssValue('background-color');
        let hexColor = rgbToHex(backgroundColor);
        assert.strictEqual(hexColor, '#0D1B2A', 'The background color should be black');
      });
  
      // // L.45
      // await runTest(driver, browser, Category.CSS, [SubCategory.DarkTheme, SubCategory.Footer], "Verify the intensity of the blur in the footer (Dark Theme)", "Validate the blur effect in the dark theme.", Priority.LOW, async () => {
      //   let footer = await driver.findElement(By.id('clock-back'));
      //   let background = await footer.getCssValue('background');
      //   let color = '#0D1B2A';
      //   assert.strictEqual(
      //     background,
      //     'linear-gradient(to top, rgba(13, 27, 42, 1), rgba(13, 27, 42, 1), rgba(13, 27, 42, 1), rgba(13, 27, 42, 1), rgba(13, 27, 42, 0.7), rgba(13, 27, 42, 0))',
      //     'The background gradient of the footer does not match the expected design.'
      //   );
      // });
  
      // // L.46
      // await runTest(driver, browser, Category.CSS, [SubCategory.Button], "Verify the color of the footer", "Ensure the dark theme footer's color is correct.", Priority.LOW, async () => {
      //   // Test logic here
      // });
  
      // L.47
      await runTest(driver, browser, Category.CSS, [SubCategory.Image], "Verify the icon (Dark Theme)", "Ensure the correct icon is displayed in dark theme.", Priority.LOW, async () => {
        let icon = await driver.findElement(By.id('logo'));
        let logoSrc = await icon.getAttribute('src');
        assert.ok(logoSrc, 'The logo should have a valid source attribute');
        console.log(`Logo source: ${logoSrc}`);
      });
  
      // // L.48
      // await runTest(driver, browser, Category.CSS, [SubCategory.Button], "Verify the width of the footer", "Validate that the footer dimensions match the design guidelines.", Priority.MEDIUM, async () => {
      //   // Test logic here
      // });
  
      // // L.49
      // await runTest(driver, browser, Category.CSS, [SubCategory.Button], "Verify the icon (Light Theme)", "Ensure the correct icon is displayed in light theme.", Priority.LOW, async () => {
      //   // Test logic here
      // });
  
      // // L.50
      // await runTest(driver, browser, Category.CSS, [SubCategory.Button], "Verify the color of the background", "Ensure background color complies with the light theme design guidelines.", Priority.LOW, async () => {
      //   // Test logic here
      // });
  
      // // L.51
      // await runTest(driver, browser, Category.CSS, [SubCategory.Button], "Verify the intensity of the blur in the footer (Light Theme)", "Validate the blur effect in the light theme.", Priority.LOW, async () => {
      //   // Test logic here
      // });
  
      // // L.52
      // await runTest(driver, browser, Category.CSS, [SubCategory.Button], "Verify the color of the footer", "Ensure the light theme footer's color is correct.", Priority.LOW, async () => {
      //   // Test logic here
      // });
  
      // L.53
      await runTest(driver, browser, Category.CSS, [SubCategory.Nav, SubCategory.Radius], "Verify the radius of the toolbar", "Ensure the toolbar's corners match the design.", Priority.LOW, async () => {
        let toolbar = await driver.findElement(By.id('description'));
        let radius = await toolbar.getCssValue('border-radius');
        assert.strictEqual(radius, '0px 0px 20px 20px', 'The radius of the toolbar should be 0px 0px 20px 20px');
      });
  
      // L.54
      await runTest(driver, browser, Category.CSS, [SubCategory.Size], "Verify the size of the columns for the components", "Ensure columns are correctly sized for components.", Priority.MEDIUM, async () => {
        let guidelines = await driver.findElement(By.id('guidelines'));
        let columns = await guidelines.findElements(By.css('> div'));
        for (let column of columns) {
          let width = await column.getCssValue('width');
          let expectedWidth = await getWidthInPixels(driver, 16); // Convert 16vw to pixels
          let actualWidth = parseFloat(width.replace('px', '')); // Convert width to a number
          assert.strictEqual(actualWidth, expectedWidth, 'Each column should have a width of 16vw');
        }
      });
  
      // L.55
      await runTest(driver, browser, Category.JS, [SubCategory.Size], "Verify the size of the electricity flow", "Ensure the electricity flow's size is appropriate.", Priority.MEDIUM, async () => {
        let electricityFlow = await driver.findElement(By.className('animation'));
        let width = await electricityFlow.getCssValue('width');
        let expectedHeight = await getHeightInPixels(driver, 1.5); // Convert 1.5vh to pixels
        let actualHeight = parseFloat(width.replace('px', '')); // Convert width to a number
        assert.strictEqual(actualHeight, expectedHeight, 'The height of the electricity flow should be 1.5% of the screen');
      });
  
      // // L.56
      // await runTest(driver, browser, Category.CSS, [SubCategory.Button], "Verify the width of the wire based on screen size", "Check if wire width adapts to screen size.", Priority.MEDIUM, async () => {
      //   // Test logic here
      // });
  
      // // L.57
      // await runTest(driver, browser, Category.HTML, [SubCategory.Button], "Verify the name of the website", "Ensure the website's name displays correctly.", Priority.LOW, async () => {
      //   // Test logic here
      // });
  
      // // L.58
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the value of the current speed", "Check that the speed value updates properly.", Priority.MEDIUM, async () => {
      //   // Test logic here
      // });
  
      // // L.59
      // await runTest(driver, browser, Category.CSS, [SubCategory.Button], "Verify the size of the text", "Ensure the text's size is correct.", Priority.LOW, async () => {
      //   // Test logic here
      // });
  
      // // L.60
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify the displayed value of the zoom", "Check that the zoom level updates properly.", Priority.MEDIUM, async () => {
      //   // Test logic here
      // });
  
      // // L.61
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify the parser-sdf-to-json.PARSER transformation of a wire", "Ensure wire data converts correctly to JSON.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.62
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify the parser-json-to-HTML.js transformation of a wire", "Ensure wires render correctly in HTML.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.63
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify if the electricity's flow follows the right path", "Check if simulated electricity's flow follows logic.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.64
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify if the electricity's flow follows the right speed", "Ensure speed is accurate.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.65
      // await runTest(driver, browser, Category.CSS, [SubCategory.Button], "Verify if the animation of the electricity's flow runs correctly", "Validate that the electricity's flow animation is running.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.66
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify that the parser-sdf-to-json.js creates wire connections", "Ensure wires connect properly post-conversion.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.67
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify that the parser-sdf-to-json.js doesn't create duplicates", "Check if duplicate elements are avoided.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.68
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify that the parser-json-to-HTML creates a wire", "Ensure wires render correctly in HTML.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.69
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify that the parser-json-to-HTML connection of wires", "Validate wire connections in HTML output.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.70
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify that the parser-json-to-HTML doesn't create duplicates", "Ensure no duplicate elements exist.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.71
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify if the electricity follows the right path", "Check if simulated electricity behaves as required.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.72
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify if the electricity's flow follows the right speed", "Ensure speed is accurate.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.73
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify if the animation of the electric flow runs correctly", "Validate electricity animation.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.74
      // await runTest(driver, browser, Category.JS, [SubCategory.Button], "Verify that the parser-json-to-HTML creates a clock component", "Validate clock component rendering.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.75
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify that the parser-sdf-to-json.js create a flip-flop component", "Validate flip-flop component conversion.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.76
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify that the parser-json-to-HTML creates a flip-flop component", "Ensure flip-flop renders correctly.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.77
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify that the parser-json-to-HTML creates an input component", "Ensure input component renders properly.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.78
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify that the parser-json-to-HTML creates a LUT component", "Check LUT rendering.", Priority.HIGH, async () => {
      //   // Test logic here
      // });
  
      // // L.79
      // await runTest(driver, browser, Category.PARSER, [SubCategory.Button], "Verify that the parser-json-to-HTML creates an output component", "Validate output component in HTML.", Priority.HIGH, async () => {
        
      // });
  
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

function rgbToHex(rgba: string): string {
  const result = rgba.match(/\d+/g);
  if (!result || result.length < 4) {
    throw new Error('Invalid RGBA format');
  }
  const [r, g, b, a] = result.map(Number);
  const alpha = Math.round(a * 255 / 100); 
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

function uploadSDF(driver: WebDriver) {
  let uploadButton = driver.findElement(By.id('open-folder'));
  uploadButton.click();
  // Path to the valid test file
  const filePath = path.join(__dirname, 'test-files', 'example.sdf');
  console.log(filePath);
  // Find file input and upload the file
  const fileInput = driver.findElement(By.css('input[type="file"]'));
  fileInput.sendKeys(filePath);
  driver.sleep(500);
}

function getWidthInPixels(driver: WebDriver, vw: number) {
  return driver.executeScript(() => window.innerWidth).then((width) => (width as number) * vw / 100);
}

function getHeightInPixels(driver: WebDriver, vh: number) {
  return driver.executeScript(() => window.innerHeight).then((height) => (height as number) * vh / 100);
}