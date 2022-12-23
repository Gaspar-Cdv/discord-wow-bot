# Discord bot

## Configuration

Copy `src/config/config.json.tpl` and rename it to `config.json`. Set it with the correct values (find them on Discord API).

Copy `src/config/characters.json.tpl` and rename it to `characters.json`. It will be used for jobs to get data about these characters.

## Run

Before running the bot, deploy the commands to make sure they are accessible in the channel when the bot will be.
```
npm run deploy-commands
```

Then, you can run the server with
```
npm start
```
