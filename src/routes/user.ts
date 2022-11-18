import express from "express";
import User from "../database/model";
import {createUser, getUserByAccountNumber,getUserByUsername, updateUserByAccountNumber} from "../database/controller/user";
const router = express.Router();

router.post("/", (req, res) => {
  const {userName, accountNumber, emailAddress, identityNumber} = req.body;
  createUser(userName, accountNumber, emailAddress, identityNumber).then(() => {
    res.send("Berhasil Add User");
  }).catch(err => {
    res.send(err.message);
  })
})

router.route("/username/:userName")
  .get((req, res) => {
    const { userName } = req.params;
    getUserByUsername(userName).then(user => {
      if (!user) res.status(404).send("User not found");
      res.send(user);
    }).catch(err => {
      res.send(err.message);
    })
  })
  .put(async (req, res) => {
    const { userName } = req.params;
    const user = await User.findOne({userName})
    if (!user) res.status(404).send("User not found");
    else {
      user.updateOne(req.body, { runValidators: true, }, err => {
        if (err) res.send(err.message);
        else res.send("Berhasil Update User");
      })
    }
  })
  .delete(async (req, res) => {
    const { userName } = req.params;
    const user = await User.findOne({userName})
    if (!user) res.status(404).send("User not found");
    else {
      user.deleteOne(err => {
        if (err) res.send(err.message);
        else res.send("Berhasil Delete User");
      })
    }
  })
    

router.route("/accountNumber/:accountNumber")
 .get((req, res) => {
    const { accountNumber } = req.params;
    getUserByAccountNumber(+accountNumber).then(user => {
      if (!user) res.status(404).send("User not found");
      res.send(user);
    }).catch(err => {
      res.send(err.message);
    })
  })
  .put(async (req, res) => {
    const { accountNumber } = req.params;
    const user = await User.findOne({accountNumber})
    if (!user) res.status(404).send("User not found");
    else {
      user.updateOne(req.body, { runValidators: true, }, err => {
        if (err) res.send(err.message);
        else res.send("Berhasil Update User");
      })
    }
  })
  .delete(async (req, res) => {
    const { accountNumber } = req.params;
    const user = await User.findOne({accountNumber})
    if (!user) res.status(404).send("User not found");
    else {
      user.deleteOne(err => {
        if (err) res.send(err.message);
        else res.send("Berhasil Delete User");
      })
    }
  })

export default router