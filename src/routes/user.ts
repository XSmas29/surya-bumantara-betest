import express from "express";
import {createUser, getUserByAccountNumber,getUserByUsername} from "../database/controller/user";
const router = express.Router();

router.post("/", (req, res) => {
  const {userName, accountNumber, emailAddress, identityNumber} = req.body;
  createUser(userName, accountNumber, emailAddress, identityNumber).then(() => {
    res.send("Berhasil Add User");
  }).catch(err => {
    if (err.code === 11000) res.status(409).send(err.message);
    res.status(500).send(err.message);
  })
})

router.get("/username/:userName", (req, res) => {
  const { userName } = req.params;
  getUserByUsername(userName).then(user => {
    if (!user) res.status(404).send("User not found");
    res.send(user);
  }).catch(err => {
    res.status(500).send(err.message);
  })
})

router.get("/accountNumber/:accountNumber", (req, res) => {
  const { accountNumber } = req.params;
  getUserByAccountNumber(+accountNumber).then(user => {
    if (!user) res.status(404).send("User not found");
    res.send(user);
  }).catch(err => {
    res.status(500).send(err.message);
  })
})

export default router