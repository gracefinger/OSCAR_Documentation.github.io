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

OSCAR is an open-source educational project intended for hobbyists, students, and researchers. Users are expected to operate any drone built using this project in compliance with all applicable local, national, and international laws and regulations. By using this project, you agree to fly responsibly and safely.
We ask that all users of this project commit to the following:
- Legal Compliance: Always operate your drone in accordance with your local aviation authority's regulations. In the United States, this includes FAA Part 107 and any applicable airspace restrictions.
- Safety First: Never fly over crowds, restricted airspace, or in conditions that could endanger people or property. Always maintain visual line of sight with your drone during flight.
- Privacy: Respect the privacy of others. Do not use this drone to surveil individuals without their knowledge or consent.
- Responsible Use: This project must not be used to cause harm to people, animals, property, or infrastructure. The OSCAR team explicitly condemns any weaponization or malicious use of this design.

The OSCAR team is not liable for misuse of this project. We trust our community to uphold these values.

## License

Currently in progress...
