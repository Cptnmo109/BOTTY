const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
  const embedhelpmember = new Discord.MessageEmbed()
    .setDescription("**Commands**")
    .addField("`- help`", "Displays this embed. (?help)")
    .addField("`- warn`", "Warns the specified user. (?warn @user [reason])")
    .addField("`- kick`", "Kicks the specified user. (?kick @user [reason])")
    .setColor(0xf4d742)
    .addField(
      "`- apply`",
      "Sends an application prompt for you to fill out. (?apply)"
    )
    .addField(
      "`- rank`",
      "Provides a user's level and XP in the server. (?rank @user)"
    )
    .addField(
      "`- serverinfo`",
      "Provides information on the server. (e.g membercount, owner, etc.)"
    )
    .addField(
      "`- removerole`",
      "Removes a role from the specified user. (?removerole @user [Role])"
    )
    .addField(
      "`- addrole`",
      "Adds a role to the specified user. (?addrole @user [Role])"
    )
    .addField(
      "`- report`",
      "Reports the specified user to the staff team for fast moderation. (?report @user [Reason])"
    )
    .addField(
      "`- tempmute`",
      "Mutes the specified user for an amount of time. (?tempmute @user [time])"
    )
    .addField(
      "`- warnlevel`",
      "Provides the amount of warns the specified user has got. (?warnlevel @user)"
    )
    .addField(
      "`- verify`",
      "Verifies your Roblox account on Discord. (?verify username)"
    )
    .addField("`- ban`", "Bans the specified user. (?ban @user [Reason])")
    .addField("`- unban`", "Unbans the specified user. (?unban @user [Reason])")
    .addField(
      "`- links`",
      "Sends you the official social links that [RD] Roblox Developers owns. (?links)"
    )
    .addField(
      "`- suggest`",
      "Posts your suggestion in <#548537793236697088>. (?suggest [Suggestion])"
    );
  const embedhelpadmin = new Discord.MessageEmbed()
    .setColor(0xff0000)
    .setFooter(
      "Bot Version 1.0.1 | Made by GoBlox#0001, DevLevii#0098, proxyattack#0001",
      bot.user.displayAvatarURL()
    );

  if (message.member.roles.cache.some((r) => ["Owner"].includes(r.name)))
    message.author.send(embedhelpadmin);
  return message.author.send(embedhelpmember);
};

module.exports.help = {
  name: "help"
};
