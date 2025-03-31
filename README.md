<p align="center"><em>What if you could visualize, simulate, and master FPGA development all in one place with...</em></p>
<p align="center">
  <img style="height:200px" src="./documents/functional-specifications/images/logo-light.png" />
</p>
<p align="center">
<a href="#features">Features</a> • 
<a href="#manifest">Manifest</a> • 
<a href="#prerequisites">Prerequisites</a> • 
<a href="#configuration">Configuration</a> • 
<a href="#json-creator">JSON Creator</a>
</p> 

<hr>

**FPGA Explorer** is an interactive platform designed to simplify the exploration and learning of Field-Programmable Gate Arrays (FPGAs). Whether you're a student, teacher, or hobbyist, this tool helps you understand, develop, and simulate FPGA logic in a visual and intuitive way.

👉 [**Try it online**](https://two024-2025-project-4-web-fpga-team-4.onrender.com/client.html)
you can use the file example.sdf to test the application.
You can also upload your own `.sdf` files to visualize and simulate them.

# Features

- **Visual Logic Simulation**  
  Simulate FPGA circuits in real time and watch how data flows through flip-flops, LUTs, and wires—perfect for exploring internal chip behavior.

- **Educational Focus**  
  Designed for learning, FPGA Explorer makes it easy to understand digital logic by visualizing how components interact, step by step.

- **Pivot Format**  
  Upload `.sdf` files and watch them automatically parsed into a structured JSON format designed for clarity and modularity.  
  You can download the generated JSON, tweak it, and re-upload it to create your own examples effortlessly.


# Manifest

- [Functional Specifications](./documents/functional-specifications/functional-specifications.md)
- [Technical Specifications](./documents/technical-specifications/technical-specifications.md)
- [Test Plan](./documents/quality-assurance/test-plan.md)
- [User Manual](./documents/user-manual/user-manual.pdf)
- [Management Artifacts](./documents/management/management-artifact.md)
- [Source Code](./src/)
- [SDF Example](./documents/user-manual/example.sdf)
- [JSON Creator](./src/json_creator/json-creator.py)

# Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- Python 3.x (for JSON Creator)

# Configuration

1. Clone the repository
```bash
git clone https://github.com/algosup/2024-2025-project-4-web-fpga-team-4.git
```
2. Navigate to the directory
```bash
cd 2024-2025-project-4-web-fpga-team-4/src
```
3. Start the application
```bash
npm install
npm start
```

The interface will open in your browser at http://localhost:8080/code/client.html.

# JSON Creator (Helper Tool)

FPGA Explorer includes a **command-line script** to help users generate custom `.json` files without writing them from scratch. This is ideal for testing small examples or building circuits manually.

> ⚠️ Note: This tool is **optional** and not the main feature of the platform.

## Run the Script

```bash
/opt/homebrew/bin/python3 ./src/json_creator/json-creator.py
```

It will guide you step by step through:
- Adding **LUTs**, **Flip-Flops**, and **I/Os**
- Creating **connections** with timing delays
- Saving everything into a valid `output.json` file

You can upload the generated file directly into FPGA Explorer to simulate your custom circuit.

## Important Notes
- **Case sensitive**: Use correct casing for element types (`LUT`, `FlipFlop`, `IO`)
- **Unique IDs**: Required for LUTs and Flip-Flops
- **Valid timing**: Must be a numeric value
- **I/Os use names** instead of numeric IDs

<!-- # Known Bugs

- [ ] Add a list of known bugs here -->

# Contributing
We welcome contributions! Feel free to submit issues, suggest new features, or open pull requests.

# License
[MIT License](./LICENSE.md)

# Authors

Made with ❤️ by Team 4

- [**Thibaud Marlier**](https://www.linkedin.com/in/thibaudmarlier/) – Project Manager  
- [**Maxime Caron**](https://www.linkedin.com/in/maxime-caron-dev/) – Program Manager  
- [**Emilien Chinsy**](https://www.linkedin.com/in/emilien-chinsy-5a794632b/) – Technical Lead  
- [**Guillaume Despaux**](https://www.linkedin.com/in/guillaume-despaux/) – Quality Assurance  
- [**Clémentine Curel**](https://www.linkedin.com/in/clementinecurel/) – Technical Writer  
- [**Jason Grosso**](https://www.linkedin.com/in/jason-grosso-847b39251/) – Software Engineer  
- [**Laurent Bouquin**](https://www.linkedin.com/in/laurentb22/) – Software Engineer  
