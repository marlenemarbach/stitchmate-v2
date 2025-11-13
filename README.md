# StitchMate v4
Stitchmate is a multitasking app for knitters and crocheters. It organises multible row counters for each project and tracks increase, decrease and short rows automatically. 

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Runtime**: [Bun](https://bun.sh)
- **UI**: React 19, TypeScript, Tailwind CSS 4
- **Database**: SQLite with [libSQL](https://github.com/tursodatabase/libsql-client-ts)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Animations**: [Motion](https://motion.dev)
- **Validation**: [Zod](https://zod.dev)
- **Testing**: bun, React Testing Library, Happy DOM
- **Styling**: Tailwind CSS

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


