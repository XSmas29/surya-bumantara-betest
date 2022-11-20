import express from "express";
import User from "../database/model";
import {createUser, getUserByAccountNumber,getUserByUsername, updateUserByAccountNumber, getAllUser, updateUserById} from "../database/controller/user";
import { isValidObjectId } from "mongoose";
import { ObjectId } from "mongodb";
import { getRedisCLient } from "../redis/index";

const router = express.Router();

const redisClient = getRedisCLient()

const expirationTime = +(process.env.REDIS_EXPIRATION_TIME || 300)

router.post("/", (req, res) => {
  const {userName, accountNumber, emailAddress, identityNumber} = req.body;
  createUser(userName, accountNumber, emailAddress, identityNumber).then(() => {
    res.send("Berhasil Add User");
  }).catch(err => {
    res.send(err.message);
  })
})

router.get("/all", async (req, res) => {
  const users = await redisClient.get("users").catch(err => console.log(err))
  if (users) {
    res.send(JSON.parse(users))
  } else {
    getAllUser().then((users) => {
      redisClient.SETEX("users", expirationTime, JSON.stringify(users))
      res.send(users);
    }).catch(err => {
      res.send(err.message);
    })
  }
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
  .get(async (req, res) => {
    const { userName } = req.params;
    const user = await redisClient.get(`username:${userName}`).catch(err => console.log(err));
    if (user) {
      res.send(JSON.parse(user));
    } else {
      getUserByUsername(userName).then(user => {
        if (!user) res.status(404).send("User not found");
        else {
          redisClient.SETEX(`username:${userName}`, expirationTime, JSON.stringify(user))
          res.send(user)
        }
      }).catch(err => {
        res.send(err.message);
      })
    }
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
 .get(async (req, res) => {
    const { accountNumber } = req.params;
    const user = await redisClient.get(`accountnumber:${accountNumber}`).catch(err => console.log(err));
    if (user) {
      res.send(JSON.parse(user));
    } else {
      getUserByAccountNumber(+accountNumber).then(user => {
        if (!user) res.status(404).send("User not found");
        else {
          redisClient.SETEX(`accountnumber:${accountNumber}`, expirationTime, JSON.stringify(user))
          res.send(user);
        }
      }).catch(err => {
        res.send(err.message);
      })
    }
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