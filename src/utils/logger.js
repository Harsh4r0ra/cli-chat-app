import chalk from 'chalk';

export const logger = {
  welcome(username, topic) {
    console.log(chalk.green(`Welcome ${username}! You're in the "${topic}" topic.`));
  },

  showCommands() {
    console.log(chalk.yellow('Commands:'));
    console.log(chalk.yellow('  /topic <new-topic> - Switch to a different topic'));
    console.log(chalk.yellow('  /private <username> <message> - Send a private message'));
    console.log(chalk.yellow('  exit - Quit the application'));
  },

  newMessage(message) {
    const prefix = message.private ? chalk.magenta('PRIVATE ') : '';
    console.log(
      `\n${prefix}${chalk.blue(message.username)}: ${message.content}`
    );
  },

  selfMessage(topic, content) {
    console.log(chalk.green(`You (${topic}): ${content}`));
  },

  privateSent(recipient, message) {
    console.log(chalk.magenta(`Private message to ${recipient}: ${message}`));
  },

  topicChange(topic) {
    console.log(chalk.green(`Switched to topic: ${topic}`));
  },

  error(message, error) {
    console.error(chalk.red(message), error);
  }
};