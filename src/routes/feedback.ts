import express from 'express';
const feedbackRouter = express.Router();
import { Request, Response } from 'express';
import { productModel } from '../models/index';

feedbackRouter.get('/', async (req: Request, res: Response) => {
  const data = await productModel.find();
  res.send(data);
});

feedbackRouter.post('/getfeedback', async (req: Request, res: Response) => {
  const { id } = req.body;
  const data = await productModel.find().where({
    _id: id,
  });
  res.send(data);
});

feedbackRouter.post('/createfeedback', async (req: Request, res: Response) => {
  const { title, description, category } = req.body;
  await productModel.create({
    title: title,
    category: category,
    description: description,
    status: 'suggestion',
    comments: [],
    upvotes: 0,
  });
  res.send({
    status: 200,
    success: true,
  });
});

feedbackRouter.put('/updatefeedback', async (req: Request, res: Response) => {
  const { title, description, category, status, id } = req.body;

  await productModel.updateOne(
    {
      _id: id,
    },
    {
      title: title,
      category: category,
      description: description,
      status: status,
    }
  );

  res.send({
    status: 200,
    success: true,
  });
});

feedbackRouter.put('/updateupvote', async (req: Request, res: Response) => {
  const { id, upvotes } = req.body;

  await productModel.updateOne(
    {
      _id: id,
    },
    {
      upvotes: upvotes,
    }
  );
  res.send({ status: 200, success: true });
});

feedbackRouter.delete(
  '/deletefeedback',
  async (req: Request, res: Response) => {
    const { id } = req.body;
    await productModel.deleteOne({
      _id: id,
    });

    res.send({
      status: 200,
      success: true,
      body: `deleted ${id}`,
    });
  }
);

export default feedbackRouter;
