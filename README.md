# React + TypeScript + Vite

### Spatial Tic-Tac-Toe (Aurora Edition)
A hyper-modern, visually stunning take on the classic Tic-Tac-Toe game. Built with React and Vite, this project utilizes a "Spatial UI" design language featuring frosted glassmorphism, fluid aurora backgrounds, magnetic spring animations, and neon laser effects.

#### Key Features
- Spatial UI Design: Frosted glass panels (backdrop-blur) that float above a dynamic, shifting aurora background.

- Magnetic Interactions: Grid cells depress physically when clicked, powered by Framer Motion's spring physics.

- Dynamic Visual Feedback:
  - Winning lines are rendered as glowing, animated neon lasers.
  - Scalable, high-quality SVG iconography (Lucide React) replaces standard text.
  - Smooth transitions for game states (Turn -> Win/Draw).

- Smart Game Logic: Automatic detection for horizontal, vertical, and diagonal wins, as well as stalemates.

- Responsive Architecture: Scales perfectly from mobile devices to large desktop monitors.

#### Technology Stack
- Core: React 19 + TypeScript
- Build Tool: Vite (Lightning-fast HMR)
- Styling: Tailwind CSS v4 (Utility-first styling with dynamic spacing)
- Animation Engine: Framer Motion (Declarative animations & gesture physics)
- Iconography: Lucide React (Clean, scalable SVGs)
- Typography: 'Outfit' Google Font (Modern geometric sans-serif)


### Project Structure
```Plaintext
tic-tac-toe/
├── public/
│   └── tic-tac-toe-favicon.png
├── src/
│   ├── App.css                    # Base CSS, fonts, and animation keyframes
│   ├── App.tsx                    # Main layout, background, and component wrapper
│   └── main.tsx                   # React DOM rendering entry point
├── .gitignore                     # Specifies intentionally untracked files to ignore
├── eslint.config.js               # Linter configuration (standard Vite setup)
├── index.html                     # Main HTML file (with updated favicon paths)
├── package-lock.json              # Exact dependency versions
├── package.json                   # Project scripts and dependencies
├── README.md                      # Project documentation and setup guide
├── tsconfig.app.json              # TypeScript config for the React app code
├── tsconfig.json                  # Main TypeScript workspace config
├── tsconfig.node.json             # TypeScript config for Vite/Node environment
└── vite.config.ts                 # Vite bundler configuration
```

#### Design Philosophy
- This project was built to demonstrate how a simple algorithmic problem (Tic-Tac-Toe) can be elevated through modern UI/UX principles.

  - Immersion over Utility: Instead of a flat grid, the game uses depth, shadow, and blur to create a sense of physical space.

  - Feedback Loops: Every interaction provides immediate visual feedback. Hover states, tap states (scale reduction), and the dramatic laser-strike upon winning make the game feel tactile and rewarding.


#### Prerequisites
You need Node.js installed on your machine.
- Node.js (Version 18.0.0 or higher recommended)


### Installation

1: Clone the Repository
First, download the code from your GitHub repository to your local machine:
```Bash
git clone https://github.com/swapnilk06/Tic-Tac-Toe-Game.git
```

2: Navigate into the Project Folder
Move into the folder that Git just created:
```Bash
cd Tic-Tac-Toe-Game
```

3: Install the Dependencies
Since this project relies on React, Vite, Tailwind CSS, Framer Motion, and Lucide React, you need to download those packages. Run:
```Bash
npm install
```

4: Start the Development Server
Once the installation is complete, fire up the Vite server:
```Bash
npm run dev
```

5: View the Game
Your terminal will output a local server link (usually http://localhost:5173).