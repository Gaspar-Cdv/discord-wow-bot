# Discord bot

## Configuration

Copy `src/config.json.tpl` and rename it to `config.json`. Set it with the correct values (find them on Discord API).

## Run

Before running the bot, deploy the commands to make sure they are accessible in the channel when the bot will be.
```
npm run deploy-commands
```

Then, you can run the server with
```
npm start
```