import 'dotenv/config';
import Discord from 'discord.js';

const client = new Discord.Client();
const prefix = '!';

client.on('ready', () => {
  console.log('I\'m ready to (not) change the world..');
  client.channels.cache.forEach( (channel) => {
    if (channel.type === 'text') {
      channel.send('Hello, I\'m ready!');
    }
  });
});

client.on('message', (message) => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.reply('I don\'t like ping!');
  }

  if (command === 'eh') {
    message.reply('"eh" you..');

    // eslint-disable-next-line max-len
    const shattary = message.channel.guild.members.cache.
        find( (guildM) => guildM.user.username === 'shattary');
    if (shattary !== null) {
      shattary.kick('Take a long look at yourself');
      console.log('Shattary has been kicked');
    }
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (newState.channel === null) return;

  const username = newState.member.user.username;
  const channel = newState.member.guild.channels.cache.
      find((ch) => ch.name === 'general');

  if (username === 'mborcy') {
    channel.send('Hello sexy!');
  }
  console.log(username, '\' state has changed');
});

client.on('guildMemberAdd', (member) => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache
      .find((ch) => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});

client.login(process.env.BOT_TOKEN);
