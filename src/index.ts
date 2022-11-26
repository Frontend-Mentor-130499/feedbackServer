import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import { Express } from 'express';
import cors from 'cors';

import feedbackRouter from './routes/feedback';
import userRouter from './routes/user';

dotenv.config();

const main = async () => {
  try {
    await mongoose.connect(
      process.env.DATABASE_URL ? process.env.DATABASE_URL : ''
    );
    console.log('connected');
  } catch (err) {
    console.log(err);
  }
};

main().then(() => {
  const app: Express = express();

  app.use(bodyParser.json());

  app.use(cors());

  app.use('/user', userRouter);

  app.use('/feedback', feedbackRouter);

  const port = process.env.port || 4000;
  app.listen(port, () => {
    console.log('I Love You 4000');
  });
});
