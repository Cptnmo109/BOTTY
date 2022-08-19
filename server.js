const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
bot.command = new Discord.Collection();
const ytdl = require("ytdl-core");
const client = bot;
const prefix = "?";
bot.afk = [];
const Canvas = require("canvas");
const Ranks = require("./models/ranks.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const xpcount = new Set();

// XP Message Listener
client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) return;
  const am = Math.floor(Math.random() * 25) + 1;
  Ranks.findOne({ id: message.author.id }, async function (err, user) {
    //   console.log(`${message.author.username} earned ` + am + " xp")

    if (err) console.log(err);

    if (!user) {
      const newUser = new Ranks({ id: message.author.id });
      newUser.save().catch((err) => console.log(err));
    } else {
      if (message.author.bot) return;
      // console.log(user)
      if (xpcount.has(message.author.id)) return;
      const nxtLvl = (user.level + 2) * 600;
      console.log(nxtLvl);
      if (nxtLvl < user.xp) {
        await Ranks.findOneAndUpdate(
          {
            id: message.author.id
          },
          { level: user.level + 1 }
        ).catch((err) => message.channel.send(err));
        console.log("Leveled up!");
      }
      // console.log(am)
      // console.log(user.xp)
      // console.log(user)
      await Ranks.findOneAndUpdate(
        {
          id: message.author.id
        },
        { xp: user.xp + am }
      ).catch((err) => console.log(err));

      const Rank1 = message.guild.roles.cache.find((r) => r.name === "Bronze");
      const Rank2 = message.guild.roles.cache.find((r) => r.name === "Silver");
      const Rank3 = message.guild.roles.cache.find((r) => r.name === "Gold");
      const Rank4 = message.guild.roles.cache.find((r) => r.name === "Emerald");
      const Rank5 = message.guild.roles.cache.find((r) => r.name === "Crystal");
      const Rank6 = message.guild.roles.cache.find((r) => r.name === "Legend");
      const Rank7 = message.guild.roles.cache.find((r) => r.name === "Veteran");
      const Rank8 = message.guild.roles.cache.find(
        (r) => r.name === "Exclusive"
      );
      const Rank9 = message.guild.roles.cache.find(
        (r) => r.name === "Champion"
      );

      if (user.level === 1) {
        message.member.roles.add(Rank1.id);
      } else if (user.level === 5) {
        message.member.roles.add(Rank2.id);
      } else if (user.level === 10) {
        message.member.roles.add(Rank3.id);
      } else if (user.level === 20) {
        message.member.roles.add(Rank4.id);
      } else if (user.level === 30) {
        message.member.roles.add(Rank5.id);
      } else if (user.level === 50) {
        message.member.roles.add(Rank6.id);
      } else if (user.level === 60) {
        message.member.roles.add(Rank7.id);
      } else if (user.level === 80) {
        message.member.roles.add(Rank8.id);
      } else if (user.level === 100) {
        message.member.roles.add(Rank9.id);
      }

      xpcount.add(message.author.id);

      setTimeout(() => {
        xpcount.delete(message.author.id);
      }, 60000);
    }
  });
});

// Message Listener
client.on("message", async (message) => {
  if (
    message.channel.id === "551108934161793024" ||
    message.channel.id === "539611757052690434"
  ) {
    const smile = client.emojis.cache.get("554430668902498305");
    const fire = client.emojis.cache.get("554430669145767936");
    const heart = client.emojis.cache.get("554430669242236978");

    message
      .react(smile)
      .then(() => message.react(fire))
      .then(message.react(heart));
  }
  if (message.author.bot || message.channel.type === "dm") return;

  if (message.content.indexOf(prefix) !== 0) return;
  if (message.author.id === "319138123642830858") return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  console.log();
  const commandFile = require(`./commands/${command}.js`);
  if (!commandFile) return message.channel.send(":x: | Incorrect Command.");
  commandFile.run(client, message, args);
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  bot.user.setActivity(
    ` with ${
      bot.guilds.cache.get("681463033520062464").memberCount
    } Developers!`,
    { type: "PLAYING" }
  );
  bot.user.setStatus("online");
});

bot.on("channelCreate", async (channel) => {
  const logs = bot.guilds.cache
    .get("681463033520062464")
    .channels.cache.find((c) => c.name === "mod-log");
  if (!logs) return console.log("Can't find logs channel.");
  const channelcreate = new Discord.MessageEmbed()
    .setTitle("Channel Created")
    .setColor("RANDOM")
    .setDescription(`A **${channel.type} channel** has been created!`)
    .addField(`The channel name: ${channel.name}`);
  logs.send(channelcreate);
});

