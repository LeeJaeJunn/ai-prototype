export interface message {
  role: string;
  content: string;
}

const messages: message[] = [{ role: 'user', content: 'Hello' }];

export default messages;
