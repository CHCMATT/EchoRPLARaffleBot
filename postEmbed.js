let { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
let dbCmds = require('./dbCmds.js');

module.exports.postEmbed = async (client) => {
	let countTicketsSold = await dbCmds.readSummValue("countTicketsSold");
	let countUniquePlayers = await dbCmds.readSummValue("countUniquePlayers");

	// Theme Color Palette: https://coolors.co/palette/03045e-023e8a-0077b6-0096c7-00b4d8-48cae4-90e0ef-ade8f4-caf0f8

	countTicketsSold = countTicketsSold.toString();
	countUniquePlayers = countUniquePlayers.toString();

	let raffleItemEmbed = new EmbedBuilder()
		.setTitle(`Rhinehart Raffle`)
		.setImage(`https://i.imgur.com/0fBeGoH.jpeg`)
		.setColor(`023E8A`)

	let ticketsSoldEmbed = new EmbedBuilder()
		.setTitle('Raffle Tickets Sold:')
		.setDescription(countTicketsSold)
		.setColor('0077B6');

	let uniquePlayersEmbed = new EmbedBuilder()
		.setTitle('Unique Raffle Participants:')
		.setDescription(countUniquePlayers)
		.setColor('0096C7');

	let btnRows = addBtnRows();

	client.embedMsg = await client.channels.cache.get(process.env.EMBED_CHANNEL_ID).send({ embeds: [raffleItemEmbed, ticketsSoldEmbed, uniquePlayersEmbed], components: btnRows });

	await dbCmds.setMsgId("embedMsg", client.embedMsg.id);
};

function addBtnRows() {
	let row1 = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId('addTickets')
			.setLabel('Add Tickets Sold')
			.setStyle(ButtonStyle.Success),

		new ButtonBuilder()
			.setCustomId('removeTickets')
			.setLabel('Remove Tickets Sold')
			.setStyle(ButtonStyle.Danger),

		new ButtonBuilder()
			.setCustomId('completeRaffle')
			.setLabel('End Raffle')
			.setStyle(ButtonStyle.Primary),
	);

	let rows = [row1];
	return rows;
};