# Management Artifacts - Web FPGA Team 4

- [Management Artifacts - Web FPGA Team 4](#management-artifacts---web-fpga-team-4)
  - [Tasks \& Schedules](#tasks--schedules)
  - [RACI Matrix](#raci-matrix)
  - [Risks \& Assumptions](#risks--assumptions)
  - [KPIs](#kpis)
    - [Definition of our KPIs](#definition-of-our-kpis)
      - [Documents](#documents)
      - [Design](#design)
      - [Web App](#web-app)
      - [Test](#test)
      - [Pitch](#pitch)
      - [Human Resources](#human-resources)
      - [Mood](#mood)
    - [Link to the Project's KPIs](#link-to-the-projects-kpis)
    - [Link to the Forms](#link-to-the-forms)
  - [Weekly Reports](#weekly-reports)
  - [Post Mortem](#post-mortem)

## Tasks & Schedules

You can find a detailed breakdown of the tasks identified for the project by following this link: [Gantt & Schedule](https://docs.google.com/spreadsheets/d/1TIji_6mbcO8O4CSqA-9L6FJdZySkKpRRgM-a_pmySaw/edit?usp=sharing)

This document has been created using Google Docs to keep track of the different tasks for both team members and the client.

## RACI Matrix

| Name                          | Project Manager | Program Manager | Technical Leader | Software Engineer | Quality Assurance | Technical Writer | Client & Stakeholder |
| ----------------------------- | --------------- | --------------- | ---------------- | ----------------- | ----------------- | ---------------- | -------------------- |
| **Project Kick-Off**          | R/A             | R               | C                | I                 | I                 | I                | R/A                  |
| **Call For Tender Analysis**  | R/A             | R               | C                | C                 | C                 | C                | C                    |
| **Project Planning**          | R/A             | C               | C                | I                 | C                 | I                | C                    |
| **Project Charter**           | R/A             | R               | C                | I                 | C                 | I                | C                    |
| **Application Design**        | A               | R               | I                | C                 | C                 | I                | C                    |
| **Functional Specifications** | A               | R               | C                | I                 | C                 | C                | C                    |
| **Technical Specifications**  | A               | C               | R                | C                 | C                 | I                | C                    |
| **Web Interface Development** | C               | C               | R/A              | R                 | C                 | I                | I                    |
| **Testing Planification**     | I               | C               | C                | C                 | R/A               | C                | I                    |
| **User Manual**               | I               | I               | I                | C                 | C                 | R/A              | I                    |

Legend:

| Letter | Full Name   | Description                                     |
| ------ | ----------- | ----------------------------------------------- |
| R      | Responsible | Executes the task or activity                   |
| A      | Accountable | Ultimately answerable for the task's completion |
| C      | Consulted   | Provides input and/or advice on the task        |
| I      | Informed    | Kept updated on progress and decisions          |
| /      | /           | No interaction with this role for this task     |

## Risks & Assumptions

| ID  | Description                                                                        | Consequence                                              | Impact | Likelihood | Mitigation/Avoidance                                                                                                                                                           |
| --- | ---------------------------------------------------------------------------------- | -------------------------------------------------------- | ------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Delays in communication with the clien**                                         | Deadlines not respected                                  | High   | High       | Plan messages in advance, schedule regular meetings, and consolidate questions into one message.                                                                               |
| 2   | **Misunderstanding of client requirements**                                        | Rework and wasted effort                                 | High   | Medium     | Organize clarification meetings, document requirements, and validate them with the client before starting the implementation.                                                  |
| 3   | **Time estimation inaccuracies**                                                   | Project delivery delay                                   | Medium | High       | Use past project references, buffer time in estimations, and track time spent on tasks regularly.                                                                              |
| 4   | **Team member unavailability**                                                     | Reduced productivity                                     | Medium | Low        | Assign backup responsibilities and ensure knowledge transfer between members.                                                                                                  |
| 5   | **Security vulnerabilities in the web interface**                                  | Data breaches and application failure                    | High   | Low        | Conduct regular security audits, use secure libraries, and apply best practices for secure development.                                                                        |
| 6   | **Web technology compatibility issues**                                            | Interface malfunctions                                   | Medium | Medium     | Perform cross-browser testing, use standardized libraries, and follow web development best practices.                                                                          |
| 7   | **Difficulties in understanding source files (.SDF) and interpreting them**        | Faulty source files, non-functioning final product       | High   | Medium     | Organize meetings with the client to clarify the source file format, allocate dedicated technical team members, and create internal documentation.                             |
| 8   | **Falling in love with the project, even though it doesn't meet the requirements** | Off-topic, non-education web app                         | High   | Low        | Always stay open-minded and keep the project's scope and requirements in mind. Ask for feedback from the client (it should be the client's love for the product that matters). |
| 9   | **Team member leaving**                                                            | Tasks left to the remaining members without any assignee | High   | Unlikely   | Sharing the tasks among the remaining team members, rework planning                                                                                                            |

## KPIs

### Definition of our KPIs

To keep track of the project's advancement, KPIs have been defined. These KPIs are listed below in their respective categories, along with the reasoning behind each.

#### <ins>Documents</ins>

This section contains the following KPIs:

- **Functional Specifications**
- **Technical Specifications**
- **Test Plan**
- **User Manual**

The following formula measures the progress of these documents:

$$\text{percentage} = \left(\frac{\text{current number of sections}} {\text{total number of sections}}\right)\times{100}$$

Where:

- **current_number_of_sections**: The number of sections that are completely done.
- **total_number_of_sections**: The number of predefined sections in the document's outline, which may evolve.

#### <ins>Design</ins>

This section includes:

- **Prototype Design**

The percentage progress for these KPIs is calculated using this formula:

$$\text{percentage} = \left(\frac{\text{current number of web pages designed}} {\text{total number of pages}}\right)\times{100}$$

Where:

- **current_number_of_pages_designed**: The number of pages that have been designed.
- **total_number_of_pages**: The total number of pages planned to be designed during the project analysis.

#### <ins>Web App</ins>

This section tracks the following KPIs:

- **First Prototype**
- **Second Prototype**
- **Final Product**

Each of these KPIs is based on sub-tasks and will use user feedback to be calculated:

$$\text{percentage} = \left(\frac{{\text{current number of key functionalities}}} {\text{total key functionalities planned to have}}\right)\times{100}$$

Where:

- **current_number_of_key_functionalities**: The number of key functionalities that are fully implemented.
- **total_key_functionalities_predefined**: The total number of key functionalities that were planned.

#### <ins>Test</ins>

This section contains only one KPI:

- **Test Cases**

The percentage progress is defined as follows:

$$\text{percentage} = \left(\frac{\text{number of tests performed}} {\text{total number of test cases}}\right)\times{100}$$

Where:

- **number_of_tests_performed**: The number of test cases performed.
- **total_number_of_test_cases**: The total number of test cases predefined.

#### <ins>Pitch</ins>

Only one KPI is included in this section:

- **Pitch Deck**

The percentage of completion is calculated using this formula:

$$\text{percentage} = \left(\frac{\text{current number of slides}} {\text{total number of slides}}\right)\times{100}$$

Where:

- **current_number_of_slides**: The number of slides currently designed in the Pitch Deck.
- **total_number_of_slides**: The number of slides the Pitch Deck should contain in the end.

#### <ins>Human Resources</ins>

The following KPIs are tracked in this section:

- **Overtime**
- **Unjustified Absence**

They are tracked in the weekly KPIs. Find them [here.](https://docs.google.com/spreadsheets/d/1EJIGbOufF86FP-Pb6Y5z0wuYymK0fEmoFKtg16JfIHg/edit?usp=sharing)

#### <ins>Mood</ins>

The mood percentage is calculated from the average of a 10-point personal grade. Each team member responds to a survey every week and gives their feelings about the week.

This method allows an accurate way of tracking the motivation and overall mood during the project.

You can find the responses [here](https://docs.google.com/spreadsheets/d/1EJIGbOufF86FP-Pb6Y5z0wuYymK0fEmoFKtg16JfIHg/edit?usp=sharing).

### Link to the Project's KPIs

You can see our project's KPIs, which were explained above, by following [this link](https://docs.google.com/spreadsheets/d/1EJIGbOufF86FP-Pb6Y5z0wuYymK0fEmoFKtg16JfIHg/edit?usp=sharing).

### Link to the Forms

This section gathers all the forms used for the KPIs.

- [Satisfaction Week 1](https://docs.google.com/spreadsheets/d/1TIji_6mbcO8O4CSqA-9L6FJdZySkKpRRgM-a_pmySaw/edit?gid=1984360613#gid=1984360613)
- [Satisfaction Week 2](https://docs.google.com/spreadsheets/d/1EJIGbOufF86FP-Pb6Y5z0wuYymK0fEmoFKtg16JfIHg/edit?resourcekey=&gid=824804903#gid=824804903)
- [Satisfaction Week 3](https://docs.google.com/spreadsheets/d/1EJIGbOufF86FP-Pb6Y5z0wuYymK0fEmoFKtg16JfIHg/edit?resourcekey=&gid=1117234513#gid=1117234513)

## Weekly Reports

// TODO ADD WEEKLY REPORTS

## Post Mortem

// TODO ADD POST MORTEM