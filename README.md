# OSCAR_Documentation.github.io

Documentation website for **OSCAR (Open Source Copter for Academic Research)**, a fully open-source quadcopter platform currently in development for a senior design project at Iowa State University. Hosted via GitHub Pages.

---

## What is OSCAR?

OSCAR is a custom-built quadcopter designed to give hobbyists, engineering students, and 
researchers an accessible, well-documented, and highly customizable drone platform. Rather 
than relying on expensive commercial products or poorly documented open-source alternatives, 
OSCAR makes the full design — hardware, firmware, and software — openly available for anyone 
to learn from, replicate, or build upon.

---

## What's on the Site?

The documentation covers all three subsystems of the OSCAR platform:

- **Hardware** - Design justifications for the Flight Controller and ESC board
- **Firmware** - Implementation guides for DSHOT motor control and USB communication,
  along with relevant datasheets and peripheral references
- **Software** - Setup instructions for OSCAR Ground Station, covering Electron setup,
  UI page implementation, front and backend USB communication, and IPC configuration.
  Also includes the most recent version of the in-development Windows installer

---

## OSCAR Ground Station

OSCAR Ground Station is the companion desktop application for configuring and monitoring 
your OSCAR drone over USB. It provides:

- Real-time 3D drone orientation visualization
- PID tuning and rate profile configuration
- Motor testing and ESC settings
- Sensor calibration tools
- Power and battery monitoring
- GPS and receiver configuration

A Windows installer is available for download on the documentation site.

---

## The OSCAR Drone

OSCAR is a custom quadcopter currently in active development. In its current state it
supports USB communication between OSCAR Ground Station and the flight controller,
DSHOT motor control protocols, radio master controller input, and a functioning IMU,
with more capabilities being added as development continues.

---

## Getting Started

If you're new to OSCAR, we recommend starting with whichever subsystem you're most
comfortable with. Hardware, firmware, and software documentation are each written to
stand on their own. If you're brand new to all of it, start wherever you're most
excited and jump around as you see fit.

---

## Built By

OSCAR was designed and built by a team of Electrical Engineering, Computer Engineering, and 
Software Engineering students at **Iowa State University** as part of the senior capstone 
design course.

---

### Responsible Use Statement:

See [DISCLAIMER.md](./DISCLAIMER.md) for our detailed disclaimer statement. By using this open-source platform, you assume agreement to the disclaimer!
