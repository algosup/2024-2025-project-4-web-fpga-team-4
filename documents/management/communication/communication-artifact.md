# Client Communication Log

- [Client Communication Log](#client-communication-log)
  - [Introduction](#introduction)
  - [Project: FPGA Web Interface Visualization](#project-fpga-web-interface-visualization)
  - [Communication Log](#communication-log)
    - [**1st Message**](#1st-message)
    - [**1st Response**](#1st-response)
      - [Responses to Questions:](#responses-to-questions)
    - [**First Prototype Feedback**](#first-prototype-feedback)
      - [Feedback:](#feedback)
    - [**2nd Message**](#2nd-message)
    - [**2nd Response**](#2nd-response)
  - [**Summary of Key Information**](#summary-of-key-information)
    - [**3rd Message**](#3rd-message)
    - [**3rd Response**](#3rd-response)
    - [**4th Message**](#4th-message)
    - [**4th Response**](#4th-response)

## Introduction

This document serves as a placeholder to keep track of all the communication held with the client. In order to keep track of changes and feedback.

## Project: FPGA Web Interface Visualization

**Client:** Florent Manni \
**Project Team:** Team 4  
**Project Manager:** Thibaud Marlier  
**Program Manager:** Maxime Caron

---

## Communication Log

### **1st Message**

**Subject:** Project Questions and Document Submission  
**Date:** 03/03/25 \
**Sender:** Thibaud Marlier  
**Recipient:** Florent Manni

**Message:**  
Dear Florent,  
I hope this message finds you well.

I am Thibaud Marlier, project manager of Team 4, writing to you alongside Maxime Caron, our program manager. We are reaching out with a few questions regarding the project:

1. Will this project be exclusively used by CNES, or will other entities be involved?
2. Should we create our own logo, or would you prefer us to use an existing one (e.g., CNES)?
3. How many inputs are available per LUT?
4. Is it necessary to provide a visualization of the block RAM?

Additionally, we would like to share our Project Charter for your review. Please let us know if you approve it or if any modifications are required. We've also attached our weekly report for the first week in case you're interested.

Lastly, here is the mockup of the web interface in its early stages. While it's still a work in progress, we'd appreciate your feedback on the current design and overall direction.

**Attachments:**

- Project Charter: [Project Charter](../project-charter.md)
- Mockup Design: [Figma Link](https://www.figma.com/design/A6rvzTJCZQQyznhdQbu753/FPGA-Web-App?node-id=0-1&m=dev&t=lkPKlLFY9KAmra26-1) | [Excalidraw Link](https://excalidraw.com/#json=WFzbIzzdwkJc7_x4CLU12,PFrBMX36ANHSdY0DUj6NlA)

Thank you very much for your time and support. We look forward to hearing from you.

**Best regards,**  
Thibaud Marlier  
Project Manager, Team 4

---

### **1st Response**

**Date:** 03/03/25 \
**Sender:** Florent Manni \
**Recipient:** Thibaud Marlier

**Message:**  
Hi,  
For each review you'd like me to perform, please create an issue on the GitHub for the project; otherwise, I will lose track of it in chat.  
[GitHub Repository](https://github.com/LeFl0w/ALGOSUP_POC/issues/7)

#### Responses to Questions:

1. For now, the project will be exclusively used by CNES.
2. If you want to spend time, you can create a logo. It is not mandatory. You can use an AI tool like Midjourney or simply use the CNES logo. I have no fixed preferences.
3. The LUTs are supposed to be LUT4, meaning 4 inputs and 1 output.
4. A visualization of the block RAM is not necessary, as there are currently no examples using them.

---

### **First Prototype Feedback**

**Date:** 07/03/25  
**Sender:** Florent Manni \
**Recipient:** Thibaud Marlier

**Message:**  
Hi,  
Is your Figma mockup supposed to be interactive? If it is, I may have missed something. My review will be based on the displayed page only.

#### Feedback:

- You can insert an I/O column on the right side to avoid reversing the data flow for signals.
- If you want to add buttons for I/O, you should add another column for stimuli. I/O is a special FPGA element (like LUTs or flip-flops), so mixing them could create misunderstandings.
- The clock column setup is unclear. It would be better to have a dedicated line at the bottom for the clock, feeding the clock input of every flip-flop.
- The signal display is well done. Ensure that pins match the exact location of the displayed signal, considering timing propagation delays.
- For more complex designs, additional LUT and FF columns can be added (but not for I/O).
- The colors are fine. Try to increase the clock period, as the dashed line effect is difficult to follow when moving.
- Regarding the upload button, it may not be useful unless it allows real-time Verilog netlist import and display.

If this feedback is acceptable, please close the review.

---

### **2nd Message**

**Subject:** Understanding the .SDF File  
**Date:** 05/03/25  
**Sender:** Thibaud Marlier  
**Recipient:** Florent Manni

**Message:**  
Hello Florent,  
Our development team is currently working on understanding the content of the .SDF file. However, they are having difficulty grasping how to interpret it in depth, how the content flows, and how the different elements are interconnected.

We would like to arrange a meeting, preferably on Slack, to help us better understand the file and its content. Could you please let us know your availability in the coming days for this meeting?

Thank you very much for your help.

---

### **2nd Response**

**Date:** 05/03/25 \
**Sender:** Florent  
**Recipient:** Thibaud Marlier

**Message:**  
Hi,  
I would prefer to avoid video meetings as much as possible, as I would have to do them for every group.

I have added SDF information in the repository. Let me know if this is sufficient.

---

## **Summary of Key Information**

- CNES is the only intended user of the project for now.
- The team may create a logo but is not required to do so.
- LUTs are LUT4 with 4 inputs and 1 output.
- Block RAM visualization is not necessary.
- Feedback was provided on the web interface mockup, including suggestions for I/O columns, clock positioning, and signal display.
- Florent prefers GitHub issues for review requests instead of direct messages.
- Instead of a video meeting, SDF documentation has been added to the repository for reference.

---

### **3rd Message**

**Subject:** Open-Source 
**Date:** 13/03/25  
**Sender:** Thibaud Marlier  
**Recipient:** Florent Manni

**Message:**

Hello Florent, \
We have a question regarding the accessibility of the project's source code. \
We are unsure whether the project should be open source or remain private. You mentioned that the project was for CNES, but should it be kept internal, or can it serve as a foundation for further contributions? \
Should the project remain restricted to our team, ALGOSUP, and CNES, or is there potential for external collaboration? We want to clarify this to prevent any unintended leaks, noise, or unwanted contributions.
Looking forward to your guidance. \
Best regards.

### **3rd Response**

**Date:** 05/07/25 \
**Sender:** Florent  
**Recipient:** Thibaud Marlier

**Message:** 

Hi, this project is opensource and public. You can/may put it onlne

--- 

### **4th Message**

**Subject:** Open-Source 
**Date:** 13/03/25  
**Sender:** Thibaud Marlier  
**Recipient:** Florent Manni

**Message:**

Hello Florent, \
Our development team had an interesting question technical wise. \
Please, could you explain why some examples (1ff_VTR, 2ffs_VTR) have a "latch_Q_output" that goes to two different elements but in other examples (1ff_no_rst_VTR, 2ffs_no_rst_VTR, 5ffs_VTR), the "latch_Q_output" is only connected to one element. \
This led to our team being a bit confused on how to tackle this possibility. \
Thank you, \
Best Regard.

### **4th Response**

**Date:** 24/03/25 \
**Sender:** Florent  
**Recipient:** Thibaud Marlier

**Message:** 

Hi, this is related to the way the tool is handling reset ( to be true it doesn't handle flipflop with reset). \
So instead of connecting the reset signal to the reset pin of the flipflop it tries to connect the reset on input signals. \
You should only consider examples without reset in it. It is easier to understand.