A serverless Discord Bot designed for Cloudflare Workers.

Average CPU Time (roughly):
- Median: 3.5 milliseconds
- 50th percentile: 3.5 milliseconds
- 75th percentile: 4.4 milliseconds
- 99th percentile: 5.1 milliseconds
- 99.9th percentile: 5.2 milliseconds

Features:
- Basic i18n implementation
- Built in database via Prisma (WIP)
- Chat input support (Slash commands)
- Context menu support (Right click actions)
- Easy deployment of commands
- Minimal dependencies
- Object-oriented design
- Organized command structure
- Written in TypeScript

Secrets: DATABASE_URL, DISCORD_APPLICATION_ID, DISCORD_TOKEN, DISCORD_PUBLIC_KEY

1) Run "npm i"
2) Run "npx prisma generate --data-proxy"
3) Install Wrangler globally with "npm i wrangler -g"
4) Create a Cloudflare Worker and set its name in the wrangler.toml file
5) Create an application at https://discord.dev
6) Create a Prisma Proxy at https://cloud.prisma.io
7) Set the variables/secrets in both the Worker dashboard and the wrangler.htoml file
8) Run "npm run dev" for local testing (use ngrok or similar to route localhost)
9) Run "npm run publish" to deploy to Cloudflare Workers
10) Set your Worker's link in the interaction endpoint URL of your Discord application