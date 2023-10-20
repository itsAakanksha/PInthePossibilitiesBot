require("dotenv").config();
const { token } = process.env;
const fs = require("fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
});


client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});






const careers = [
  "Software Engineer",
  "Doctor",
  "Teacher",
  "Lawyer",
  "Artist",
  "Musician",
  "Athlete",
  "Entrepreneur",
  "Writer",
  "Designer",
  "Nurse",
  "Accountant",
  "Police Officer",
  "Firefighter",
  "Chef",
  "Pilot",
  "Scientist",
  "Engineer",
  "Architect",
  "Social Worker",
  "Politician",
];

client.on("messageCreate", async (message) => {
  if (message.content === "!pin") {
    // Get a random selection of careers from the pool of careers
    const randomCareers = careers.sort(() => Math.random() - 0.5).slice(0, 4);

    // Share the careers with the user
    message.reply({
      content: `Here are your four careers:
  A - ${randomCareers[0]}
  B - ${randomCareers[1]}
  C - ${randomCareers[2]}
  D - ${randomCareers[3]}
  \nWhich quadrant will these careers go in?`,
      ephemeral: true
    });
    console.log("hi");

    const gameState = {
      currentPlayer: message.author,
      currentCareer: randomCareers[0],
      remainingCareers: randomCareers.slice(1),
      quadrants: {
        1: [],
        2: [],
        3: [],
        4: [],
      },
    };

    // Add the game state to the user's data

    // await client.users.cache.set(message.author.id, gameState);

    // Access the values of A, B, C, and D inside the async context
    const a = gameState.currentCareer;
    const b = gameState.remainingCareers[0];
    const c = gameState.remainingCareers[1];
    const d = gameState.remainingCareers[2];

    const username = message.author.username;
    console.log(`The values of A, B, C, and D are: ${a}, ${b}, ${c}, ${d}`);
    console.log(`The username of the user is: ${username}`);
  }
});

client.login(`${token}`);
