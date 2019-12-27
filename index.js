const discord = require("discord.js");
const botConfig = require("./botconfig.json");
const active = new Map();


const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) =>{

    if(err)console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles <=0) {
        console.log("Files not found. Sorry");
        return;        
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`File ${f} is ready`);

        bot.commands.set(fileGet.help.name, fileGet);

    })

});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is nu online en klaar voor gebruik.`);

    bot.user.setActivity(`Promotie`, { type: "WATCHING" });
	
	    bot.on("guildMemberAdd", member => {
        var role = member.guild.roles.find("name", "👣 | Member"); 
        if (!role) return;
        member.addRole(role);
 
        const channel = member.guild.channels.find("name", "〖👋〗welcome");
        if (!channel) console.log("Kan het kanaal niet vinden.");
     
        var joinEmbed = new discord.RichEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
            .setDescription(`Hoi ${member.user.username}, Welkom op **Promotie** Discord Server.`)
            .setColor("#00FF00")
            .setTimestamp()
            .setFooter("Gebruiker gejoined.");
     
        channel.send(joinEmbed);
 

     
    });
    bot.on("guildMemberRemove", member => {
 
        const channel = member.guild.channels.find("name", "〖👋〗goodbye");
        if (!channel) console.log("Kan het kanaal niet vinden.");
     
        var leaveEmbed = new discord.RichEmbed()
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
            .setColor("#FF0000")
            .setTimestamp()
            .setFooter("Gebruiker Geleaved.");
     
        channel.send(leaveEmbed);
     
    });

});


bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefix = botConfig.prefix;

    if(message.content.startsWith("!"));

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    if(commands) commands.run(bot,message, arguments);
 
	var options = {
    active: active
}
 
	if (commands) commands.run(bot, message, args, options);


    
});




bot.login(botConfig.token);





