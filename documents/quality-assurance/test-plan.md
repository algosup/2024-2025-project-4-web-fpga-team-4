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
      - [3.2.2. **Browser**](#322-browser)
  - [4. **Timeline**](#4-timeline)
    - [4.1. **Creation of unit test**](#41-creation-of-unit-test)
    - [4.2. **Creation of logs**](#42-creation-of-logs)
    - [4.3. **Unit Test Failing**](#43-unit-test-failing)
  - [5. **What Is Going To Be Tested**](#5-what-is-going-to-be-tested)
  - [LAST. **Resources**](#last-resources)


## 1. **Introduction**

- **Project Name:** Web FPGA Team 4
- **Version:** 0.1.0
- **Date:** 02/28/2025
- **Prepared By:** [Guillaume DESPAUX](https://github.com/guillaumedespaux)

This file provides all the necessary information about how/what/when does the test needs to be integrated.

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

|Logo|Name|Description|
|---|---|---|
|<img src="./images/render.png" alt="render" style="min-width:75px; max-width:75px; min-height:75px; max-height:75px;">|[Render](https://render.com)|Render is a tool that allows you to see the result of your code in [real time](https://two024-2025-project-4-web-fpga-team-4.onrender.com/client.html).|
|<img src="./images/figma.png" alt="figma" style="min-width:75px; max-width:75px; min-height:75px; max-height:75px;">|[Figma](https://www.figma.com/)|Figma is a tool that allows to create [designs and prototypes](https://www.figma.com/design/A6rvzTJCZQQyznhdQbu753/FPGA-Web-App?node-id=0-1&t=d8dCzS37lNdcWJEG-1). It will be used as a reference to see if the code is well implemented.|
|<img src="./images/selenium.png" alt="selenium" style="min-width:75px; max-width:75px; min-height:75px; max-height:75px;">|[Selenium](https://www.selenium.dev)|Selenium is a tool that allows to automate the tests. It will be used to test the code in different environments.|
|<img src="./images/actions.png" alt="github actions" style="min-width:75px; max-width:75px; min-height:75px; max-height:75px;">|[Github Actions](https://github.com/features/actions)|Github Actions is a tool that allows to automate the tests. It will be used to test the code in different environments.|

### 3.2. **Environment**

#### 3.2.1. **Language**

All the tests will be executed using the TypeScript[^1] language, ensuring that the code returns the right information where some information have to be identified as `string` or `number`.

#### 3.2.2. **Browser**

The tests will be using different browsers on multiples version to ensure that the code is responsive and usable on the majority of the browsers.

|Browser|Oldest Version Tested|Last Version Tested|
|---|:-:|:-:|
|[Chrome](https://chromereleases.googleblog.com)|Version 111.0|Version 133.0|
|[Firefox](https://www.mozilla.org/en-US/firefox/releases/)|Version 116.0|Version 136.0|
|[Safari](https://developer.apple.com/documentation/safari-release-notes)|Version 15|Version 18|
|[Edge](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-release-schedule)|Version 112|Version 134|

## 4. **Timeline**

### 4.1. **Creation of unit test**

The creation of the unit test will be done in 4 steps:

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

### 4.2. **Creation of logs**

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

### 4.3. **Unit Test Failing**

In case where a unit test is failing, the software engineer and the quality assurance have access to command to run the test on their computer.

|Os|Terminal|Command|
|---|---|---|
|Windows|cmd|`?`|
|Windows|powershell|`?`|
|Mac|Terminal|`npx tsc; for file in *.js; do node \"$file\"; done;`|
|Linux|Terminal|`npx tsc; for file in *.js; do node \"$file\"; done;`|

>[!NOTE]
> If you use those commands make sure all the browser are installed on your computer.

## 5. **What Is Going To Be Tested**

<!-- - what i test and what i don't test
- why does the test pass or not
  - eg. figma
- it is a real bug or not -->

## LAST. **Resources**

- [Technical Specification](../technical-specifications/technical-specifications.md)
- [SDF File](https://github.com/LeFl0w/ALGOSUP_POC/tree/update2)
