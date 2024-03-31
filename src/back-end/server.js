import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";

import {
  addTransaction,
  createUser,
  getLogin,
  getPayments,
  getSpendingData,
} from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/name", async (req, res) => {
  const { fname, sname, email, password } = req.body;

  // Check if the email is already in use
  const checkUser = await getLogin(email);
  if (checkUser.length > 0) {
    res.status(500).send("User with email " + email + " already exists.");
  } else {
    try {
      const hash = await bcrypt.hash(password, 15);
      const name = await createUser(fname, sname, email, hash);
      res.send(name);
    } catch (e) {
      console.error(e);
      res.status(500).send("An error occurred");
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const login = await getLogin(email);
    const isMatch = await bcrypt.compare(password, login[0].password);
    if (!isMatch) {
      res.status(500).send("Invalid login");
    }
    res.status(201).send(login);
  } catch (e) {
    console.error(e);
    res.status(500).send("An error occurred");
  }
});

app.get("/dashboard", async (req, res) => {
  var data = [];
  const spendingData = await getSpendingData(2).then(function (response) {
    response.forEach((element) => {
      // Note: getMonth() returns month from 0-11, hence the +1
      var date =
        element.payment_date.getDate() +
        "/" +
        (element.payment_date.getMonth() + 1) +
        "/" +
        element.payment_date.getFullYear();

      var exists = false;
      var existingEntry;
      data.forEach((e) => {
        if (date === e.x) {
          exists = true;
          existingEntry = e;
        }
      });

      if (exists) {
        existingEntry.y += element.value;
      } else {
        data.push({ x: date, y: element.value });
      }
    });
  });
  res.send(data);
});

app.post("/addTransaction", async (req, res) => {
  const { id, date, amount, title, category } = req.body;
  const data = await addTransaction(id, date, amount, title, category);
});

app.post("/calendar", async (req, res) => {
  const { date } = req.body;
  const data = await getPayments(2, date);

  res.send(data);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
