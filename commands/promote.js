const roblox = require('noblox.js');

startApp().then(() => {
    console.log('Logged in!');
}).catch((err) => {
    console.log(err);
});

async function startApp() {
    await roblox.cookieLogin('');
}
exports.run = function(client, message, args) {
    const grpid = 2690922;
    const maximumRank = 254;
    const user = args[0];
    if (user) {
        message.channel.send(`Checking ROBLOX for ${user}`);
        roblox.getIdFromUsername(user)
            .then(function(id) {
                roblox.getRankInGroup(grpid, id)
                    .then(function(rank) {
                        if (maximumRank <= rank) {
                            message.channel.send(`${id} is rank ${rank} and not promotable.`);
                        } else {
                            message.channel.send(`${id} is rank ${rank} and promotable.`);
                            roblox.promote(grpid, id)
                                .then(function(roles) {
                                    message.channel.send(`Promoted from ${roles.oldRole.Name} to ${roles.newRole.Name}`);
                                }).catch(function() {
                                    message.channel.send('Failed to promote.');
                                });
                        }
                    }).catch(function() {
                        message.channel.send('Couldn\'t get him in the group.');
                    });
            }).catch(function() {
                message.channel.send(`Sorry, but ${user} doesn't exist on ROBLOX.`);
            });
    } else {
        message.channel.send('Please enter a username.');
    }
    return;
};
module.exports.help = {
    name: 'promote'
};