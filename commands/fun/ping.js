const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bingo')
		.setDescription('Reply with bing bang'),
	async execute(interaction) {
		await interaction.reply({ content: 'bingi bang', ephemeral: true });
	},
};