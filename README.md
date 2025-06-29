# Monster Fight Game

Welcome to the Monster Fight Game! This application is a technical challenge where you can create monsters and watch them battle each other.

## Features

- Create a monster with the following attributes:
  - `name` - string
  - `attack` - int
  - `defense` - int
  - `speed` - int
  - `hp` - int
  - `image_url` - string
- Create a battle between two monsters.
- See the battle's result automatically after the battle ends.

## Battle Algorithm

The battle algorithm is calculated as follows:

- The monster with the highest speed attacks first. If both speeds are equal, the monster with the highest attack goes first.
- To calculate the damage, subtract the defense from the attack (`attack - defense`). The difference is the damage. If the attack is equal to or less than the defense, the damage is 1.
- Subtract the damage from the `hp` of the monster that was attacked (`hp = hp - damage`).
- The monsters will battle in rounds until one wins. All rounds are calculated at once.
- The winner is the monster that reduces the enemy's `hp` to zero first.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/monster-fight-game.git
    ```
2.  Install NPM packages
    ```sh
    pnpm install
    ```
3.  Run the application
    ```sh
    pnpm dev
    ```

## Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
