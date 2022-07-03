import express from 'express';
import diagnosesServices from '../services/diagnosesServices';

const router = express.Router();

router.get('/', (_req, res) => {
 const fetched = diagnosesServices.getEntries();

  res.json(fetched);
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;