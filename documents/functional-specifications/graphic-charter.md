<div align="center">

# Graphic Charter

---
**Title:** FPGA Explorer - Team 4

**Author:** Maxime CARON

**Team:** Team 4

**Reviewer:** Guillaume Despaux

**Created on:** February 25<sup>th</sup>, 2025

**Last updated:** March 12<sup>th</sup>, 2025

</div>

---

<summary><h2 id="toc"> Table of Contents <i>(Click to expand)</i></h2></summary>

<details>

- [Graphic Charter](#graphic-charter)
  - [Preamble](#preamble)
  - [Glossary](#glossary)
  - [1. Logo and Branding](#1-logo-and-branding)
    - [1.1. Logo](#11-logo)
    - [1.2. Branding](#12-branding)
  - [2. Color Palette](#2-color-palette)
    - [2.1. Base Palette (Light Mode)](#21-base-palette-light-mode)
    - [2.2. Dark Mode Palette](#22-dark-mode-palette)
    - [2.3. FPGA Palette](#23-fpga-palette)
  - [3. Typography](#3-typography)
    - [3.1. Font Families](#31-font-families)
    - [3.2. Typography Hierarchy](#32-typography-hierarchy)
  - [4. Layout Guidelines](#4-layout-guidelines)
    - [Overall Page Structure](#overall-page-structure)
  - [5. Imagery and Icons](#5-imagery-and-icons)
    - [Style](#style)
  - [6. Interactivity Elements](#6-interactivity-elements)
    - [Buttons](#buttons)
  - [7. Light and Dark Mode Switching](#7-light-and-dark-mode-switching)
    - [7.1. Toggle Control](#71-toggle-control)
    - [7.2. Style Adaptation](#72-style-adaptation)
  - [8. Maintenance and Expansion](#8-maintenance-and-expansion)
    - [Design Tokens](#design-tokens)

</details>

---

## Preamble
*This charter establishes a visual identity and sets stylistic rules to ensure consistency across all pages of the application. It covers branding, color palettes, typography, layout guidelines, and interactivity elements.*

---

## Glossary  


| Term              | Definition                                                                                                                                                      |
|-------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Branding**      | The overall visual identity including logo, color palette, typography, and imagery that conveys the brand’s values and style.                                   |
| **Color Palette** | A defined set of colors used consistently throughout the interface, including separate specifications for Light Mode, Dark Mode, and specialized FPGA elements. |
| **Typography**    | The style, arrangement, and appearance of text, covering font families, sizes, weights, and hierarchy (e.g., headings, body, code).                             |
| **Design Tokens** | A centralized collection of style values (colors, fonts, spacing, etc.) used to ensure consistency and facilitate maintenance across the design system.         |
| **Responsive Design** | A design approach that ensures the layout and components adapt seamlessly to different screen sizes and resolutions.                                        |
| **SVG**           | Scalable Vector Graphics, a file format for vector-based images that ensures icons and graphics can scale without quality loss.                                 |
| **Contrast Ratio** | A metric defining the luminance difference between text and background colors. A minimum ratio of 4.5:1 is required for accessibility.                         |
| **Light Mode**    | A color theme using lighter backgrounds with darker text, optimized for well-lit environments.                                                                  |
| **Dark Mode**     | A color theme using darker backgrounds with lighter text, suitable for low-light environments.                                                                  |

---

## 1. Logo and Branding

### 1.1. Logo
- **Position & Placement**
  - The logo is placed in the top left of the header.
  - Original proportions must be maintained—no stretching or skewing is permitted.
  - A minimum margin of 15 pixels must be maintained around all sides of the logo.

### 1.2. Branding
- **Approach:**  
  The branding is kept minimal and professional, with emphasis on clarity and usability.
- **Elements:**
  - **Color Palette:** A limited set of colors is used to maintain consistency.
  - **Typography:** A clear, readable font is used for all text elements.
  - **Imagery:** Minimalist icons and vector graphics are used to ensure a clean look.

---

## 2. Color Palette

### 2.1. Base Palette (Light Mode)

- **Primary Color:** `#0D1B2A`
  - **Usage:** Key interactive elements (buttons, icons), headers, and major highlights.
- **Text Color:** `#0D1B2A`
  - **Usage:** Standard body text.
- **Secondary Color:** `#1B263B`
  - **Usage:** Accents, hover states, or smaller UI elements requiring emphasis.
- **Background Color:** `#E0E1DD`
  - **Usage:** Main page background for optimal contrast with text.
  - **Variation:** `#415A77` may be used for subtle section distinctions.

> **Note:** A contrast ratio of at least 4.5:1 must always be maintained between text and background to ensure accessibility for users with visual impairments.

### 2.2. Dark Mode Palette

- **Primary Color:** `#E0E1DD`
  - **Usage:** Key interactive elements (buttons, icons), headers, and major highlights.
- **Text Color:** `#E0E1DD`
  - **Usage:** Standard body text.
- **Secondary Color:** `#415A77`
  - **Usage:** Accents, hover states, or smaller UI elements requiring emphasis.
- **Background Color:** `#0D1B2A`
  - **Usage:** Main page background for optimal contrast with text.
  - **Variation:** `#1B263B` may be used for subtle section distinctions.

### 2.3. FPGA Palette

- **Look-Up Table (LUT):**
  - Light mode: `#15BF9A`
  - Dark mode: `#15BF9A`
- **Flip Flop:**
  - Light mode: `#BF1518`
  - Dark mode: `#BF1518`
- **Input and Outputs (I/O):**
  - **Inputs:**
    - Light mode: `#E0E1DD`
    - Dark mode: `#E0E1DD`
  - **Outputs:**
    - Light mode: `#DDB72B`
    - Dark mode: `#DDB72B`
- **Wires:**
  - **Powered:**
    - Light mode: `#00EB14`
    - Dark mode: `#00EB14`
  - **Unpowered:**
    - Light mode: `#68111A`
    - Dark mode: `#68111A`
- **Clock:**
  - Light mode: `#EEAD0A`
  - Dark mode: `#E1FF00`
- **Notice Message:**
  - **Background:**
    - Light mode: `#80BDEB`
    - Dark mode: `#80BDEB`
  - **Text:**
    - Light mode: `#235DE4`
    - Dark mode: `#235DE4`
  - **Border:**
    - Light mode: `#325BD7`
    - Dark mode: `#325BD7`
- **Error Message:**
  - **Background:**
    - Light mode: `#DA9595`
    - Dark mode: `#DA9595`
  - **Text:**
    - Light mode: `#C71303`
    - Dark mode: `#C71303`
  - **Border:**
    - Light mode: `#D01100`
    - Dark mode: `#D01100`

> **Note:** When specific elements are not in active use, they will default to the fallback color `#5B5151`.

---

## 3. Typography

### 3.1. Font Families

- **Headings:**
  - **Preferred:** IBM Plex Mono (available from [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Mono))
  - **Fallback:** A modern sans-serif font (e.g., Roboto)
  - **Weight:** Bold for clarity and emphasis.
  - **Suggested Sizes:**
    - H1: 32–36px
    - H2: 24–28px
    - H3: 18–20px
- **Body Text:**
  - **Preferred:** IBM Plex Mono or Roboto Mono.
  - **Weight:** Regular (400).
  - **Size:** 14–16px on desktop.
  - **Line-height:** 1.4–1.6 for optimal readability.
- **Code / Technical Snippets:**
  - A monospaced variant (e.g., IBM Plex Mono) is used.
  - Code blocks should have a distinct background or border to differentiate them from regular text.

### 3.2. Typography Hierarchy

- **H1:** Primary page titles.
- **H2:** Section titles.
- **H3:** Subsection or tertiary titles.
- **Body Text:** Regular paragraphs and descriptive text.
- **Links:** Should be underlined or color-coded to ensure visibility and indicate interactivity.

---

## 4. Layout Guidelines

### Overall Page Structure

- **Header (Top Bar):**
  - Allocates approximately 15% of the vertical space on desktop screens.
  - Contains the logo, main navigation, settings, and theme toggle.
  - Remains fixed at the top for continuous accessibility.
- **Side Bar (Toggleable, Right):**
  - Occupies around 20% of the horizontal space on desktop.
  - Is collapsible to maximize the central content area.
- **Canvas (Main Content Area):**
  - Uses approximately 85% of the vertical space.
  - Designed to be responsive, ensuring key interactions remain accessible on various screen sizes.
  - **Comment:** If further specifics on responsive breakpoints are needed, please provide them.

---

## 5. Imagery and Icons

### Style

- Use minimalist, vector-based icons (preferably SVG) to maintain a clean and professional look.
- **Recommended Icon Set:** [Font Awesome](https://fontawesome.com/icons)  
  - Example icons: `microchip` for FPGA logic, `astronaut` or `space` for CNES/space themes, and `upload` for interactive controls.
- **Usage and Sizing:**
  - Standard icon size is 24px, with 16px for compact areas.
  - Icons must meet contrast guidelines on both light and dark backgrounds.

---

## 6. Interactivity Elements

### Buttons

- **Shape:** Slightly rounded corners (approximately 5px).
- **States:**  
  - Default  
  - Hover (with a slight background color shift)  
  - Active/Pressed (with an outline effect)  
  - Disabled text displayed in gray `#5B5151` with an opacity of 50%.
- **Color:**
  - Light mode: Use the primary color (`#0D1B2A`) with white text.
  - Dark mode: Adapt colors to ensure clarity and contrast.

---

## 7. Light and Dark Mode Switching

### 7.1. Toggle Control

- A day/night icon (e.g., `fa-sun` and `fa-moon` from [Font Awesome](https://fontawesome.com/search?o=r&ic=free&s=solid&ip=classic)) is placed prominently in the header.
- Toggling applies a **dark-mode** class to the interface.

### 7.2. Style Adaptation

- Backgrounds, text colors, and accent elements adjust automatically between light and dark modes to ensure readability.
- Use mid-range grays in secondary containers to differentiate sections without compromising contrast.

---

## 8. Maintenance and Expansion

### Design Tokens
A centralized list of design tokens—including color codes, font sizes, and spacing units—is maintained in a shared [Figma file](https://www.figma.com/design/A6rvzTJCZQQyznhdQbu753/FPGA-Web-App?node-id=0-1&p=f&t=6NnWKfw2FvNavJcS-0).
