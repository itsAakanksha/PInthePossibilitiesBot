const { SlashCommandBuilder } = require('discord.js');


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

  
  module.exports = {
      data: new SlashCommandBuilder()
      .setName('pin')
      .setDescription('new career'),
      async execute(interaction) {
        const randomCareers = careers.sort(() => Math.random() - 0.5).slice(0, 4);
		await interaction.reply({
            content: `Here are your four careers:
        A - ${randomCareers[0]}
        B - ${randomCareers[1]}
        C - ${randomCareers[2]}
        D - ${randomCareers[3]}
        \nWhich quadrant will these careers go in?`,
            ephemeral: true
          });
	},
};