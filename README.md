## Getting Started

First run the web socket:

```bash
npm run socket
```

Then run the NextJS app:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Features

This is a basic [Discord](https://discord.com/) clone with authentication, direct messaging, servers, channels, a friends system and some other basic Discord functionality.

## Technologies

Frontend:
 - [NextJS 14](https://nextjs.org/)
 - [TailwindCSS](https://tailwindcss.com/)
 - [Redux](https://redux.js.org/)

Backend:
 - [NextJS 14](https://nextjs.org/)
 - [SQLite database with Prisma ORM](https://www.prisma.io/)
 - [NextAuth.js](https://next-auth.js.org/)
 - [Socket.io](https://socket.io/)

## Problems

This project is unfinished.
 - Tooltips do not work properly.
 - This does not have every Discord feature!!
 - Some links direct to empty pages.

## Purpose

This was my first time using Next.js, web sockets, Redux, Next-Auth and Prisma.
Almost all the technologies in this project were new to me.
I found the start of the project to be very boilerplate-heavy with setting up Prisma and Next-Auth. In the future, I will be using the [T3 Stack](https://create.t3.gg/) which also includes type-safe API interactions.

## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/#)