bot.on("channelDelete", async (channel) => {
  const logs = channel.guild.channels.cache.find((c) => c.name === "mod-log");
  if (!logs) return console.log("Can't find logs channel.");
  const channeldelete = new Discord.MessageEmbed()
    .setTitle("Channel Deleted")
    .setColor("RANDOM")
    .setDescription("A channel has deleted!")
    .addField(`Name of the channel: **${channel.name}**`)
    .addField(`Type of the channel: **${channel.type}**`)
    .setTimestamp(new Date());
  logs.send(channeldelete);
});

client.on("guildMemberAdd", async (member) => {
  if (!member.bot) {
    Ranks.findOne({ id: member.id }, function (err, user) {
      if (!user) {
        const newUser = new Ranks({
          id: member.id
        });

        newUser.save().catch((err) => console.log(err));
      }
    });
  }
  const welcomejoin = member.guild.channels.cache.find(
    (c) => c.name === "welcome"
  );
  const modchannel = member.guild.channels.cache.find(
    (c) => c.name === "mod-log"
  );
  const users = bot.guilds.cache.get("681463033520062464").memberCount;
  if (!welcomejoin) return console.log("Can't find the welcome channel.");
  if (member.user.createdAt.getDay() < 14) {
    const NewMemberEmbed = new Discord.MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter(member.id)
      .setAuthor("Member Joined", member.user.displayAvatarURL())
      .addField(
        "Created At",
        `${member.user.createdAt.getFullYear()}, ${member.user.createdAt.getMonth()} months ago`
      )
      .setTimestamp();
    modchannel.send(NewMemberEmbed);
  } else {
    const MemberEmbed = new Discord.MessageEmbed()
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter("ID:", member.id)
      .setAuthor("Member Joined", member.user.displayAvatarURL())
      .setDescription("Welcome!")
      .setTimestamp();
    modchannel.send(MemberEmbed);
  }

  const applyText = (canvas, text) => {
    const ctx = canvas.getContext("2d");

    let fontSize = 70;

    do {
      ctx.font = `${(fontSize -= 10)}px sans-serif`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
  };

  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/3b28e387-dcc0-4bca-8aef-f793bc9e9dca%2FRobloxDevelopersWallpaper.png?v=1560990107633"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  // Slightly smaller text placed above the member's display name
  ctx.font = "28px sans-serif";
  ctx.fillStyle = "#000000";
  ctx.fillText(
    "Welcome to the server,",
    canvas.width / 2.5,
    canvas.height / 3.5
  );

  // Add an exclamation point here and below
  ctx.font = applyText(canvas, `${member.displayName}!`);
  ctx.fillStyle = "#000000";
  ctx.fillText(
    `${member.displayName}!`,
    canvas.width / 2.5,
    canvas.height / 1.8
  );
  ctx.beginPath();
  ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL());
  ctx.drawImage(avatar, 25, 25, 200, 200);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "welcome-image.png"
  );
  // Events
  welcomejoin.send(
    `Welcome ${member}, you're the ${users}th user!`,
    attachment
  );
  const memberjoin = new Discord.MessageEmbed()
    .setDescription(`${member} joined your party!`)
    .setImage(member.avatarURL())
    .setColor("#1dd3f4");
  welcomejoin.send(memberjoin);
});

bot.on("guildMemberAdd", async (member) => {
  member.send(
    `Welcome to ${member.guild.name}!\nPlease answer the following question so you can process.`
  );
});
bot.on("message", (message) => {
  if (
    botconfig.FILTER_LIST.some((word) =>
      message.content.toLowerCase().includes(word)
    )
  ) {
    message.delete();
    message.author.send("A swear word was detected!");
  }
});
bot.on("guildMemberRemove", async (member) => {
  const welcomejoin = member.guild.channels.cache.find(
    (c) => c.name === "welcome"
  );
  const modchannel = member.guild.channels.cache.find(
    (c) => c.name === "mod-log"
  );
  if (!welcomejoin) return console.log("Can't find the welcome channel.");
  const memberleavelog = new Discord.MessageEmbed()
    .setDescription(`${member} has been left.`)
    .setColor("#1dd3f4")
    .setTimestamp();
  const memberleave = new Discord.MessageEmbed()
    .setDescription(`${member} has been left. :frowning:`)
    .setColor("#1dd3f4")
    .setTimestamp();
  welcomejoin.send(memberleave);
  modchannel.send(memberleavelog);
});

