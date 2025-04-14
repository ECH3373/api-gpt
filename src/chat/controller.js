import OpenAI from 'openai';
import { config } from '../../config/index.js';
import { services } from '../shared/services/index.js';

const message = async (req, res) => {
  const { model = 'gpt-3.5-turbo', prompt = '', role = 'user', message = '', history = [], tools = [] } = req.body;
  const gpt = new OpenAI({ apiKey: config.gpt.key });
  const messages = [{ role: 'system', content: prompt }, ...history, { role, content: message }];
  history.push({ role, content: message });
  const completion = await gpt.chat.completions.create({ messages, model, functions: tools });
  const response = completion.choices[0].message;
  history.push(response);
  const data = { response, history };
  return services.response.send({ res, data, message: 'gpt says' });
};

export const controller = {
  message,
};
