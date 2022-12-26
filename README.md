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

## Discord commands

### Ping

Use `/ping` to make the bot respond with pong. Usefull to check if bot works.

### Help

Use `/help` to get a list of all commands in wow-bot.

### Ilvl

Use `/ilvl [realm] [character]` to get the ilvl of a given character in a given realm. You can also use `/ilvl all` to get the ilvl of all characters specified in `characters.json`.

### Quests

Use `/quests` to display all quests in common of all characters specified in `characters.json`.

## Jobs

### AchievementJob

Every 10 seconds, this job gets the achievement list of all characters specified in `characters.json` and displays a message in all channels specified in `config.json`

### DurabilityJob

Every minutes, this job finds all broken equipped items (or broken soon) of all characters specified in `characters.json` and displays a warning message in all channels specified in `config.json`
