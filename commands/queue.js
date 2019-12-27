module.exports.run = async (bot, message, args, ops) => {
 
    // Ophalen van het ID van de server voor de data.
    var guildIDData = ops.active.get(message.guild.id);
 
    // Nakijken als er al liedjes gepsleet worden in deze server.
    if (!guildIDData) return message.channel.send("Er is geen muziek aan het spelen op dit moment.");
 
    // Data ophalen.
    var queue = guildIDData.queue;
    var nowPlaying = queue[0];
 
    // Eerst een lijn met het liedje dat al speelt.
    var response = `Nu aan het spelen ${nowPlaying.songTitle} || Aangevraagd door ${nowPlaying.requester}\n\nQueue: \n`;
 
    // Voor ieder liedje in de lijst gaan we deze toevoegen aan het bericht.
    for (var i = 0; i < queue.length; i++) {
 
        response += `${i}, ${queue[i].songTitle} Aangevraagd door ${queue[i].requester}\n`;
 
    }
   
    // Zenden van het bericht.
    message.channel.send(response);
 
}
 
module.exports.help = {
    name: "queue",
    description: "Stelt een wachtlijst samen"
}