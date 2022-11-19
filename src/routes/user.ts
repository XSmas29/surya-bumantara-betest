import express from "express";
import User from "../database/model";
import {createUser, getUserByAccountNumber,getUserByUsername, updateUserByAccountNumber, getAllUser, updateUserById} from "../database/controller/user";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
const router = express.Router();

router.post("/", (req, res) => {
  const {userName, accountNumber, emailAddress, identityNumber} = req.body;
  createUser(userName, accountNumber, emailAddress, identityNumber).then(() => {
    res.send("Berhasil Add User");
  }).catch(err => {
    res.send(err.message);
  })
})

router.get("/all", (req, res) => {
  getAllUser().then((users) => {
    res.send(users);
  }).catch(err => {
    res.send(err.message);
  })
})

router.route("/:id")
  .put(async (req, res) => {
  const {id} = req.params;
  console.log(isValidObjectId(id))
  if (!isValidObjectId(id)) res.status(400).send("Invalid ID")
  else {
    const user = await User.findOne({_id: new ObjectId(id)});
    if (!user) res.status(404).send("User not found");
    else {
      const {userName, accountNumber, emailAddress, identityNumber} = req.body;
      updateUserById(id, {userName, accountNumber, emailAddress, identityNumber}).then(() => {
        res.send("Berhasil update user");
      }).catch(err => {
        res.send(err.message);
      })
    }
  }
})

router.route("/username/:userName")
  .get((req, res) => {
    const { userName } = req.params;
    getUserByUsername(userName).then(user => {
      if (!user) res.status(404).send("User not found");
      else res.send(user);
    }).catch(err => {
      res.send(err.message);
    })
  })
  // .put(async (req, res) => {
  //   const { userName } = req.params;
  //   const user = await User.findOne({userName})
  //   if (!user) res.status(404).send("User not found");
  //   else {
  //     user.updateOne(req.body, { runValidators: true, }, err => {
  //       if (err) res.send(err.message);
  //       else res.send("Berhasil Update User");
  //     })
  //   }
  // })
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
      else res.send(user);
    }).catch(err => {
      res.send(err.message);
    })
  })
  // .put(async (req, res) => {
  //   const { accountNumber } = req.params;
  //   const user = await User.findOne({accountNumber})
  //   if (!user) res.status(404).send("User not found");
  //   else {
  //     user.updateOne(req.body, { runValidators: true, }, err => {
  //       if (err) res.send(err.message);
  //       else res.send("Berhasil Update User");
  //     })
  //   }
  // })
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