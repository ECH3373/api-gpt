import OpenAI from 'openai';
import { config } from '../../config/index.js';

const tts = async (req, res) => {
  const { model = 'tts-1', voice = 'alloy', prompt = '', text = '', speed = 1 } = req.body;

  const openai = new OpenAI({ apiKey: config.gpt.key });
  const response = await openai.audio.speech.create({
    model,
    voice,
    input: text,
    instructions: prompt,
    speed,
    format: 'mp3',
  });

  const buffer = Buffer.from(await response.arrayBuffer());

  res.set('Content-Type', 'audio/mpeg');
  return res.send(buffer);
};
export const controller = {
  tts,
};