bot.on("messageDelete", async (message) => {
  const modchannel = bot.guilds.cache
    .get(message.guild.id)
    .channels.cache.find((c) => c.name === "mod-log");
  if (!modchannel) return console.log("Can't find the Mod-log channel.");
  const deletedmessage = new Discord.MessageEmbed()
    .setDescription("A message has been deleted.")
    .addField("The message:", `${message}`)
    .addField("Channel", `${message.channel}`)
    .addField("Message By:", `<@${message.author.id}>`)
    .setColor("#10efc3")
    .setTimestamp();
  modchannel.send(deletedmessage);
});

bot.on("messageUpdate", async (newMessage, message) => {
  if (message.type !== "channel") return;
  const modchannel = bot.guilds.cache
    .get(message.guild.id)
    .channels.cache.find((c) => c.name === "mod-log");
  if (!modchannel) return console.log("Can't find the Mod-log channel.");
  const messageUpdate = new Discord.MessageEmbed()
    .setDescription("A message has been changed!")
    .addField("New message:", `${message}`)
    .addField("The message:", `${newMessage}`)
    .addField("Channel", `${message.channel}`)
    .addField("Changed By:", `<@${message.author.id}>`)
    .setColor("#10efc3")
    .setTimestamp();
  modchannel.send(messageUpdate);
});

bot.on("roleCreate", async (role) => {
  const modchannel = role.guild.channels.cache.find(
    (c) => c.name === "mod-log"
  );
  if (!modchannel) return console.log("Can't find the Mod-log channel.");
  const roleCreated = new Discord.MessageEmbed()
    .setDescription("A new role has been created.")
    .addField("The role:", `${role}`)
    .setColor("#10efc3")
    .setFooter(role.id)
    .setTimestamp();
  modchannel.send(roleCreated);
});

bot.on("roleDelete", async (role) => {
  const modchannel = role.guild.channels.cache.find(
    (c) => c.name === "mod-log"
  );
  if (!modchannel) return console.log("Can't find the Mod-log channel.");
  const roleDeleted = new Discord.MessageEmbed()
    .setDescription("A role has been Deleted.")
    .addField("The role:", `${role}`)
    .setColor("#10efc3")
    .setFooter(role.id)
    .setTimestamp();
  modchannel.send(roleDeleted);
});

const queue = new Map();
const YouTube = require("simple-youtube-api");

const youtube = new YouTube("AIzaSyC_aYZh3asa3I-Pwi4PLhn8y9V6rXIwmJs");

