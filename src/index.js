import readline from 'readline';
import { MessageService } from './services/messageService.js';
import { logger } from './utils/logger.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class ChatApp {
  constructor() {
    this.username = '';
    this.currentTopic = 'general';
    this.messageService = new MessageService();
  }

  async initialize() {
    return new Promise((resolve) => {
      rl.question('Enter your username: ', async (username_answer) => {
        this.username = username_answer.trim();
        rl.question('Enter chat topic (or press Enter for "general"): ', async (topic_answer) => {
          this.currentTopic = topic_answer.trim() || 'general';
          logger.welcome(this.username, this.currentTopic);
          logger.showCommands();
          resolve();
        });
      });
    });
  }

  parseCommand(input) {
    if (input.startsWith('/topic ')) {
      this.currentTopic = input.slice(7).trim();
      logger.topicChange(this.currentTopic);
      return true;
    } else if (input.startsWith('/private ')) {
      const parts = input.slice(9).split(' ');
      const recipient = parts[0];
      const message = parts.slice(1).join(' ');
      if (recipient && message) {
        this.messageService.sendMessage(message, this.username, this.currentTopic, true, recipient);
        logger.privateSent(recipient, message);
        return true;
      }
    }
    return false;
  }

  async start() {
    await this.initialize();
    const channel = await this.messageService.subscribeToMessages(
      this.username,
      this.currentTopic,
      (message) => logger.newMessage(message)
    );

    rl.on('line', async (input) => {
      if (input.toLowerCase() === 'exit') {
        await channel.unsubscribe();
        rl.close();
        process.exit(0);
      }

      if (input.trim()) {
        if (!this.parseCommand(input)) {
          await this.messageService.sendMessage(
            input,
            this.username,
            this.currentTopic
          );
          logger.selfMessage(this.currentTopic, input);
        }
      }
    });
  }
}

// Start the application
const app = new ChatApp();
app.start().catch((error) => {
  logger.error('Application error:', error.message);
  process.exit(1);
});