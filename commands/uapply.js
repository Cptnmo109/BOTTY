const Discord = require('discord.js');
module.exports.run = async (bot, message) => {

    // Roles
    const Roles = ['beginner developers', 'artists', 'sfx artists', 'ui designers', 'modelers', 'scripters', 'traders', 'builders', 'legend artists', 'youtubers', 'translators', 'off-site developers', 'offsite developers', 'clothing designers', 'animators'];

    // Questions
    const Question1 = 'Select an application. \nOptions: `Beginner Developers`, `Artists`, `SFX Artists`, `UI Designers`, `Modelers`, `Scripters`, `Traders`, `Builders`, `Legend Artists`, `YouTubers`, `Translators`, `Off-site Developers`, `Clothing Designers`, `Animators`';
    const Question2 = 'Please provide your Roblox username.';
    const Question3 = 'Please provide examples of your work. You can use links or Roblox places. Gyazo, Lightshot, or any other screenshotting program links are not allowed as they do not provide enough proof of ownership.';
    const Question4 = 'Are you in the group? This is mandatory as we need to rank you there as well. If you are not in the group, then please join via the link below: https://www.roblox.com/groups/2690922/RD-Roblox-Developers';

    // Answers
    let Answer1;
    let Answer2;
    let Answer4;

    // Function
    const CmdsPrefix = '?';

    if (message.author.bot) return;
    if (message.content.indexOf(CmdsPrefix) !== 0) return;

    message.author.send(Question1).then(() => {
        const FirstQuestion = new Discord.MessageCollector(message.author.dmChannel, m => m.author.id === message.author.id, { time: 180000 });

        FirstQuestion.on('collect', Response => {
            if (!Response.author.bot) {
                if (Response.content.toLowerCase() == 'cancel') {
                    // Stop the function.
                    FirstQuestion.stop();
                    message.author.send('The prompt has been cancelled.');
                } else {
                    // This will be your answer.
                    Answer1 = Response.content;
                    console.log(`Answer1: ${Answer1}`);
                    FirstQuestion.stop();
                    if (Roles.includes(Response.content.toLowerCase())) {
                        // Check if the content has the role inside.
                        bot.guilds.cache.get('681463033520062464').members.cache.forEach(Member => {
                            if (Member.id == message.author.id) {
                                if (Member.roles.some(SearchRole => Response.content.toLowerCase().includes(SearchRole))) {
                                    // Member already owns that role.
                                    console.log('User hasn\'t the role');
                                    message.author.send('You already have that role, you cannot apply for it twice!');
                                } else {
                                    console.log('ok boomer');
                                    message.author.send(Question2).then(() => {
                                        const SecondQuestion = new Discord.MessageCollector(message.author.dmChannel, m => m.author.id === message.author.id, { time: 180000 });

                                        SecondQuestion.on('collect', AnswerQuest => {
                                            if (!AnswerQuest.author.bot) {
                                                if (AnswerQuest.content.toLowerCase() == 'cancel') {
                                                    // Stop the function.
                                                    SecondQuestion.stop();
                                                    message.author.send('The prompt has been cancelled.');
                                                } else {
                                                    Answer2 = AnswerQuest.content;
                                                    console.log(`Answer2: ${Answer2}`);
                                                    SecondQuestion.stop();
                                                    message.author.send(Question3).then(() => {
                                                        const ThirdQuestion = new Discord.MessageCollector(message.author.dmChannel, m => m.author.id === message.author.id, { time: 180000 });


                                                        ThirdQuestion.on('collect', AnswerQuest2 => {
                                                            if (!AnswerQuest2.author.bot) {
                                                                if (AnswerQuest2.content.toLowerCase() == 'cancel') {
                                                                    // Stop the function.
                                                                    ThirdQuestion.stop();
                                                                    message.author.send('The prompt has been canceled.');
                                                                } else {
                                                                    let Answer3;
                                                                    if (AnswerQuest2.attachments.size > 0) {
                                                                        Answer3 = AnswerQuest2.attachments.array()[0].url;
                                                                    } else {
                                                                        Answer3 = AnswerQuest2.content;
                                                                    }
                                                                    // ThirdQuestion.stop()
                                                                    message.author.send(Question4).then(() => {
                                                                        const FourthQuestion = new Discord.MessageCollector(message.author.dmChannel, m => m.author.id === message.author.id, { time: 180000 });

                                                                        FourthQuestion.on('collect', AnswerQuest3 => {
                                                                            if (!AnswerQuest3.author.bot) {
                                                                                if (AnswerQuest3.content.toLowerCase() == 'cancel') {
                                                                                    // Stop the function.
                                                                                    FourthQuestion.stop();
                                                                                    message.author.send('The prompt has been canceled.');
                                                                                } else {
                                                                                    Answer4 = AnswerQuest3.content;
                                                                                    console.log(Answer4);
                                                                                    FourthQuestion.stop();
                                                                                    message.author.send(`Your application has been sent.\n${Response}, ${AnswerQuest}, ${AnswerQuest2}, ${AnswerQuest3}`);
                                                                                    const ApplicationEmbed = new Discord.MessageEmbed()

                                                                                        .setDescription('An application!')
                                                                                        .setColor(0xFF9900)
                                                                                        .addField('Select an application.', `${Response}`)
                                                                                        .addField('What\'s your ROBLOX username?', `${AnswerQuest}`)
                                                                                        .setImage(Answer3)
                                                                                        .addField('Are you in the ROBLOX group?', `${AnswerQuest3}`);

                                                                                    const applicationchannel = bot.guilds.cache.get('681463033520062464').channels.cache.get('681463565076398135');
                                                                                    applicationchannel.send(ApplicationEmbed);
                                                                                }
                                                                            }
                                                                        });
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    });
                                                }
                                            }
                                        });
                                    });
                                }
                            }
                        });
                    } else {
                        message.author.send('Your prompt is invalid.');
                    }
                }
            }
        });
    });
};

module.exports.help = {
    'name':'uapply'
};