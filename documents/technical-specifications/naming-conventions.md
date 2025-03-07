# Naming Conventions Web FPGA Team 4

<details>
<summary> Table Of Content </summary>

- [Naming Conventions Web FPGA Team 4](#naming-conventions-web-fpga-team-4)
  - [Document Overview](#document-overview)
  - [Naming Conventions](#naming-conventions)
    - [Branches, Folders \& Files](#branches-folders--files)
      - [Functions and Methods in TypeScript](#functions-and-methods-in-typescript)
      - [Variables in TypeScript](#variables-in-typescript)
      - [Element Names (HTML)](#element-names-html)
      - [ID's and Classes (HTML)](#ids-and-classes-html)
      - [Close All HTML Elements](#close-all-html-elements)
      - [Always Quote Attribute Values](#always-quote-attribute-values)
      - [Comments](#comments)
      - [Indentation \& Spacing](#indentation--spacing)
  - [Commit Naming Convention](#commit-naming-convention)
    - [Commit Types](#commit-types)
    - [Format Guidelines](#format-guidelines)
    - [Examples](#examples)
  - [Mistakes to avoid](#mistakes-to-avoid)

</details>

## Document Overview

This document guides individuals who wish to contribute to the project. It outlines the naming conventions for branches, folders, files, functions, variables, and other elements to ensure consistency, readability, and maintainability across the project.

---

## Naming Conventions

### Branches, Folders & Files

- **Branches, folders, and files** should follow kebab-case naming conventions. Examples:
  - Branches: `feature-implementation`, `bug-fix-login-page`
  - Folders: `front-end`, `back-end`
  - Files: `index.html`, `file-converter.js`

- Avoid special characters other than hyphens, spaces, and overly long names.
- Use meaningful names that describe the purpose or content.

---

#### Functions and Methods in TypeScript

- **Naming Convention:** camelCase (lowercase the first word and capitalize all the others).
- Do this:
  - `convertSDFToJSON()`
  - `convertVToJSON()`
- Don't do this:
  - `ConvertSDFToJSON()`
  - `Convert-V-To-JSON()`

#### Variables in TypeScript

- **Naming Convention:** snake_case (lowercase, words seperated by underscores).
- Do this:
  - `input_File`
  - `temp`
- Don't do this:
  - `inputfile`
  - `Temp`

#### Element Names (HTML)

- **Naming Convention:** only use lowercase element names.
- Do this:
  ```html
    <body></body>
    <p></p>
  ```
- Don't do this:
  ```html
    <BODY></BODY>
    <P></P>
  ```

#### ID's and Classes (HTML)

- **Naming Convention:** kebab-case(only use lowercase letters and hyphens between words).
- Do this:
  ```html
    <body class="top-box"></body>
    <p id="important-text"></p>
  ```
- Don't do this:
  ```html
    <body class="topBox"></body>
    <p id="important_text"></p>
  ```

#### Close All HTML Elements

- In HTML, you technically do not have to close all elements, however, for this project you have to close all HTML elements to make it easier to read the code.
- Do this:
  ```html
    <section>
      <p>this is a paragraph</p>
    </section>
  ```

- Don't do this:
  ```html
    <section>
      <p>this is a paragraph
    </section>
  ```

#### Always Quote Attribute Values

- HTML allows attribute values without quotes, however, for this project you have to quote all attribute values to make it easier to read the code.
- Do this:
  ```html
    <h1 class="big-title">
  ```
- Don't do this:
  ```html
    <h1 class=big-title>
  ```

#### Comments

- Use block comments (/**/).
  - Example:
    - `/* this is an example comment */`

- Ensure all functions and complex code segments are well-documented with comments explaining their purpose.
  - Example:

```TypeScript
/*
 * Convert a JSON file to a Javascript object and display the parsed data on the webpage.
 * 
 * @param {string} filepath - The path to the JSON file
 */
async function parseJsonFile();
```

#### Indentation & Spacing

- In HTML, add blank linkes to seperate large or logical code blocks also, use tab for indentation for everything.
  - Do this:
  ```html
  <body>

    <h1>Famous Cities</h1>
  
  </body>
  ```
- Ensure consistent spacing around operators, classes and id's and after commas for better readability:
  ```TypeScript
    c = a + b;
  ```

---

## Commit Naming Convention

Commit messages should follow a consistent format to make it easier to understand what changes have been made and why. Each commit message should include:

1. **Type of Change** (keyword in uppercase)
2. **Short Description** (clear and concise summary of the change)
3. **Optional Details** (brief explanation of why the change was made or additional context)

### Commit Types

- **FIX**: Use this for bug fixes or corrections.
  - Example: `FIX: Resolve crash issue on login page`
  - Optional Details: `Corrected a null pointer exception caused by missing user input validation.`

- **FEAT**: Use this for new features or functionalities.
  - Example: `FEAT: Add shortest path calculation algorithm`
  - Optional Details: `Implemented Dijkstra's algorithm for improved route optimization.`

- **UPDATE**: Use this for updates, enhancements, or improvements to existing code, features, or documentation.
  - Example: `UPDATE: Optimize rendering speed for game graphics`
  - Optional Details: `Reduced frame drop issues by caching assets more efficiently.`

- **DELETION**: Use this for deletions, removals of deprecated code, or redundant files.
  - Example: `DELETION: Remove unused class NodeManager`
  - Optional Details: `The class was no longer relevant after refactoring.`

- **DOC**: Use this for modification, creation, or deletion made to document(s).
  - Example: `DOC: Creation of technical-specifications.md`
  - Optional Details: `Added table of content`

### Format Guidelines

1. **Message Structure**:
   - TYPE: (Short Description) (Optional Details)

2. **Short Description**:

- Must be clear, concise, and written in an imperative mood (e.g, "Fix bug," not "Fixed bug").
- Limit to 50 characters or fewer if possible.

3. **Optional Details**:

- Provide additional context or explain the rationale for the change if necessary.
- Can include technical details, references to tickets/issues, or any notes for reviewers.

### Examples

- **FIX**: Correct off-by-one error in loop Adjusted index range to properly iterate over all elements.

- **FEAT**: Add user authentication functionality Includes token-based login and logout processes.

- **UPDATE**: Refactor code in GameController class Improved readability and reduced duplicate code.

- **DELETION**: Remove obsolete config files Replaced with a new configuration system in the latest update.

---

## Mistakes to avoid

- Inconsistent naming styles: Avoid mixing camelCase and PascalCase within the same context.

- Overly long names: Use concise but descriptive names.
  - ❌ CalculateTheDistanceBetweenTwoNodesForPathFinding
  - ✅ CalculateNodeDistance

> [!CAUTION]
> Unclear abbreviations: Avoid cryptic abbreviations that are not self-explanatory.