import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import fs from "fs";

import {
  addTransaction,
  createUser,
  editTransaction,
  getLogin,
  getPayments,
  getSpendingData,
  removeTransaction,
  editInfo,
  getRecentTransactions,
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

app.get("/transactionsAll", async (req, res) => {
  var data = [];
  await getSpendingData(2).then(function (response) {
    response.forEach((element) => {
      data.push(element);
    })
  });

  res.send(data);
})

app.post("/transactionsByDate", async (req, res) => {
  const { user_id } = req.body;

  var data = [];
  await getSpendingData(user_id).then(function (response) {
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

app.post("/transactionsByCategory", async (req, res) => {
  const { user_id } = req.body;
  var data = [];
  const spendingData = await getSpendingData(user_id).then(function (response) {
    response.forEach((element) => {
      var exists = false;
      var existingEntry;
      data.forEach((e) => {
        if (element.category === e.category) {
          exists = true;
          existingEntry = e;
        }
      });

      if (exists) {
        existingEntry.value += element.value;
      } else {
        data.push({ category: element.category, value: element.value });
      }
    });
  });
  res.send(data);
});

app.post("/addTransaction", async (req, res) => {
  const { id, date, amount, title, category } = req.body;
  const data = await addTransaction(id, date, amount, title, category);

  res.send(data);
});

app.post("/removeTransaction", async (req, res) => {
  const { transactionId } = req.body;
  const data = await removeTransaction(transactionId);

  res.send(data);
});

app.post("/editTransaction", async (req, res) => {
  const { pid, desc, value, date, category } = req.body;

  const data = await editTransaction(pid, desc, value, date, category);

  res.send(data);
})

app.post("/calendar", async (req, res) => {
  const { date } = req.body;
  const data = await getPayments(2, date);

  res.send(data);
});

app.post("/editInfo", async (req, res) => {
  const { fname, sname, email, password } = req.body;

  const checkUser = await getLogin(email);
  if (checkUser.length > 0) {
    res.status(500).send("User with email " + email + " already exists.");
  } else {
    try {
      const hash = await bcrypt.hash(password, 15);
      const data = await editInfo(fname, sname, email, hash);
      res.send(data);
    } catch (e) {
      console.error(e);
      res.status(500).send("An error occurred");
    }
  }
});

app.get("/getInfo", async (req, res) => {
  const { email } = req.body;

  const checkUser = await getLogin(email);
  if (checkUser.length > 0) {
    res.send([checkUser.fname, checkUser.sname, checkUser.email]);
  }
});

app.get("/recentTransactions", async (req, res) => {
  try {
    const data = await getRecentTransactions();

    const transformedData = data.map((transaction) => ({
      id: transaction.payment_id,
      title: transaction.description,
      amount: `£${parseFloat(transaction.value).toFixed(2)}`,
      date: transaction.payment_date,
      category: transaction.category
    }));


    const jsonData = { transactions: transformedData };

    fs.writeFile('../assets/recentTransactions.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Error writing data to file:", err);
        res.status(500).send("Error writing data to file.");
      } else {
        res.send(jsonData);
      }
    });
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    res.status(500).send("Error fetching recent transactions.");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
