import { supabase } from '../config/supabase.js';

export class MessageService {
  async sendMessage(content, username, topic, isPrivate = false, recipient = null) {
    try {
      const message = {
        username,
        content,
        topic,
        extension: 'cli',
        private: isPrivate,
        payload: isPrivate ? { recipient } : {},
        event: 'message'
      };

      const { error } = await supabase
        .from('messages')
        .insert([message]);

      if (error) throw error;
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  async subscribeToMessages(username, currentTopic, onMessage) {
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          const message = payload.new;
          // Show messages from current topic or private messages intended for this user
          if (message.username !== username && 
              (message.topic === currentTopic || 
               (message.private === true && message.payload?.recipient === username))) {
            onMessage(message);
          }
        }
      )
      .subscribe();

    return channel;
  }
}