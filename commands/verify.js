const discord = require("discord.js");
const request = require("request");
const profile_url = "https://www.roblox.com/users/profile?username=";
const avatar_url =
  "https://www.roblox.com/bust-thumbnail/json?width=512&height=512&format=png&userId=";

const encryptionArray = ["roblox", "candy", "bot", "fish", "xd"];

module.exports.run = async (bot, message, args) => {
  if (!args[0]) {
    message.channel.send("Please provide a username.").catch((err) => {
      throw err;
    });
    return;
  }

  const username = String(args[0]);

  request(
    profile_url + username,
    {
      json: true
    },
    (err, res) => {
      if (err) {
        throw err;
      }
      const status = res.statusCode;
      if (status !== 200) {
        message.channel.send("Could not find this user.").catch((err) => {
          throw err;
        });
        return;
      }

      const profileUrl = String(res.request.uri.href);
      const userId = String(profileUrl.replace(/\D/g, ""));
      const discordId = String(message.author.id);
      let verificationString = "";

      for (let i = 0; i < userId.length; i++) {
        verificationString += encryptionArray[Number(userId.charAt(i))] + " ";
      }
      for (let i = 0; i < discordId.length; i++) {
        if (i < discordId.length - 1) {
          verificationString +=
            encryptionArray[Number(discordId.charAt(i))] + " ";
        } else {
          verificationString += encryptionArray[Number(discordId.charAt(i))];
        }
      }

      const avatarReqUrl = avatar_url + userId;

      request(avatarReqUrl, { json: true }, (err1, res1, body1) => {
        if (err1) {
          throw err1;
        }
        let avatarUrl;
        if (res.statusCode !== 200) {
          avatarUrl =
            "https://cdn.discordapp.com/attachments/501349666084880404/515850999097982976/Eror404.png";
        } else {
          avatarUrl = body1["Url"];
        }
        const data = {};

        data["Author"] = message.author;
        data["Member"] = message.member;
        data["BotId"] = bot.user.id;
        data["Username"] = username;
        data["ProfileUrl"] = profileUrl;
        data["AvatarUrl"] = avatarUrl;
        data["VerificationKey"] = verificationString;
        data["Channel"] = message.channel;

        sendEmbed(data, message);
      });
    }
  );
};

const sendEmbed = async function sendEmbed(data, message) {
  const verificationEmbed = new discord.MessageEmbed()
    .setColor("#0xFFFFFF")
    .setAuthor(data["Username"], data["AvatarUrl"], data["ProfileUrl"])
    .setTitle("Status Link")
    .setURL(data["ProfileUrl"])
    .setThumbnail(data["AvatarUrl"])
    .setDescription(
      "Add / Set the key to your status \n \n - Make sure to verify within 5 minutes. \n - Press ✅ when you are done. \n - Press 🚫 to cancel."
    )
    .addField("Verification Key", data["VerificationKey"]);

  const send_embed = await data["Channel"]
    .send({
      embed: verificationEmbed
    })
    .catch((err) => {
      throw err;
    });
  message.channel.send("Mobile Users :arrow_down:");
  message.channel.send(data["VerificationKey"]);

  const voteData = {};
  voteData["Embed"] = send_embed;
  voteData["Author"] = data["Author"];

  addVote(voteData, data, message);

  return verificationEmbed;
};

const addVote = async function addVote(voteData, data, message) {
  let canDelete = true;
  const embed = voteData["Embed"];
  embed
    .react("✅")
    .then(() => {
      embed.react("🚫").catch((err) => {
        throw err;
      });
    })
    .catch((err) => {
      throw err;
    });

  await embed.awaitReactions(
    (reaction, reactedUser) => {
      if (reaction.emoji.name === "✅" && reaction.count > 1) {
        canDelete = false;
        if (reactedUser === voteData["Author"]) {
          checkVerification(embed, data, message);
        }
      } else if (reaction.emoji.name === "🚫" && reaction.count > 1) {
        canDelete = false;
        if (reactedUser === voteData["Author"]) {
          if (embed) {
            embed.delete().catch((err) => {
              throw err;
            });
          }
        }
      }
    },
    {
      time: 1000 * 60 * 5
    }
  );

  if (embed.deleted) {
    canDelete = false;
  }

  if (canDelete === true) {
    embed.delete().catch((error) => {
      throw error;
    });
    return;
  }
  return;
};

const checkVerification = async function checkVerification(
  embed,
  data,
  message
) {
  request(data["ProfileUrl"], { json: false }, (err, res, body) => {
    if (err) throw err;

    const status_regex = /data-statustext=(.*?) data-editstatusmaxlength/i;
    if (body.match(status_regex) === null) {
      message.channel.send("This account is terminated!").catch((err) => {
        console.log(err);
      });
      return;
    }
    const status = String(body.match(status_regex)[1]);

    const bio_regex = /<span class="profile-about-content-text linkify" ng-non-bindable>(.*?)<.*?span>/s;
    const bio = String(body.match(bio_regex)[1]);

    if (
      !status.includes(data["VerificationKey"]) &&
      !bio.includes(data["VerificationKey"])
    ) {
      if (embed) {
        embed.delete().catch((err) => {
          throw err;
        });
      }
      embed.channel
        .send("Verification Failed - Missing Verification Key")
        .catch((err) => {
          throw err;
        });
      return;
    }
    verifyUser(embed, data);
  });
};

function verifyUser(embed, data) {
  const author = data["Author"];
  const botId = data["BotId"];
  const username = data["Username"];
  const member = data["Member"];

  if (
    embed.guild.members.cache.get(botId).permissions.has("MANAGE_NICKNAMES") &&
    embed.guild.members.cache.get(botId).permissions.has("CHANGE_NICKNAME")
  ) {
    embed.guild.members.cache
      .get(author.id)
      .setNickname(username)
      .catch(() => {
        embed.channel
          .send("Move my rank higher in order to change this user's nickname.")
          .catch((err) => {
            console.log(err);
          });
      });
  } else {
    embed.channel
      .send(
        `I do not have permission to change the nickname of <@${author.id}>!`
      )
      .catch((err) => {
        throw err;
      });
    return;
  }

  const verifiedRole = embed.guild.roles.cache.find(
    (x) => x.name === "Verified"
  );
  if (!verifiedRole) {
    embed.guild.roles
      .create({
        data: {
          name: "Verified",
          color: "#C86432",
          hoist: false,
          mentionable: true
        }
      })
      .then((role) => {
        member.roles
          .add(role, "Verified")
          .then(() => {
            data["Channel"]
              .send(`<@${author.id}> has succesfully verified as ${username}`)
              .catch((err) => {
                throw err;
              });
            embed.delete().catch((err) => {
              throw err;
            });
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  } else {
    member.roles
      .add(verifiedRole, "Verified")
      .then(() => {
        data["Channel"]
          .send(`<@${author.id}> has succesfully verified as ${username}`)
          .catch((err) => {
            throw err;
          });
        embed.delete().catch((err) => {
          throw err;
        });
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports.help = {
  name: "verify"
};
