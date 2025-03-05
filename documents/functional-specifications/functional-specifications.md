
# Functional Specifications
---
## Gloassary


---
## Overview

### Purpose
The purpose of this project is to develop a user-friendly web interface for simulating the internal chip flows of an FPGA. This interface will allow users like teachers and students to easily upload SDF files, adjust the real-time clock speed, and view simulation results. By streamlining the simulation process, this tool will enhance the educational experience and provide a practical demonstration of FPGA behavior in a classroom setting.

### State of the Art
Currently, there is no dedicated web interface for FPGA internal chip flow simulation. Existing solutions rely on expensive, complex software that is not tailored for educational use. These tools often have steep learning curves and are not designed for interactive real-time demonstrations. This project aims to fill that gap by offering a simple, accessible, and cost-effective solution.

### Poject Scope
The project will be developed in two distinct phases:
- **Phase 1:** Development of the web interface, including the core functionalities (uploading SDF files, simulation control, display of results, and zoom features).
- **Phase 2:** Integration and development of the simulation engine that powers the FPGA flow simulations, which will be seamlessly connected to the web interface.

The initial implementation will use the following technologies:
- **Frontend:** Native JavaScript, HTML, CSS
- **Backend:** Node.js with Express.js (subject to change based on project needs)

### Out of Scope
This project is not designed or intended for commercial deployment. All source code and documentation will be released as open source, ensuring that it remains free and accessible for academic use.

---
## Target Audience

### Personas

<!-- 

- "Teacher" like Florent

- Student advanced

- Student beginner

 -->

### Use Cases

---
## Functional Requirements

### SDF File Upload  
- **Functionality:**  
  The web interface will allow users to upload SDF files containing the chip design information.  
- **Details:**  
  - The system shall support SDF file formats up to 10 MB in size.  
  - Upon file upload, the system will validate the file format and size. If the file is malformed or exceeds the allowed limit, a clear error message will be displayed.  
  - Successfully uploaded files will be parsed, and the chip’s internal structure will be rendered visually on the interface.

### Real-Time Clock Speed Adjustment  
- **Functionality:**  
  Users will be able to adjust the simulation's clock speed in real time.  
- **Details:**  
  - A dedicated control will allow users to increase or decrease the clock speed by predefined increments (e.g., 1x, 2x, 4x, ...).
  - Changes to the clock speed will take effect immediately, with a tooltip displaying the current speed.

### Simulation Control  
- **Functionality:**  
  The interface will provide controls for starting, pausing, and resetting the simulation.  
- **Details:**  
  - Visual cues such as play, pause, and reset buttons will be available to control the simulation flow.
  - Users can easily control the simulation flow to observe behaviors at their own pace.

### Simulation Control Step-by-Step  
- **Functionality:**  
  The interface will offer a step-by-step simulation mode where users can advance the simulation a specified number of clock cycles at a time.  
- **Details:**  
  - This mode enables detailed observation of the chip's behavior at each simulation step.  
> **Note:** The default number of clock cycles per step is defined in the [Technical Specifications](../technical-specifications/technical-specifications.md) document.

### Real-Time Interactions  
- **Functionality:**  
  Users will interact with the simulation through various input fields and buttons provided on the interface.  
- **Details:**  
  - The interactive elements are generated based on data specified in the uploaded SDF file.  
  - Users will not be able to add or modify these inputs directly within the interface to maintain simulation integrity.  
> **Note:** All input controls derived from the SDF file are read-only to prevent unintended alterations.

### Zoom Features
- **Functionality:**  
  The interface will provide zoom features to allow users to focus on specific areas of the displayed circuit.
- **Details:**
  - Users can zoom in and out of the chip's internal structure using dedicated controls.
  - Zoom controls will use predefined zoom levels to maintain consistency and avoid distortion (e.g., 50%, 100%, 150%, ...).

### Light and Dark Mode
- **Functionality:**  
  The interface will support light and dark modes to accommodate user preferences. This will allow user to keep a consistent experience across different devices (e.g., desktop, video projector).
- **Details:**
  - Users can toggle between light and dark modes using a dedicated control in the interface.
  - The interface will adapt its color scheme and contrast to ensure readability in both modes.

---
## Non-Functional Requirements

### Performance  
- **Responsiveness:**  
  The web interface must be highly responsive, providing real-time feedback to user interactions.  
  - **Requirement:** All interactive operations must complete within 100ms to be considered smooth.  
