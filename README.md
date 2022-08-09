A serverless Discord Bot designed for Cloudflare Workers.

Average CPU Time (roughly) w/o database:
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
2) Install Wrangler globally with "npm i wrangler -g"
3) Set environment variables locally (see sample.env file)
4) Run "npm run generate"
5) Create a Cloudflare Worker and set its name in the wrangler.toml file
6) Create an application at https://discord.dev
7) Create a Prisma Proxy at https://cloud.prisma.io
8) Set environment variables/secrets in both the Worker dashboard and the wrangler.toml file
9) Run "npm run dev" for local testing (use ngrok or similar to route localhost)
10) Run "npm run publish" to deploy to Cloudflare Workers
11) Set your Worker's link in the interaction endpoint URL of your Discord application