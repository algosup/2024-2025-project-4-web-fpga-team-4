# Graphic Charter

This charter is intended to establish a visual identity and stylistic rules that ensure consistency across all pages and platforms. 

## Logo and Branding

<!-- todo: See with the client about the logo -->
<!-- Also there is not space allocated for the logo in the wireframe and mockup -->

- **Position & Placement**
    - The logo is placed in the <!-- left, right --> of the header.
    - Original proportions are maintained—no stretching or skewing is permitted.
    - A minimum margin equal to **half the logo’s height** is ensured around all sides.

<!-- todo: logo -->

## Color Palette

### Base Palette (Light Mode)

- **Primary color**: `#0D1B2A`
    - **Usage**: Key interactive elements (buttons, icons), headers, major highlights.
- **Text color**: `#0D1B2A`
    - **Usage**: Standard body text.
- **Secondary color**: `#1B263B`
    - **Usage**: Accents, hover states, or smaller UI elements that need emphasis.
- **Background color**: `#E0E1DD`
    - **Usage**: Main page background for optimal contrast with text.
    - **Variation**: (`#415A77`) may be used to create subtle section distinctions.



> **Note**: A 4.5:1 contrast ratio must always be ensured between text and background. This ensures that the text is still readable to those who may have color blindness.

### Dark Mode Palette

- **Primary color**: `#E0E1DD`
    - **Usage**: Key interactive elements (buttons, icons), headers, major highlights.
- **Text color**: `#E0E1DD` 
    - **Usage**: Standard body text.
- **Secondary color**: `#415A77`
    - **Usage**: Accents, hover states, or smaller UI elements that need emphasis.
- **Background color**: `#0D1B2A` 
    - **Usage**: Main page background for optimal contrast with text.
    - **Variation**: (`#1B263B`) may be used to create subtle section distinctions.
### FPGA Palette

- **Look-Up Table (LUT)**:
    - Light mode: `#15BF9A`
    - Dark mode: `#15BF9A`
- **Flip Flop**:
    - Light mode: `#BF1518`
    - Dark mode: `#BF1518`
- **Input and Outputs (i/o)**:
    - **Inputs**:
        - Light mode: `#E0E1DD`
        - Dark mode: `#E0E1DD`
    - **Outputs**:
        - Light mode: `#DDB72B`
        - Dark mode: `#DDB72B`
- **Wires**:
    - **Powered**:
        - Light mode: `#00EB14`
        - Dark mode: `#00EB14`
    - **Unpowered**:
        - Light mode: `#68111A`
        - Dark mode: `#68111A`
- **Clock**:
    - Light mode: `#EEAD0A`
    - Dark mode: `#E1FF00`

> When the elements are not used they will be displayed in `#5B5151`.

## Typography

### Font Families

- **Headings**
    - **Preferred**: IBM Plex Mono (available from [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Mono))
    - **Fallback**: A modern sans-serif (e.g., “Roboto,”).
    - **Weight**: Bold for clarity and emphasis.
    - **Suggested sizes**:
        - H1: 32–36px
        - H2: 24–28px
        - H3: 18–20px
- **Body Text**
    - **Preferred**: IBM Plex Mono or Roboto Mono.
    - **Weight**: Regular (400).
    - **Size**: 14–16px on desktop.
    - **Line-height**: 1.4–1.6 for readability.
- **Code / Technical Snippets**
    - A **monospaced** variant (e.g., IBM Plex Mono if distinct from heading/body) is used.
    - A distinct background or box is used to highlight code content.

### Typography Hierarchy

- **H1**: Primary page title.
- **H2**: Section titles.
- **H3**: Subsection or tertiary titles.
- **Body**: Paragraphs, descriptive text.
- **Links**: Typically underlined or color-coded to ensure visibility and interactivity.

## Layout Guidelines

### Overall Page Structure

- **Top Bar (Header)**
    - 15% vertical space on desktop is used. The area contains main navigation, settings and  theme toggle.
    - The header remains fixed to the top for continuous accessibility.
- **Toggable Side Bar (Right)**
    - 20% of horizontal space on desktop is allocated for controls.
    - This side bar is collapsible.
- **Canvas**
    - The central region (around 85% of vertical space) is allocated for primary interactive elements.
    - Responsiveness is ensured, with key interactions remaining accessible.

### Wireframe

<!-- Todo put the finished wireframe-->

## Imagery and Icons

### Style

- Minimalist icons are recommended to keep a clean, professional look.
- Vector-based (SVG) formats are preferred to ensure scalability.

### Icon Set

- **[Font Awesome](https://fontawesome.com/icons)** is recommended.
    - Icon suggestions:
        - `microchip` (FPGA logic)
        - `astronaut` or `space` (CNES/space)
        - `arrows`, `magnifying-glass`, `upload` (interactive controls)
- **Usage and Sizing**
    - A 24px size is typically used, with 16px reserved for compact areas.
    - Icons must meet contrast guidelines on both light and dark backgrounds.

## Interactivity Elements

### Buttons

- **Shape**: Slightly rounded corners (~5px).
- **States**: 
    - Default
    - Hover (slight background shift)
    - Active/Pressed (outline or inset)
    - Disabled (gray, `#000000`)
- **Color**:
    - Light mode: The primary color (`#000000`) with white text.
    - Dark mode: Inverted or adapted for clarity.

## Light and Dark Mode Switching

### Toggle Control

- A day/night icon is placed in a prominent area of the header.
  - `day`, `night` in [Font Awesome](https://fontawesome.com/search?o=r&ic=free&s=solid&ip=classic)
- When toggled, a **dark-mode** class is applied.

### Style Adaptation

- Backgrounds, text colors, and accent elements adapt to remain readable in both modes.
- Mid-range grays can be used in secondary containers to differentiate sections.

## Maintenance and Expansion

### Design Tokens

- A centralized list of color codes, font sizes, and spacing units is kept in a shared this [Figma](https://www.figma.com/design/A6rvzTJCZQQyznhdQbu753/FPGA-Web-App?node-id=0-1&p=f&t=6NnWKfw2FvNavJcS-0).