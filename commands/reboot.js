const config = require('./botconfig.json');
module.exports.run = async (client, message) => {
    message.channel.send('Restarting...') .then(() => client.destroy()).then(() => client.login(config.token));
};


module.exports.help = {
    name: 'reboot'
};