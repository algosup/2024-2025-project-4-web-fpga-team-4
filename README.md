# FPGA Explorer

## Installation

```bash
git clone https://github.com/algosup/2024-2025-project-4-web-fpga-team-4
```

## Start the server

```bash
cd 2024-2025-project-4-web-fpga-team-4
cd src
npm install
npm start
```

## Overview

This project aims to develop a user-friendly web interface for simulating the internal chip flows of an FPGA. This interface will enable teachers and students to easily upload SDF files, adjust real-time clock speeds, and view simulation results. By streamlining the simulation process, this tool will enhance the educational experience and provide a practical demonstration of FPGA behavior in classroom settings.

## Usage

### Basic Usage

Using the FPGA Explorer once the server is running:

1. Open your web browser and navigate to `http://localhost:3000`.
2. Upload an SDF file using the provided upload button.
3. Start the simulation by clicking the "Start Simulation" button.

### Additional Features

- Pause and resume the simulation at any time.
- Reset the simulation.
- Go to the last step of the simulation.
- Download a JSON file conatining the simulation's parameters.

## Theme

The website default theme is a dark theme. You can change it to a light theme by clicking the "Light" button in the top right corner of the page.

## Settings

The settings page allows you to change the following settings:

- **Clock Cycle per Step**: The number of clock cycles per step in the simulation.
- **Number of LUTs collumns**: The number of LUTs columns in the simulation.
- **Number of Flip-Flops collumns**: The number of Flip-Flops columns in the simulation.

The setting page also contains information about the website.

## Work in Progress

- Simulation speed increase/decrease.
- Zoom in/out.

## Contributing

You can contribute to our project by opening issues or pull requests. We welcome any feedback or suggestions to improve the project.
