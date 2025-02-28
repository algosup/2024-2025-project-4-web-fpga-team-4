# Project Charter - Web FPGA Team 4

## Project Definition

The objective of this project is to create a web interface designed to teach students and users the inner workings of an FPGA. Specifically, the interface will demonstrate how electricity (signals) propagates inside an FPGA based on a given code.

This project was initiated by the Centre National des Études Spatiales (CNES — French National Center for Space Studies). Communication between the team and the client is facilitated by Project Manager Thibaud Marlier and Program Manager Maxime Caron.

## Contact Information

### Via Email

Thibaud Marlier: thibaud.marlier@algosup.com

Maxime Caron: maxime.caron@algosup.com

### Via ALGOSUP's Slack

The team is available for direct contact through ALGOSUP's Slack workspace.

## Scope

The web interface will focus on the following elements:

### In-Scope Features

#### Must-Have Features

- Web interface for FPGA visualization
- Accept input files (Verilog netlist and SDF)
- Display visual representation of FPGA floorplan
- User-friendly interactive design
- Step-by-step signal propagation display
- Play, pause, and slow-motion controls
- File pivotation (rotation or re-orientation of visual elements)
- Client-server interaction
- Display 2D floorplan with BELs and routing
- Interactive controls (zoom, pan, select signals)
- Display signal issues (e.g., speed differences, clock desynchronization)
- Animations to enhance understanding

#### Should-Have Features

- Appealing visual interface
- Multiple simulation speeds (x1, x2, x4)
- Color-coded signals for clarity
- Basic error handling for invalid files
- Timeline slider for navigation
- Multi-user session support
- Backend processing optimizations
- Real-time performance improvements
- Basic statistics on signal delays and logic utilization
- Annotation support for educational use

#### Could-Have Features

- Verbose mode for additional signal information
- Export output as a GIF
- Allow students to modify parameters (e.g., clock speed, input values)
- Export simulation results (PDF, JSON)
- Consider external variables in the simulation
- Advanced performance statistics
- Support for future extensions and additional FPGA models

## Out Of Scope

The following elements are outside the scope of this project:

- **Writing Verilog code from scratch**
- **Automatic conversion of Verilog to another HDL (e.g., VHDL)**
- **Full FPGA synthesis in-browser**
- **Bitstream modification**
- **Pre-processing interactions**
- **Calculation of resource usage statistics**
- **Handling complex or highly specific FPGA examples**
- **Mobile device (phone/tablet) compatibility**
- **Audio integration**

## Stakeholders

| Role            | Representative           | Expectations                                                                                                                                                                            |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client          | Florent Manni (CNES)     | Clear and structured documentation and project management. <br> A web interface explaining how signals propagate inside an FPGA to teach students.                                      |
| School Director | Franck Jeannin (ALGOSUP) | Clear and structured documentation and project management based on the skills learned in class. <br> A web interface explaining how signals propagate inside an FPGA to teach students. |

## Team Members & Responsibilities

| Name              | Role              | Responsibilities                                                                                       | Performance Criteria                                                          |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Thibaud MARLIER   | Project Manager   | Manage timeline and resources, distribute workload, report progress, identify and mitigate risks       | On-time delivery, efficient resource management, smooth project execution     |
| Maxime CARON      | Program Manager   | Create mock-ups, communicate with client, deliver functional specifications, manage project risks      | Approved specifications, positive client feedback on design and functionality |
| Emilien CHINSY    | Technical Leader  | Define coding standards, select technical tools, deliver technical specifications, oversee development | Comprehensive technical documentation, consistent technical choices           |
| Laurent BOUQUIN   | Software Engineer | Develop code, fix bugs, document code, create tests                                                    | Full implementation of features, minimal bug count                            |
| Jason GROSSO      | Software Engineer | Develop code, fix bugs, document code, create tests                                                    | Full implementation of features, minimal bug count                            |
| Guillaume DESPAUX | Quality Assurance | Review documentation, test software, ensure alignment with client expectations, deliver test plans     | Detailed test plan, effective bug identification, thorough documentation      |
| Clementine CUREL  | Technical Writer  | Prepare user manual                                                                                    | Clear, user-friendly documentation                                            |

## Project Plan

Client communication primarily occurs on Slack. We pledge to communicate with the client at least once per week, to describe the following:

- Project advancement
- Ensuring in-scope progression
- Discussing requirements
- Addressing client feedback and clarifications
- Risk identification and mitigation strategies

We have chosen to work with a waterfall project management approach supplemented by elements of Scrum and Agile testing. This hybrid approach was selected to leverage the clear structure of the waterfall method while integrating the flexibility and iterative feedback loops of Agile methodologies, which benefit the dynamic and evolving nature of this project. We opted for this approach because of its flexibility and iterative elements.

A task breakdown, objectives, and priorities will be outlined based on the requirements and features we must implement. These tasks will be prioritized according to their importance and criticality. You can find a detailed schedule and task assignment in this external spreadsheet [here](https://docs.google.com/spreadsheets/d/1TIji_6mbcO8O4CSqA-9L6FJdZySkKpRRgM-a_pmySaw/edit?usp=sharing).

Upon project completion, a post-mortem analysis will be conducted after the final presentation on March 4th, 2025, to evaluate performance and document lessons learned from the client.

## Milestones

| Date       | Milestone                                    |
| ---------- | -------------------------------------------- |
| 03/13/2025 | Functional Specification Delivery            |
| 03/25/2025 | Technical Specification & Test Plan Delivery |
| 04/01/2025 | Code & User Manual Delivery                  |

## Deliverables

The main deliverable for this project is the source code of the web page/interface. Additional documentation to be provided includes:

- Functional Specifications
- Technical Specifications
- Test Plan
- User Manual
- Project Management Plan & Weekly Reports

A final 15-minute presentation summarizing the project and its outcomes will also be delivered to the client.

## Allocated Resources

- **Budget:** €0 (No external funding)
- **Team:** 7 members
- **Work Hours:** 10 days of 7 hours each

**Total estimated human hours:** 490 hours

## Risks

- Delays in communication with the client
- Client requirement changes
- Misalignment between client expectations and project deliverables
- Browser compatibility issues
- Technical challenges related to FPGA simulation
- Unforeseen technical complexities
- Performance optimization challenges
- API integration issues
- Time constraints due to academic deadlines
