# Stitchmate
Stitchmate is a streamlined project organization and row-counting tool designed specifically for knitters. It replaces traditional paper notes with a sleek, digital journal that lives wherever you knit.

Each project features a dedicated counter designed to mimic the satisfying tactile interaction of a physical click counter. No matter how many projects you have, Stitchmate remembers exactly where you left off. An automatic sub-counter tracks pattern repeats effortlessly so you can focus on your stitches, not the math.

The UI is kept intentionally simple to get you started within seconds, then stays out of the way while you craft.

The project is under active development and frequently updated. You can view the live version at stitchmate.xyz.
A guest login is available, allowing you to explore the full functionality before signing up. 

The project is written in Typescript and Next.js and deployed via Vercel. It utilizes a cloud-hosted database on Turso. To setup a local development environment, please follow the instructions below.

All design concepts are custom-crafted with Figma. Components feature Radix Primitives for enhanced accessibility. CSS and Interactions are realised using Tailwind CSS and Motion.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) runtime

### Installation

1. Clone the repository:
```bash
git clone https://github.com/marlenemarbach/stitchmate-v2
cd stitchmate-v2
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```bash
DB_FILE_NAME=file:local.db
```

4. Set up the database:
```bash
bun drizzle-kit push
```

5. Run the development server:
```bash
bun dev
```

## License

© Marlene Marbach


