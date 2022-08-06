import { Router } from "express";
import { getAllUsers, getAuthToken, createUser } from "../controllers/userControllers.js"

const router = new Router();

router.get("/users", (req, res) => {
  try {
    getAllUsers(req, res);
  } catch (e) {
    res.json(e);
  }
});

router.post("/register", (req, res) => {
  try {
    createUser(req, res);
  } catch (e) {
    res.json(e);
  }
});

router.post("/token", (req, res) => {
  try {
    getAuthToken(req, res);
  } catch (e) {
    res.json(e);
  }
});

export default router;
