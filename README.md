A serverless Discord Bot designed for Cloudflare Workers.

Average CPU Time (roughly):
- 50th percentile: 2 milliseconds
- 75th percentile: 2.5 milliseconds
- 99th percentile: 3.5 milliseconds
- 99.9th percentile: 3.5 milliseconds

Features:
- Basic i18n implementation
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