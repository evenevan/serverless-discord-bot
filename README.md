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

Secrets: DISCORD_APPLICATION_ID, DISCORD_TOKEN, DISCORD_PUBLIC_KEY

You need wrangler to use this bot. Install via "npm i wrangler -g"

"npm run dev" for local testing (use ngrok or similar to route localhost)

"npm run publish" to deploy to Cloudflare Workers

For a database, you could use something like postgrest to use postgreSQL over http.