import express from 'express';

import patientsService from '../services/patientsService';
import toNewPatient from '../utils/parser';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
})

export default router;