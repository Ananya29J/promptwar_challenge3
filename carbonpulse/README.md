# CarbonPulse

CarbonPulse is a modern, gamified web application designed to help individuals track, understand, and reduce their carbon footprint through beautiful data visualization and engaging micro-interactions.

## Chosen Vertical
**Sustainability & Eco-Gamification**
We chose the sustainability vertical because climate action often suffers from a "data disconnect" — people want to help, but carbon tracking is usually presented as dry, boring spreadsheets. CarbonPulse bridges this gap by turning sustainability into a highly visual, rewarding, and engaging experience.

## Approach and Logic
Our approach focuses on transforming abstract emissions data into tangible, beautiful visual feedback:
1. **Visual Excellence over Spreadsheets**: Instead of just showing numbers, we use vibrant "bento box" UI layouts, smooth animations (`framer-motion`), and rich aesthetic gradients to make the app feel premium and inviting.
2. **Immediate Feedback Loop**: We built a heavily interconnected state logic. Actions in one part of the app (e.g., checking off a sustainable habit) immediately reflect elsewhere (e.g., growing your Eco Twin).
3. **Exploratory Learning**: We integrated tools like the **Impact Forecaster** and a real-time **3D Earth** to allow users to play with data and visualize the global impact of local changes.

## How the Solution Works
The application is built on **Next.js**, utilizing React Client Components for stateful interactivity.

- **Onboarding & Assessment**: Users are greeted with a "Take Quick Assessment" modal. By answering three simple lifestyle questions, the app establishes their initial carbon baseline score.
- **Score Dashboard & Quests**: Users manage a checklist of "Carbon Quests" (e.g., commuting by bike, eating plant-based). Checking these off dynamically drives real-time updates across three interconnected components:
  - **Carbon Score**: Increases up to 100 as quests are completed.
  - **Climate Rings**: An SVG-animated visualization breaking down impact by Energy, Transport, and Consumption.
  - **Eco Twin**: A dynamic, minimalist terrarium that starts as a tiny sprout and visually flourishes into a thriving ecosystem as the user's score increases.
- **Impact Forecaster**: A split-pane simulator that lets users toggle hypothetical lifestyle changes to instantly see how their annual CO2 footprint (in tons) and 5-year trajectory would change, presented like a receipt.
- **3D Earth**: A WebGL globe built with `@react-three/fiber` that visualizes collective climate events and data points around the world.

## Assumptions Made
To build this prototype rapidly, several assumptions were made:
- **Client-Side Data**: We assumed a fully client-side state model for this demonstration. Backend integration, authentication, and persistent database storage (e.g., PostgreSQL) are mocked via local React state and static data files (`src/lib/carbon-data.ts` and `achievements.ts`).
- **Simplified Carbon Math**: The calculations mapping lifestyle choices to carbon scores (and tons of CO2) are simplified proxy values designed to demonstrate the UI's reactivity, rather than peer-reviewed climate science models.
- **Modern Browser Capabilities**: We assume the user is accessing the application on a modern browser that supports WebGL (for the Three.js globe) and advanced CSS/SVG animations.
