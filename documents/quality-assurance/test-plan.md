# Test Plan - Web FPGA Team 4

## Table of Contents

- [Test Plan - Web FPGA Team 4](#test-plan---web-fpga-team-4)
  - [Table of Contents](#table-of-contents)
  - [1. **Introduction**](#1-introduction)
  - [2. **Types**](#2-types)
  - [3. **Testing**](#3-testing)
    - [3.1. **Tools**](#31-tools)
    - [3.2. **Environment**](#32-environment)
      - [3.2.1. **Language**](#321-language)
      - [3.2.2. **Browsers**](#322-browsers)
  - [4. **Strategies**](#4-strategies)
  - [5. **Timeline**](#5-timeline)
    - [5.1. **Functional Testing**](#51-functional-testing)
    - [5.2. **Unit Testing**](#52-unit-testing)
    - [5.3. **Creation of logs**](#53-creation-of-logs)
    - [5.4. **Test Execution Failing**](#54-test-execution-failing)
  - [LAST. **Resources**](#last-resources)

## 1. **Introduction**

This document is the test plan for the Web FPGA Team 4 project. It will provide all the necessary information about the tests that will be executed on the project.

- **Project Name:** Web FPGA Team 4
- **Version:** 0.5.0
- **Date:** 02/28/2025
- **Prepared By:** [Guillaume DESPAUX](https://github.com/guillaumedespaux)

## 2. **Types**

The tests will be separated into 4 main categories:

- **HTML**

  The **HTML** will be verified based on the Figma design provided by the program manager Maxime Caron, ensuring the right render depending on the size of all the screens approved to be used.

- **CSS**

  The **CSS** will be verified based on the Figma design provided by the program manager Maxime Caron, ensuring the right render to be more easily understood and clear to be used.

- **JavaScript**

  The **JavaScript** will be verified based on the technical specification provided by the technical leader Emilien Chinsy, ensuring that the right information is passed from the parser to the `html` and `css`.

- **Parser**

  The **parser** will be verified based on the technical specification provided by the technical leader Emilien Chinsy, ensuring that the right information coming from the `.sdf` file is converted into `.json` and is usable by the JavaScript.

## 3. **Testing**

### 3.1. **Tools**

|Name|Description|Strengths|
|---|---|---|
|[Render](https://render.com)|Render is a tool that allows you to see the result of your code in [real time](https://two024-2025-project-4-web-fpga-team-4.onrender.com/client.html).|Each time the code is pushed on GitHub, the website will be automatically updated.|
|[Figma](https://www.figma.com/)|Figma is a tool that allows creating [designs and prototypes](https://www.figma.com/design/A6rvzTJCZQQyznhdQbu753/FPGA-Web-App?node-id=0-1&t=d8dCzS37lNdcWJEG-1).|It will be used as a reference to create the current website.|
|[Selenium](https://www.selenium.dev)|Selenium is a tool that allows automating the tests. It will be used to test the code in different environments.|Provides multiple browsers to apply tests on (Safari, Edge, Firefox, Chrome).|
|[GitHub Actions](https://github.com/features/actions)|GitHub Actions is a tool that allows automating the tests.|Will be used to execute code, like reload render service and test directly on it.|

### 3.2. **Environment**

#### 3.2.1. **Language**

All the tests will be executed using the TypeScript language, ensuring that the code returns the right information where some information has to be identified as `string` or `number`.

#### 3.2.2. **Browsers**

The tests will be using different browsers on multiple versions to ensure that the code is responsive and usable on the majority of the browsers.

|Browser|Oldest Version Tested|Last Version Tested|
|---|:-:|:-:|
|[Chrome](https://chromereleases.googleblog.com)|Version 111.0|Version 133.0|
|[Firefox](https://www.mozilla.org/en-US/firefox/releases/)|Version 116.0|Version 136.0|
|[Safari](https://developer.apple.com/documentation/safari-release-notes)|Version 15|Version 18|
|[Edge](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-release-schedule)|Version 112|Version 134|

## 4. **Strategies**

The strategies for testing will include the following:

- **Hybrid Test Strategy**

  A hybrid test strategy will be employed, combining both manual and automated testing. This ensures comprehensive coverage and early detection of issues for all parts of the project, including HTML, CSS, JavaScript, and the parser.

- **Test Case Design**

  Test cases will be designed based on the requirements and specifications provided. Each test case will include the test steps, expected results, and actual results.

  |Date|ID|Version|Category|Sub-Category|Name|Description|Passed|Expected|Actual|
  |---|---|---|---|---|---|---|---|---|---|
  |2025-03-14|1-Chrome-112-HTML|112|HTML|Text|Title Homepage|Check if the title is correct|False|FPGA Web Visualizer|Client Side|
  |2025-03-14|2-Chrome-112-HTML|112|HTML|Size|Components' size|Check if the sizes are correct|True|||

> [!NOTE]
> The ID's are created based on the version of the browser and the category of the test.

- **Test Data Management**

  Test data will be created and managed to ensure that all possible scenarios are covered. This includes both positive and negative test cases.

- **Test Automation**

  Automation tools like Selenium and GitHub Actions will be used to automate repetitive test cases, ensuring faster and more reliable test execution.

- **Continuous Integration**

  Continuous integration practices will be followed to ensure that code changes are automatically tested and integrated into the main branch.

- **Defect Management**

  Defects found during testing will be logged, tracked, and managed using a defect tracking tool. Each defect will be assigned a priority and severity level.

All the tests are stored in the `logs` folder and also reported in the [Google Sheet document](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?usp=sharing) to keep track of all the tests, they also have to be reported on [GitHub](https://github.com/algosup/2024-2025-project-4-web-fpga-team-4/issues) by issues when failed.

Here you can find all the tests that have been executed for:

- [Firefox](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?gid=563900058#gid=563900058)
- [Chrome](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?gid=1142666561#gid=1142666561)
- [Safari](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?gid=1276776256#gid=1276776256)
- [Edge](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?gid=1878739529#gid=1878739529)

## 5. **Timeline**

### 5.1. **Functional Testing**

The functional tests will be executed on the website to ensure that the `html` and `css` code is working as expected.

The creation of the functional tests will be done in 3 steps:

1. Selection of the browser
   - Chrome
   - Firefox
   - Safari
   - Edge
2. Creation of the test
   - Category
   - Sub-category
   - Name
   - Description
   - Type
   - Label
   - Expected
3. Verification of the test
   - Passed
   - Error

Example of a test:

```typescript
await runTest(driver, browser, Category.HTML, SubCategory.Text, 'Title Homepage', 'Check if the title is correct', Priority.HIGH, async () => {
  const title = await driver.getTitle();
  assert.strictEqual("Client Side", title);
});
```

### 5.2. **Unit Testing**

The unit tests will be executed on the code to ensure that the `javascript` and `parser` code is working as expected.

The creation of the unit tests will be done in 2 steps:

1. Creation of the test
    - Category
    - Sub-category
    - Name
    - Description
    - Type
    - Label
    - Expected
2. Verification of the test
    - Passed
    - Error

### 5.3. **Creation of logs**

- **When pushing**
  
  On the repository in the `dev` branch or `QA` branch.
- **When Pull Request**
  
  On the repository in the `dev` branch.

The logs `.json` will be created and stored in the `logs` folder of the repository with this name convention:

`date-of-the-test-browser-unit-test-html-css.json`

`2025-03-14-chrome-unit-test-html-css.json`

The logs will contain the following information:

  ```json
  "summary": "Test Summary for file: chrome-unit-test-html-css.js",
  "date": "2025-03-14",
  "results": [
    {
      "browser": "chrome",
      "version": "133.0",
      "test": {
        "category": "HTML",
        "sub-category": "Text",
        "name": "Home Page Title",
        "description": "Check if the title is correct",
        "priority": "high",
        "passed": false,
        "error": {
          "generatedMessage": true,
          "code": "ERR_ASSERTION",
          "actual": "Client Side",
          "expected": "FPGA Web Visualizer",
          "operator": "strictEqual"
        }
      }
    }
  ]
  ```

### 5.4. **Test Execution Failing**

In case a test does not run properly, the software engineer and the quality assurance have access to commands to run the test on their computer.

|OS|Terminal|Command|
|---|---|---|
|Windows|cmd|`npx tsc && for %i in (*.js) do node %i`|
|Windows|powershell|`npx tsc; Get-ChildItem -Filter *.js; ForEach-Object { node $_.FullName }`|
|Mac|Terminal|`npx tsc; for file in *.js; do node \"$file\"; done;`|
|Linux|Terminal|`npx tsc; for file in *.js; do node \"$file\"; done;`|

>[!NOTE]
> If you use those commands make sure all the browsers are installed on your computer.

>[!WARNING]
> You cannot test the `Safari` browser on a Windows computer.

## LAST. **Resources**

- [Technical Specification](../technical-specifications/technical-specifications.md)
- [SDF File](https://github.com/LeFl0w/ALGOSUP_POC/tree/update2)