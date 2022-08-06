import JWT from "jsonwebtoken";
import { keys } from "../config.js";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  let { email, password, name, address, all_addresses, phone, country } =
    req.body;

  const emailCheck = await prisma.User.findUnique({
    where: {
      email: email,
    },
  });

  if (emailCheck == null) {
    password = bcrypt.hashSync(password, 7);
    const user = await prisma.User.create({
      data: {
        email,
        password,
        name,
        address,
        phone,
        country,
        all_addresses,
      },
    });
    res.json(user);
  } else {
    res.status(405).send("Почта уже используется");
  }
};

const getAuthToken = async (req, res) => {
  const { email, password } = req.body;

  const emailCheck = await prisma.User.findUnique({
    where: {
      email: email,
    },
  });

  if (emailCheck == null) {
    res.status(401).send("Такого пользователя не существует");
  } else {
    if (bcrypt.compareSync(password, emailCheck.password)) {
      const token = JWT.sign(
        {
          email: emailCheck.email,
          userId: emailCheck.id,
        },
        keys.jwt,
        { expiresIn: 60 * 60 }
      );

      res.status(200).json({
        token: token,
      });
    } else {
      res.status(401).send("Вы ввели неправильный пароль");
    }
  }
};

const getAllUsers = async (req, res) => {
  const result = await prisma.User.findMany();
  res.json(result);
};

export { getAllUsers, getAuthToken, createUser };
