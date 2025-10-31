# AI Deployment Advisor - Documentation

## Overview
The AI Deployment Advisor is an interactive tool for determining optimal robot fish deployment conditions based on ocean parameters.

## Features
- **8 Input Parameters:**
  1. 🌊 Plastic Concentration (0-500 ppm)
  2. 💧 Water Quality Index (0-100)
  3. 🌡️ Temperature (10-35 °C)
  4. 🌫️ Turbidity (0-100)
  5. 💨 Current Speed (0-3 m/s)
  6. 🐠 Marine Life Density (0-10)
  7. 🔋 Battery Level (0-100%)
  8. ☁️ Weather Condition (Calm/Moderate/Stormy)

- **AI Prediction Logic:**
  - Real-time risk score calculation
  - Three deployment recommendations:
    - ✅ **Deploy** - High risk, good battery, calm weather
    - ⚠️ **Partial Deployment** - Moderate risk, sufficient battery
    - ❌ **Do Not Deploy** - Unfavorable conditions

- **Modern UI/UX:**
  - Ocean-themed color palette (deep blue tones)
  - Glowing interactive sliders
  - Smooth animations
  - Responsive modal popup for results
  - Real-time value updates

## How the Prediction Works

### Risk Score Formula:
```
risk_score = (plastic_concentration × 0.4)
           + ((100 - water_quality_index) × 0.2)
           + (turbidity × 0.1)
           + (current_speed × 20)
           - (marine_life_density × 5)
```

### Decision Logic:
1. **Deploy (Green ✅):**
   - Risk score > 100
   - Battery level > 30%
   - Weather = Calm

2. **Partial Deployment (Orange ⚠️):**
   - Risk score > 70
   - Battery level > 50%

3. **Do Not Deploy (Red ❌):**
   - All other conditions

## Usage
1. Open `ai-advisor.html` in any modern web browser
2. Adjust sliders to set ocean parameters
3. Select weather condition from dropdown
4. Click "⚡ Predict Deployment" button
5. Review recommendation in the popup modal

## Navigation
The AI Advisor is accessible from all pages via the navigation menu:
- About Us
- Technology
- The Project
- Research
- **AI Advisor** ← New!

## Technical Details
- **Pure HTML/CSS/JavaScript** - No external dependencies
- **Tailwind CSS** via CDN for base styling
- **Custom CSS** for ocean theme and animations
- **Vanilla JavaScript** for interactivity and calculations
- **Responsive design** - Works on desktop and mobile

## Files Modified
- ✅ `ai-advisor.html` (created)
- ✅ `about.html` (navigation updated)
- ✅ `project.html` (navigation updated)
- ✅ `research.html` (navigation updated)
- ✅ `technology.html` (navigation updated)
- ✅ `index.html` (navigation updated)

## Deployment Ready
The page is fully functional and ready to deploy to Vercel or any static hosting platform. All assets are self-contained with no external file dependencies.

---
**Created:** October 31, 2025  
**Project:** Project Riptide - Robot Fish Ocean Cleanup
