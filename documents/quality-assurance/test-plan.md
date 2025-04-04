# Test Plan - Web FPGA Team 4

## Table of Contents

<details close>
<summary>Click to expand</summary>

- [Test Plan - Web FPGA Team 4](#test-plan---web-fpga-team-4)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Scope](#scope)
    - [Out of Scope](#out-of-scope)
  - [Functional Areas Covered](#functional-areas-covered)
  - [Testing](#testing)
    - [Tools](#tools)
    - [Environment](#environment)
      - [Language](#language)
      - [Browsers](#browsers)
  - [Strategies](#strategies)
    - [Success/Failure Criteria](#successfailure-criteria)
    - [Testing Strategies](#testing-strategies)
  - [Timeline](#timeline)
    - [Functional Testing](#functional-testing)
    - [Unit Testing](#unit-testing)
    - [Creation of Logs](#creation-of-logs)
    - [Test Execution Failing](#test-execution-failing)
  - [Resources](#resources)

</details>

## Introduction

This document is the test plan for the Web FPGA Team 4 project. It will provide all the necessary information about the tests executed on the project.

### Scope

- Cover all functionalities of the project:
  - HTML
  - CSS
  - JavaScript
  - Parser code
- Execute tests on different browsers and versions
- Ensure compatibility with the majority of browsers
- Ensure the website responsiveness
- Verify the data processing from `.sdf` or `.json`
- Ensure the website is error-free
- Ensure the website is user-friendly and accessible
- Ensure the schematics are displayed correctly and quickly

### Out of Scope

- No database connection handling
- No SQL injection tests
- No security tests for the website

## Functional Areas Covered

Testing will be categorized into different types to ensure comprehensive coverage.

- **HTML**

 The **HTML** will be verified based on the Figma design provided by the program manager Maxime Caron, ensuring the right render depending on the size of all the screens approved to be used.

- **CSS**

 The **CSS** will be verified based on the Figma design provided by program manager Maxime Caron, ensuring the right render is more easily understood and clear to use.

- **JavaScript**

 The **JavaScript** will be verified based on the technical specification provided by the technical leader Emilien Chinsy, ensuring that the right information is passed from the parser to the `HTML` and `CSS`.

- **Parser**

 The **parser** will be verified based on the technical specification provided by the technical leader Emilien Chinsy, ensuring that the right information coming from the `.sdf` file is converted into `.json` and is usable by the JavaScript.

The following key functionalities will be tested:

- **UI Rendering**: Ensuring `html` & `css` match the approved Figma design.

- **Interactivity**: Testing user interactions such as clicks, form inputs, and dynamic content.

- **Data Processing**: Verifying that .sdf files are correctly converted into `.json` for visualization.

- **Responsiveness**: Ensuring UI adapts properly to different screen sizes.

- **Error Handling**: Validating how the system behaves with invalid inputs.

- **Cross-Browser Compatibility**: Testing in different browsers and versions.

## Testing

All the test cases will be stored in this [Google Sheet document](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?gid=1733092474#gid=1733092474) to keep track of what they are for, what they are testing, and how to test them.

### Tools

| Name | Description | Strengths |
| --- | --- | --- |
| [Render](https://render.com) | Render is a tool that allows you to see the result of your code in [real time](https://two024-2025-project-4-web-fpga-team-4.onrender.com/client.html). | Each time the code is pushed on GitHub, the website will be automatically updated. |
| [Figma](https://www.figma.com/) | Figma is a tool that allows creating [designs and prototypes](https://www.figma.com/design/A6rvzTJCZQQyznhdQbu753/FPGA-Web-App?node-id=0-1&t=d8dCzS37lNdcWJEG-1). | It will be used as a reference to create the current website. |
| [Selenium](https://www.selenium.dev) | Selenium is a tool that allows automating the tests. It will be used to test the code in different environments. | Provides multiple browsers to apply tests on (Safari, Edge, Firefox, Chrome). |
| [GitHub Actions](https://github.com/features/actions) | GitHub Actions is a tool that allows automating the tests. | Will be used to execute code, like reload render service and test directly on it. |

### Environment

#### Language

All the tests will be executed using the TypeScript language, ensuring that the code returns the right information where some information has to be identified as `string` or `number`.

#### Browsers

The tests will be conducted across a range of browser versions to ensure compatibility and responsiveness. The table below specifies the oldest and latest versions included in testing:

| Browser | Oldest Version Tested | Latest Version Tested |
| --- | :-: | :-: |
| [Chrome](https://chromereleases.googleblog.com) | 111.0 | 133.0 |
| [Firefox](https://www.mozilla.org/en-US/firefox/releases/) | 116.0 | 136.0 |
| [Safari](https://developer.apple.com/documentation/safari-release-notes) | 15 | 18 |
| [Edge](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-release-schedule) | 112 | 134 |

## Strategies

### Success/Failure Criteria

A test is considered passed if:

- The expected and actual results match.
- There are no UI rendering issues or broken layouts.
- No console errors appear in the browser developer tools.
- Automated tests execute without unexpected failures.

A test is considered failed if:

- The expected and actual results do not match.
- There are missing elements or incorrect styles.
- Errors appear in logs or UI crashes occur.
- Automated scripts detect inconsistencies.

Defect Severity Levels:

- **High**: Major feature is broken or not working.
- **Medium**: UI issues affecting usability.
- **Low**: Minor visual defects with no functional impact.

### Testing Strategies

The strategies for testing will include the following:

- **Hybrid Test Strategy**

 A hybrid test strategy will be employed, combining both manual and automated testing. This ensures comprehensive coverage and early detection of issues for all parts of the project, including HTML, CSS, JavaScript, and the parser.

- **Test Case Design**

Test cases will be designed based on the provided requirements and specifications. Each test case will be created in this [Google Sheet document](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?gid=1733092474#gid=1733092474) and have to include the next information:

 | Date | ID | Version | Category | Sub-Category | Name | Description | Passed | Expected | Actual | Priority |
 | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
 | 2025-03-14 | 1-Chrome-112-HTML | 112 | HTML | Text | Title Homepage | Verify that the homepage title is correct | False | FPGA Web Visualizer | Client Side | Low |
 | 2025-03-14 | 2-Chrome-112-HTML | 112 | HTML | Size | Components' size | Ensure that component sizes are correct | True | | | High |

> [!NOTE]
> Test case IDs are structured based on the browser version and test category.

- **Test Data Management**

 Test data will be created and managed to ensure that all possible scenarios are covered. This includes both positive and negative test cases.

- **Test Automation**

 Automation tools like Selenium and GitHub Actions will be used to automate repetitive test cases, ensuring faster and more reliable test execution.

- **Continuous Integration**

 Continuous integration practices will be followed to ensure that code changes are automatically tested and integrated before being merged into the main branch.

- **Defect Management**

 Defects found during testing will be logged, tracked, and managed using a defect-tracking tool. Each defect will be assigned a priority and severity level.

All the tests are stored in the `logs` folder and also reported in the [Google Sheet document](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?usp=sharing) to keep track of all the tests. They also have to be reported on [GitHub](https://github.com/algosup/2024-2025-project-4-web-fpga-team-4/issues) as issues when failed.

Here you can find all the tests that have been executed for:

- [Firefox](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?gid=563900058#gid=563900058)
- [Chrome](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?gid=1142666561#gid=1142666561)
- [Safari](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?gid=1276776256#gid=1276776256)
- [Edge](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?gid=1878739529#gid=1878739529)

## Timeline

### Functional Testing

The functional tests will be executed on the website to ensure that the `HTML` and `CSS` code is working as expected.

The creation of the functional tests will be done in three steps:

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
await runTest(driver, browser, Category.HTML, [SubCategory.Text], 'Title Homepage', 'Check if the title is correct', Priority.LOW, async () => {
  const title = await driver.getTitle();
 assert.strictEqual("Client Side", title);
});
```

### Unit Testing

The unit tests will be executed on the code to ensure that the `javascript` and `parser` code is working as expected.

The creation of the unit tests will be done in two steps:

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

### Creation of Logs

- **When pushing**
  
 On the repository in the `dev` branch or `QA` branch.

- **When Pull Request**
  
 On the repository in the `dev` branch.

The logs `.json` will be created and stored in the `logs` folder of the repository with this naming convention:

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
        "priority": "low",
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

### Test Execution Failing

In case a test does not run properly, the software engineer and the quality assurance have access to commands to run the test on their computer.

| OS | Terminal | Command |
| --- | --- | --- |
| Windows | cmd | `npx tsc && for %i in (*.js) do node %i` |
| Windows | powershell | `npx tsc; Get-ChildItem -Filter *.js; ForEach-Object { node $_.FullName }` |
| Mac | Terminal | `npx tsc; for file in *.js; do node \"$file\"; done;` |
| Linux | Terminal | `npx tsc; for file in *.js; do node \"$file\"; done;` |

> [!NOTE]
> If you use those commands make sure all the browsers are installed on your computer.

> [!WARNING]
> You cannot test the `Safari` browser on a Windows computer.

## Resources

- [Figma Design](https://www.figma.com/design/A6rvzTJCZQQyznhdQbu753/FPGA-Web-App?node-id=0-1&t=d8dCzS37lNdcWJEG-1)
- [Technical Specification](../technical-specifications/technical-specifications.md)
- [SDF Files](https://github.com/LeFl0w/ALGOSUP_POC/tree/update2)
- [Google Sheet Document](https://docs.google.com/spreadsheets/d/1xgYoYAgcqF_BHnA5TA75yskmWWzZK-nytPPwedQnjcw/edit?gid=540791436#gid=540791436)