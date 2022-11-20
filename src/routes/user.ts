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
    res.json({status: "ok", message: "Berhasil Add User"});
  }).catch(err => {
    res.status(500).json({status: "error", message: err.message});
  })
})

router.get("/all", async (req, res) => {
  const users = await redisClient.get("users").catch(err => console.log(err))
  if (users) {
    console.log("from redis")
    res.json({status: "ok", data: JSON.parse(users)})
  } else {
    getAllUser().then((users) => {
      redisClient.SETEX("users", expirationTime, JSON.stringify(users))
      res.json({status: "ok", data: users});
    }).catch(err => {
      res.status(500).json({status: "error", message: err.message});
    })
  }
})

router.route("/:id")
  .put(async (req, res) => {
    const {id} = req.params;
    console.log(isValidObjectId(id))
    if (!isValidObjectId(id)) res.status(400).json({status:"error", message: "Invalid ID"})
    else {
      const user = await User.findOne({_id: new ObjectId(id)});
      if (!user) res.status(404).json({status:"error", message: "User not found"});
      else {
        const {userName, accountNumber, emailAddress, identityNumber} = req.body;
        updateUserById(id, {userName, accountNumber, emailAddress, identityNumber}).then(() => {
          res.json({status: "ok", message: "Berhasil update user"});
        }).catch(err => {
          res.status(500).json({status: "error", message: err.message});
        })
      }
    }
  })
  .delete(async (req, res) => {
    const {id} = req.params;
    if (!isValidObjectId(id)) res.status(400).json({status:"error", message: "Invalid ID"})
    else {
      const user = await User.findOne({_id: new ObjectId(id)});
      if (!user) res.status(404).json({status:"error", message: "User not found"});
      else {
        user.deleteOne(err => {
          if (err) res.status(500).json({status: "error", message: err.message});
          else res.json({status: "ok", message: "Berhasil Delete User"});
        })
      }
    }
  })

router.route("/username/:userName")
  .get(async (req, res) => {
    const { userName } = req.params;
    const user = await redisClient.get(`username:${userName}`).catch(err => console.log(err));
    if (user) {
      res.json({status: "ok", data: JSON.parse(user)})
    } else {
      getUserByUsername(userName).then(user => {
        if (!user) res.status(404).json({status:"error", message: "User not found"});
        else {
          redisClient.SETEX(`username:${userName}`, expirationTime, JSON.stringify(user))
          res.json({status: "ok", data: user});
        }
      }).catch(err => {
        res.status(500).json({status: "error", message: err.message});
      })
    }
  })
  .put(async (req, res) => {
    const { userName } = req.params;
    const user = await User.findOne({userName})
    if (!user) res.status(404).json({status:"error", message: "User not found"});
    else {
      user.updateOne(req.body, { runValidators: true, }, err => {
        if (err) res.status(500).json({status: "error", message: err.message});
        else res.json({status: "ok", message: "Berhasil Update User"});
      })
    }
  })
  .delete(async (req, res) => {
    const { userName } = req.params;
    const user = await User.findOne({userName})
    if (!user) res.status(404).json({status:"error", message: "User not found"});
    else {
      user.deleteOne(err => {
        if (err) res.status(500).json({status: "error", message: err.message});
        else res.json({status: "ok", message: "Berhasil Delete User"});
      })
    }
  })
    

router.route("/accountNumber/:accountNumber")
 .get(async (req, res) => {
    const { accountNumber } = req.params;
    const user = await redisClient.get(`accountnumber:${accountNumber}`).catch(err => console.log(err));
    if (user) {
      res.json({status: "ok", data: JSON.parse(user)})
    } else {
      getUserByAccountNumber(+accountNumber).then(user => {
        if (!user) res.status(404).json({status:"error", message: "User not found"});
        else {
          redisClient.SETEX(`accountnumber:${accountNumber}`, expirationTime, JSON.stringify(user))
          res.json({status: "ok", data: user})
        }
      }).catch(err => {
        res.status(500).json({status: "error", message: err.message});
      })
    }
  })
  .put(async (req, res) => {
    const { accountNumber } = req.params;
    const user = await User.findOne({accountNumber})
    if (!user) res.status(404).json({status:"error", message: "User not found"});
    else {
      user.updateOne(req.body, { runValidators: true, }, err => {
        if (err) res.status(500).json({status: "error", message: err.message});
        else res.json({status: "ok", message: "Berhasil Update User"});
      })
    }
  })
  .delete(async (req, res) => {
    const { accountNumber } = req.params;
    const user = await User.findOne({accountNumber})
    if (!user) res.status(404).json({status:"error", message: "User not found"});
    else {
      user.deleteOne(err => {
        if (err) res.status(500).json({status: "error", message: err.message});
        else res.json({status: "ok", message: "Berhasil Delete User"});
      })
    }
  })

export default router