# MEDI-DISPENSE 1.1  
### IoT-Based Bedside Automated Medication Dispensing System

---

## 📌 Project Overview

MEDI-DISPENSE is a low-cost, modular IoT-enabled automated medication dispensing system designed for bedside deployment in hospitals and assisted living environments.

The system integrates:

- Mechanical automation (blister indexing + servo popper)
- Edge AI tablet verification (YOLOv8)
- Load-cell based mass validation
- Wi-Fi MQTT telemetry
- Cloud-based event logging & monitoring

---

## 🏗 System Architecture

Mechanical Layer  
→ Linear feed (NEMA17 + Lead screw)  
→ Servo-actuated popper (MG996R)  
→ Camera verification bay  
→ Gravity funnel  
→ Load cell tray  

Embedded Layer  
→ ESP32 controller  
→ HX711 ADC  
→ Stepper driver (DRV8825/A4988)  
→ PWM servo control  
→ Wi-Fi MQTT communication  

Cloud Layer (This Repository)  
→ Device registration  
→ Medication management  
→ Dispense event logging  
→ Inventory tracking  
→ Future AI + prescription validation  

---

## 🧠 Current Backend Features

- Device Registration API
- Medication Registration API
- MongoDB persistent storage
- Modular MVC architecture
- Ready for dispense-event integration
- Inventory-ready schema
- Designed for MQTT ingestion

---

## 📂 Project Structure
src/
├── config/
├── controllers/
├── models/
├── routes/
└── server.js


---

## 🚀 API Endpoints (Current)

### Register Device
POST `/api/device/register`

### Register Medication
POST `/api/medications`

---

## 🧪 Development Setup

1. Install Node.js
2. Install MongoDB (local)
3. Create `.env` file:

MONGO_URI=mongodb://127.0.0.1:27017/medidispense
PORT=5000


4. Install dependencies:
npm install


5. Run server:
npm run dev


---

## 🔮 Upcoming Phases

- Dispense Event Decision Engine
- Inventory depletion tracking
- Low-stock nurse notification
- MQTT telemetry ingestion
- Prescription validation layer
- YOLOv8 AI integration
- ESP32 firmware integration
- Nurse mobile dashboard

---

## 🏥 Application Context

Designed for:
- Elderly bedside care
- Cognitive impairment medication management
- Remote caregiver supervision
- Hospital ward automation

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- MQTT (planned)
- YOLOv8 (AI integration)
- ESP32 (embedded control)

---

## 👥 Team

Project: MEDI-DISPENSE 1.1  
Rev A – February 2025