- **Simulation Engine Optimization:**  
  The simulation engine should be optimized for speed and efficiency to ensure smooth operation during simulations.
- **File Upload and Load:**  
  - **Requirement:** File upload and parsing processes can take up to 1 minute, depending on file size and complexity.  
  - **Error Handling:** In cases where the process exceeds the maximum allowed time, the system should display a status update and offer options to retry.

### Hosting Performance  
- **Local Deployment:**  
  As the project is open source and free, any user with a reasonably modern computer should be able to run the server locally.  
  - **Requirement:** A "decent computer" is defined as one with at least 4GB of RAM and a 4-core CPU.  
  - **Scalability:** The application should maintain functionality under local deployment without requiring extensive configuration.

### Ease of Use  
- **User Interface:**  
  The interface must be intuitive, easy to navigate, and provide clear instructions and visual cues to guide users through the simulation process.
  - **Guidance:** Onboarding instructions and tooltips should be available for first-time users.
  - **Accessibility:** The design should consider accessibility guidelines to ensure usability for all users.

### Compatibility  
- **Browser Support:**  
  The web interface should be compatible with modern web browsers, including Chrome, Firefox, Safari, and Edge.  
- **Responsive Design:**  
  The interface must adapt to different screen sizes and resolutions, ensuring a consistent user experience on desktops, tablets, and smartphones.
  - **Reference:** Additional compatibility details can be found in the [Technical Specifications](../technical-specifications/technical-specifications.md) document.

---
## Product

### Description
The product is a web application with a server backend that allows users to simulate the internal chip flows of an FPGA. The interface will provide tools for uploading SDF files, adjusting the clock speed, controlling the simulation, and viewing the results in real time. The product aims to simplify the simulation process and enhance the educational experience for students and teachers.

### Key Features
The project will include the following key features:
- SDF file upload
- Real-time clock speed adjustment
- Simulation control (start, pause, reset)
- Step-by-step simulation mode
- Real-time interactions with the simulation
- Zoom features for detailed observation
- Light and dark mode support

### Mockups

### User Flows

---
## Future Improvements

- **Advanced Simulation Controls:**  
  - **Functionality:** Enhance the simulation controls to include breakpoint setting, dynamic variable clock speeds, and customizable step sizes.  
  - **Details:** These controls will allow users to pause simulations at predetermined points, adjust clock speeds on-the-fly, and choose step increments ranging from 1 to 100 clock cycles. This will facilitate detailed debugging and deeper analysis of chip behavior.  
  - **End Goal:** To reduce simulation debugging time by at least 30% and provide flexible simulation stepping for both educational and research purposes.

- **Realistic Chip Behavior:**  
  - **Functionality:** Expand the simulation engine to model realistic chip behavior by incorporating external environmental factors such as temperature, voltage fluctuations, and other dynamic conditions.  
  - **Details:** Environmental factors will be integrated using parameterized models and lookup tables derived from real-world measurements. This will allow the simulation to reflect subtle variations in chip performance under different conditions.  
  - **End Goal:** To achieve simulation accuracy within 5% of real-world measurements, providing a more immersive and educational experience that mirrors actual FPGA behavior.

- **Collaborative Simulation:**  
  - **Functionality:** Introduce collaborative simulation features to enable multiple users to interact with the simulation simultaneously.  
  - **Details:** The interface will support shared dashboards and real-time collaboration tools, with role-based access control to manage simultaneous interactions and prevent conflicts.  
  - **End Goal:** To support at least 5 simultaneous users without performance degradation, thereby promoting interactive learning, knowledge sharing, and teamwork among students and researchers.

---
## Legal and Compliance

### Data Protection and Privacy

- Do not store or save any personal data on the website.

### Accessibility

- The website will be used by a large number of students and must comply with accessibility standards to accommodate all types of disabilities. 
- Ensure the design and functionality adhere to inclusive accessibility guidelines

### Security 

- Implement robust security measures to safeguard sensitive company information.
- Use strict authentication methods to ensure that only authorized CNES employees can access the website.
- Alternatively, deploy the website locally within CNES’s internal network to restrict external access entirely.

### Intellectual Property

- Clearly state that the website and its content are the exclusive property of CNES.
- Include appropriate copyright notices to protect intellectual property rights.

<!-- ### Internal Policies -->

<!-- ### Specific CNES Requirement

Don't know 

-->

---
## Timeline

### Milestones




