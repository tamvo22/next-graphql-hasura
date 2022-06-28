import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import useTodo from '@/utils/firebase-v9/firebase-admin/firestore/useTodo';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  const fsTodo = useTodo();

  if (session) {
    // fetch firestore database
    if (req.method === 'GET') {
      // get Todo[]
      const todos = await fsTodo.get();
      res.status(200).json(todos);
    } else if (req.method === 'POST') {
      // create Todo
      const { data } = req.body;
      const todo = await fsTodo.add(data!);
      res.status(200).json(todo);
    } else if (req.method === 'PATCH') {
      // update Todo by slug id with data
      const { slug } = req.query;
      const { data } = req.body;

      if (typeof slug[0] === 'string') {
        const todo = await fsTodo.update(slug[0], data!);
        res.status(200).json(todo);
      } else {
        res.status(400).json({ error: '400 Invalid Request.' });
      }
    } else if (req.method === 'DELETE') {
      const { slug } = req.query;
      // delete a Todo by slug id
      if (typeof slug[0] === 'string') {
        await fsTodo.delete(slug[0]);
        res.status(200).json({ deleted: true });
      } else {
        res.status(400).json({ error: '400 Invalid Request.' });
      }
    } else {
      res.status(400).json({ error: '400 Invalid Request.' });
    }
  } else {
    res.status(403).json({ error: '403 Forbidden error.' });
  }
};
