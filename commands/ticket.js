const discord = require("discord.js");

module.exports.run = async (bot, message, arguments) => {

    const categoryId = "658960577154252811";
	let onderwerp = arguments.join(" ");

    var userName = message.author.username;
    var userDiscriminator = message.author.discriminator;

    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => {

        createdChan.setParent(categoryId).then((settedParent) => {

            settedParent.overwritePermissions(message.guild.roles.find("name", "@everyone"), { "READ_MESSAGES": false});

            settedParent.overwritePermissions(message.guild.roles.find("name", "💠-STAFF"), {                
            
                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
                
            });

            settedParent.overwritePermissions(message.author, {
 
                "READ_MESSAGES": true, "SEND_MESSAGES": true,
                "ATTACH_FILES": true, "CONNECT": true,
                "CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true
 
            });

            var createEmbed = new discord.RichEmbed()
                .setTitle("Beste, " + message.author.username)
                .setDescription(`Stel u vraag in <#${settedParent.id}>`)
                .setFooter("Je ticket ligt op de lopende band");
    
            message.channel.send(createEmbed);
			
			 var embedParent2 = new discord.RichEmbed()
            .setTitle("Beste, " + message.author.username.toString())
            .setDescription(" Hier is uw ticket")
			.addField("Reden: ", `**Geen onderwerp meegegeven**`);
	if(!onderwerp) {
		settedParent.send(embedParent2);
		
	} else {

            var embedParent = new discord.RichEmbed()
            .setTitle("Beste, " + message.author.username.toString())
            .setDescription(" Hier is uw ticket")
			.addField("Reden: ", `**${onderwerp}**`);
        settedParent.send(embedParent); }



		
    }).catch(err => {
        message.channel.send("Er is iets fout gelopen.");
    });

}).catch(err => {
    message.channel.send("Er is iets fout gelopen.");
}); 


}

module.exports.help = {
    name: "ticket",
    description: "Maak een ticket aan"
}