client.on("message", async (msg) => {
  // eslint-disable-line

  if (msg.author.bot || msg.channel.type === "dm") return;

  const Prefix = "?";
  if (!msg.content.startsWith(Prefix)) return undefined;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);

  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(Prefix.length);

  if (command === "play") {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      return msg.channel.send(
        "I'm sorry but you need to be in a voice channel to play music!"
      );
    }
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        "I cannot connect to your voice channel, make sure I have the proper permissions!"
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        "I cannot speak in this voice channel, make sure I have the proper permissions!"
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel.send({
        embed: new Discord.MessageEmbed()
          .setAuthor(
            "You Requested for Music, " + msg.author.tag,
            msg.author.avatarURL()
          )
          .setDescription(
            `:notes: **PlayList Added:**
**»** ${playlist.title}`
          )
          .setColor("#000000")
      });
    } else if (!searchString) {
      msg.channel.send({
        embed: new Discord.MessageEmbed()
          .setAuthor(
            "You Requested for Music, " + msg.author.tag,
            msg.author.avatarURL()
          )
          .setDescription(
            `**Usage:**  ${Prefix}play <search>
If you want to listen to music, you have
to put a search string ahead! That's all.`
          )
          .setColor("#000000")
      });
    } else {
      let video;
      try {
        video = await youtube.getVideo(url);
      } catch (error) {
        try {
          const videos = await youtube.searchVideos(searchString, 5);
          let index = 0;
          msg.channel.send({
            embed: new Discord.MessageEmbed()
              .setAuthor(
                "You Requested for Music, " + msg.author.tag,
                msg.author.avatarURL()
              )
              .setDescription(
                `__**Youtube Search Result**__
${videos.map((video2) => `**${++index}.** ${video2.title}`).join("\n")}
To select a song, type any number from \`1 - 5\` to choose song!
The search is cancelled in \`10 seconds\` if no number provided.`
              )
              .setColor("#000000")
          });
          let response;
          try {
            await msg.channel
              .awaitMessages((msg2) => msg2.content > 0 && msg2.content < 6, {
                max: 1,
                time: 10000,
                errors: ["time"]
              })
              .then((collected) => {
                response = collected.first().content;
              });
          } catch (err) {
            console.error(err);
            return msg.channel.send(
              "Invalid numbers inserted or no received numbers. I'm Cancelling your Search."
            );
          }
          // var response = 1;
          //	const videoIndex = parseInt(response.first().content);
          if (Number(response) && videos[Number(response) - 1]) {
            video = await youtube.getVideoByID(videos[Number(response) - 1].id);
          }
        } catch (err) {
          console.error(err);
          return msg.channel.send("Yo! I could not find any results!");
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "skip") {
    if (!msg.member.voice.channel) {
      return msg.channel.send(
        ":red_circle: **Not in a voice channel, I am talking to you**"
      );
    }
    if (!serverQueue) {
      return msg.channel.send(
        ":mailbox_with_no_mail: **I can't skip an empty queue**"
      );
    }
    serverQueue.connection.dispatcher.destroy("Skip command has been used!");
    return undefined;
  } else if (command === "stop") {
    if (!msg.member.voice.channel) {
      return msg.channel.send(
        ":red_circle: **Not in a voice channel, I am talking to you**"
      );
    }
    if (!serverQueue) {
      return msg.channel.send(
        ":mailbox_with_no_mail: **Nothing to stop, because there is no music!**"
      );
    }
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.destroy("Stop command has been used!");
    msg.channel.send({
      embed: new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setDescription("The player has been stopped.")
        .setColor("#000000")
    });
    return undefined;
  } else if (command === "volume") {
    if (!msg.member.voice.channel) {
      return msg.channel.send("You are not in a voice channel!");
    }
    if (!serverQueue) return msg.channel.send("There is nothing playing.");
    if (!args[1]) {
      return msg.channel.send(
        `The current volume is: **${serverQueue.volume}**`
      );
    }
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.send(`I set the volume to: **${args[1]}**`);
  } else if (command === "np" || command === "nowplaying") {
    if (!serverQueue) {
      return msg.channel.send(
        ":mailbox_with_no_mail: **Wait, There is no music playing!**"
      );
    }
    return msg.channel.send({
      embed: new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setDescription(
          `:notes: **Currently Playing:**\n${serverQueue.songs[0].title}`
        )
        .setColor("#000000")
        .setThumbnail(
          `https://img.youtube.com/vi/${serverQueue.songs[0].id}/mqdefault.jpg`
        )

        .setTimestamp(new Date())
    });
    // msg.channel.send(`Yo yo! I'm playing :notes: ,**${serverQueue.songs[0].title}**, :notes: currently!`);
  } else if (command === "queue" || command === "q") {
    if (!serverQueue) {
      return msg.channel.send(
        ":mailbox_with_no_mail: **What? Nothing is playing at all?**"
      );
    }
    return msg.channel.send({
      embed: new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setDescription(
          `:notes: **Song Current Queue:**\n${serverQueue.songs
            .map((song) => `**»** ${song.title}`)
            .join("\n")}`
        )
        .setColor("#000000")

        .setTimestamp(new Date())
    });
  } else if (command === "pause") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send(":pause_button: **The player has been Paused**");
    }
    return msg.channel.send(
      ":mailbox_with_no_mail: **This DJ don`t know how to pause empty song!**"
    );
  } else if (command === "resume") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send(":play_pause: **The player has been resumed**");
    }
    return msg.channel.send(
      ":mailbox_with_no_mail: **This DJ don't know how to resume an empty list!**"
    );
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: Discord.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);
    msg.channel.send({
      embed: new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setDescription(`:notes: **Now Playing:**\n${video.title}`)
        .setTimestamp(new Date())
        .setThumbnail(`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`)
        .setColor("#000000")
    });

    try {
      const connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(`I could not join the voice channel: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) {
      return undefined;
    } else {
      return msg.channel.send({
        embed: new Discord.MessageEmbed()
          .setAuthor(msg.author.tag, msg.author.avatarURL())
          .setDescription(`:notes: **Added Song:**\n${video.title}`)
          .setTimestamp(new Date())
          .setThumbnail(`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`)

          .setColor("#000000")
      });
    }
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("end", (reason) => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song ended.");
      else console.log(reason);

      serverQueue.songs.shift();
      setTimeout(() => {
        play(guild, serverQueue.songs[0]);
      }, 250);
    })
    .on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

bot.login(botconfig.token).catch(console.error);
