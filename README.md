
# DevLink Tech Stack: REACT | TailwindCSS | NEXT | Prisma | MongoDB | NextAuth
### Deployed on Vercel

[DevLink DEMO](https://devlinkapp.vercel.app/)

DevLink allowed me to learn how implement:
- Authentication system
- Notification system
- Image Upload using Base64 strings
- Prisma ORM with MongoDB
- 1 To Many Relations (User - Post)
- Many To Many Relations (Post - Comment)
- Following functionality
- Comments / Replies

### Prerequisites

**Node version 14.x** + 

### Cloning the repository

```shell
git clone https://github.com/MiguelCamilo/DevLinks-App.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
DATABASE_URL=
NEXTAUTH_JWT_SECRET=
NEXTAUTH_SECRET=
```

### Start the app
```shell
npm run dev && prisma generate
```
 *(delete prisma generate if deploying somewhere other than vercel)*

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |