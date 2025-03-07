# 2024-2025 - Project 4 - Web FPGA - Team 4 - Technical Specifications

<summary> 

## Table of contents </summary>

- [2024-2025 - Project 4 - Web FPGA - Team 4 - Technical Specifications](#2024-2025---project-4---web-fpga---team-4---technical-specifications)
  - [Table of contents ](#table-of-contents-)
  - [Project Overview](#project-overview)
    - [Project Introduction](#project-introduction)
    - [Document Purpose](#document-purpose)
  - [System Overview](#system-overview)
    - [System Architecture](#system-architecture)
  - [Glossary](#glossary)

## Project Overview

### Project Introduction
This project was commissioned by the CNES (Centre National d'Études Spatiales)<sup><a href="#1">[1]</a></sup>. The objective is to develop a web page that assists teachers in explaining how FPGAs (Field Programmable Gate Arrays)<sup><a href="#2">[2]</a></sup> function. The web page will achieve this by visualizing an example or simulation of the internal FPGA processes when specific code is input.

The website will utilize information stored in SDF (Standard Delay Format)<sup><a href="#3">[3]</a></sup> files. The method of handling these files, whether through direct parsing or conversion (e.g, to JSON), is yet to be determined <sup><a href="#change">[TBD]</a></sup>.

Since the primary goal is education, user experience (UX) and user interface (UI) design will be the focus as they are crucial to the project's success.

The programming languages we will be using are HTML and CSS for the structure and styling. To create a dynamic and user-friendly interface, we will use TypeScript and Node.js.

### Document Purpose
This document provides detailed technical specifications for the development of the web page, ensuring the correct implementation of the required features. These specifications will be based on the functional specification (link to be added).

This tool is being developed at the CNES's request and will serve as an educational resource for teachers to explain the inner workings of FPGA's.

## System Overview

### System Architecture

Our GitHub repository will be created following the architecture hereunder:

```
Root
│   .github
├───documents
|   |   01-documentation-report.yml
|   |   02-UI-changes-request.yml
|   |   03-server-bug-report.yml
|   |   04-client-bug-report.yml
│   pull-request-template.md
|
│   .gitignore
│   CODE_OF_CONDUCT.md
│   LICENSE
│   README.md
│
├───documents
│   ├───functional-specifications
│   │   │   mockups.pdf
│   │   │   functional-specifications.md
│   │   │
│   │   └───img
|   |       |
│   │       └───img
│   │
│   ├───management
│   │   │   management-artifacts.md
│   │   │   project-charter.md
│   │   │
│   │   ├───img
│   │   │
│   │   └───weekly-reports
│   │           cumulative.md
│   │           week1.md
│   │           week2.md
│   │           week3.md
│   │           week4.md
│   │           week5.md
│   │           week6.md
│   │
│   ├───quality-assurance
│   │       test-cases.md
│   │       test-plan.md
│   │
│   └───technical-specifications
│       │   technical-specifications.md
│       │   naming-conventions.md
|       |
│       └───img
│
└───src
    │   .gitignore
    │   README.md
    │
    ├───code
    |   ├───server
    |   |   server.html
    |   |   server.js
    |   |   server.css
    |   |
    |   └───client
    |       |  client.html
    |       |
    |       ├───css
    |       |   tool-bar.css
    |       |   schematics.css
    |       |   data-display.css    
    |       |
    |       └───js
    |           load.js
    |           schematics.js
    |           tool-bar.js
    |           variables.js
    |
    ├───file-converter
    |       file-converter.py (TBD)
    |       input.sdf
    |       output.json
    |
    ├───test
    |
    └───examples
        ├───1ff_VTR
        |       FF1_post_synthesis.sdf
        |       FF1_post_synthesis.v
        |       Readme.md
        |       flipflop.v
        ├───1ff_no_rst_VTR
        |       FF1_norst_post_synthesis.sdf
        |       FF1_norst_post_synthesis.v
        |       Readme.md
        |       flipflop.v
        ├───2ffs_VTR
        |       FF2_post_synthesis.sdf
        |       FF2_post_synthesis.v
        |       Readme.md
        |       flipflop.v
        ├───2ffs_no_rst_VTR
        |       FF2_norst_post_synthesis.sdf
        |       FF2_norst_post_synthesis.v
        |       Readme.md
        |       flipflop.v
        ├───5ffs_VTR
        |       Readme.md
        |       RisingEdge_DFlipFlop_AsyncResetHigh_post_synthesis.sdf
        |       RisingEdge_DFlipFlop_AsyncResetHigh_post_synthesis.v
        |       cascaded.png
        |       flipflop.v
        |       flipflop_tb_vtr.v
        ├───FULLLUT_VTR
        |       FULLLUT_post_synthesis.sdf
        |       FULLLUT_post_synthesis.v
        |       FullLut.v
        |       Readme.md
        ├───LUT_VTR
        |       LUT.v
        |       LUT_post_synthesis.sdf
        |       LUT_post_synthesis.v
        |       Readme.md
        └───NextpnrNX
                routed_POC.v
                routed_POC_worst.sdf
```

## Glossary

|Terms|Definitions|Links|
|-----|-----------|-----|
|<a id="1">[1]</a> CNES|Centre national d'études spatiales (CNES) is the French national space agency. Headquartered in central Paris, the agency comes under the supervision of the ministries of the Armed Forces, Economy and Finance and Higher Education, Research and Innovation.|[Wikipedia](https://en.wikipedia.org/wiki/CNES)|
|<a id="2">[2]</a> FPGA|A field-programmable gate array (FPGA) is a type of configurable integrated circuit that can be repeatedly programmed after manufacturing.|[Wikipedia](https://en.wikipedia.org/wiki/Field-programmable_gate_array)|
|<a id="3">[3]</a> SDF|Standard delay format (FPGA) is a standard for the representation and interpretation of timing data for use at any stage of an electronic design process.|[Wikipedia](https://en.wikipedia.org/wiki/Standard_Delay_Format)|







<a id="change">[change]</a> This tag will be on stuff I have to change when I know more.
