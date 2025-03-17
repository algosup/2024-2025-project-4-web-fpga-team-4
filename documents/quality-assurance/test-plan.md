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

This document is the test plan for the Web FPGA Team 4 project. It will provide all the necessary information about the test that will be executed on the project.

- **Project Name:** Web FPGA Team 4
- **Version:** 0.5.0
- **Date:** 02/28/2025
- **Prepared By:** [Guillaume DESPAUX](https://github.com/guillaumedespaux)

## 2. **Types**

The tests will be separated into 4 main categories:

- **HTML**

  The **HTML** will be verified based on the figma design provided by the program manager Maxime Caron. Ensuring the right render depending the size of all the screen approved to be used.

- **CSS**

  The **CSS** will be verified based on the figma design provided by the program manager Maxime Caron. Ensuring the right render to be more easy to understand and clear to be used.

- **JavaScript**

  The **JavaScript** will be verified based on the technical specification provided by the technical leader Emilien Chinsy. Ensuring that the right information are passed from the parser to the `html` and `css`.

- **Parser**

  The **parser** will be verified based on the technical specification provided by the technical leader Emilien Chinsy. Ensuring that the right information coming from `.sdf` file are converted into `.json` and are usable by the javascript.

## 3. **Testing**

### 3.1. **Tools**

|Name|Description|Strengths|
|---|---|---|
|[Render](https://render.com)|Render is a tool that allows you to see the result of your code in [real time](https://two024-2025-project-4-web-fpga-team-4.onrender.com/client.html).|Each times the code will be pushed on Github the website will be automatically updated.|
|[Figma](https://www.figma.com/)|Figma is a tool that allows to create [designs and prototypes](https://www.figma.com/design/A6rvzTJCZQQyznhdQbu753/FPGA-Web-App?node-id=0-1&t=d8dCzS37lNdcWJEG-1).|It will be used as a reference to create the current website.|
|[Selenium](https://www.selenium.dev)|Selenium is a tool that allows to automate the tests. It will be used to test the code in different environments.|Provides multiples browser to apply test on (Safari, Edge, Firefox, Chrome).|
|[Github Actions](https://github.com/features/actions)|Github Actions is a tool that allows to automate the tests.|Will be used to execute code, like reload render service and test directly on it.|

### 3.2. **Environment**

#### 3.2.1. **Language**

All the tests will be executed using the TypeScript language, ensuring that the code returns the right information where some information have to be identified as `string` or `number`.

#### 3.2.2. **Browsers**

The tests will be using different browsers on multiples version to ensure that the code is responsive and usable on the majority of the browsers.

|Browser|Oldest Version Tested|Last Version Tested|
|---|:-:|:-:|
|[Chrome](https://chromereleases.googleblog.com)|Version 111.0|Version 133.0|
|[Firefox](https://www.mozilla.org/en-US/firefox/releases/)|Version 116.0|Version 136.0|
|[Safari](https://developer.apple.com/documentation/safari-release-notes)|Version 15|Version 18|
|[Edge](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-release-schedule)|Version 112|Version 134|

## 4. **Strategies**

The strategies for testing will include the following:

- **Hybrid Test Strategy**

  An hybrid test strategy will be employed, combining both manual and automated testing. This ensures comprehensive coverage and early detection of issues for all parts of the project, including HTML, CSS, JavaScript, and the parser.

- **Test Case Design**

  Test cases will be designed based on the requirements and specifications provided. Each test case will include the test steps, expected results, and actual results.

- **Test Data Management**

  Test data will be created and managed to ensure that all possible scenarios are covered. This includes both positive and negative test cases.

- **Test Automation**

  Automation tools like Selenium and GitHub Actions will be used to automate repetitive test cases, ensuring faster and more reliable test execution.

- **Continuous Integration**

  Continuous integration practices will be followed to ensure that code changes are automatically tested and integrated into the main branch.

- **Defect Management**

  Defects found during testing will be logged, tracked, and managed using a defect tracking tool. Each defect will be assigned a priority and severity level.

## 5. **Timeline**

### 5.1. **Functional Testing**

The functional tests will be executed on the website to ensure that the `html` and `css` code is working as expected.

The creation of the functional tests will be done in 4 steps:

1. Selection of the browser
   - Chrome
   - Firefox
   - Safari
   - Edge
2. Selection of the version
    - Oldest
    - Last
3. Creation of the test
   - Name
   - Description
   - Type
   - Label
   - Expected
4. Verification of the test
   - Passed
   - Error

### 5.2. **Unit Testing**

The unit tests will be executed on the code to ensure that the `javascript` and `parser` code is working as expected.

The creation of the unit tests will be done in 2 steps:

1. Creation of the test
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
        "name": "Title Test",
        "description": "Check if the title is correct",
        "priority": "high",
        "type": [
          "typo"
        ],
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

In case where a test do not run properly, the software engineer and the quality assurance have access to command to run the test on their computer.

|Os|Terminal|Command|
|---|---|---|
|Windows|cmd|`?`|
|Windows|powershell|`?`|
|Mac|Terminal|`npx tsc; for file in *.js; do node \"$file\"; done;`|
|Linux|Terminal|`npx tsc; for file in *.js; do node \"$file\"; done;`|

>[!NOTE]
> If you use those commands make sure all the browser are installed on your computer.

## LAST. **Resources**

- [Technical Specification](../technical-specifications/technical-specifications.md)
- [SDF File](https://github.com/LeFl0w/ALGOSUP_POC/tree/update2)
