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
  getTransactionsInMonth,
  getUserInfo,
  getBills,
  addBill,
  editBill,
  removeBill,
  getInfo,
  incrementBillDate,
  incrementNextInstall,
} from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/createUser", async (req, res) => {
  const { fname, sname, email, password, budget } = req.body;

  // Check if the email is already in use
  const checkUser = await getLogin(email);
  if (checkUser.length > 0) {
    res.status(500).send("User with email " + email + " already exists.");
  } else {
    try {
      const hash = await bcrypt.hash(password, 15);
      const name = await createUser(fname, sname, email, hash, budget);
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

app.post("/transactionsAll", async (req, res) => {
  const { user_id } = req.body;

  var data = [];
  await getSpendingData(user_id).then(function (response) {
    response.forEach((element) => {
      data.push(element);
    })
  });

  res.send(data);
})

app.post("/transactionsInMonth", async (req, res) => {
  const { user_id, month, endDate } = req.body;

  const data = await getTransactionsInMonth(user_id, month, endDate);
  res.send(data);
});

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
  const { uid, fname, sname, email, password } = req.body;

  const login = await getInfo(uid);

  if (login.length > 0 && login[0].id != uid) {
    res.status(500).send("User with email " + email + " already exists.");
  } else {
    try {
      // Reset the password
      let hash = login[0].password;
      if (password !== "") {
        hash = await bcrypt.hash(password, 15);
      }

      const data = await editInfo(uid, fname, sname, email, hash);
      res.send(data);
    } catch (e) {
      console.error(e);
      res.status(500).send("An error occurred");
    }
  }
});

app.post("/getInfo", async (req, res) => {
  const { uid } = req.body;

  const checkUser = await getUserInfo(uid);

  if (checkUser.length > 0) {
    res.send([
      checkUser[0][0].fname,
      checkUser[0][0].sname,
      checkUser[0][0].email,
      checkUser[0][0].budget
    ]);
  } else {
    res.status(500).send("No user found with uid: " + uid);
  }
});

app.post("/checkBills", async (req, res) => {
  // Check if any bills need to be put into the payments table
  
  const { user_id } = req.body;

  const today = new Date();
  await getBills(user_id).then(async function (response) {
    response.forEach(async (element) => {
      // Next installment needs to be paid, so add this to payments table
      let next_install = new Date(element.next_installment);

      while (next_install <= today) {
        await addTransaction(user_id, next_install, element.value, element.description, element.category);
        await incrementNextInstall(element.bill_id, next_install, element.recurrence_freq);

        next_install = incrementBillDate(next_install, element.recurrence_freq);
      }
    })
  })

  res.sendStatus(201);
});

app.post("/recentTransactions", async (req, res) => {
  const { user_id } = req.body;

  try {
    const data = await getRecentTransactions(user_id);

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

app.post("/addBill", async (req, res) => {
  const { uid, start_date, end_date, value, description, category, recurrence } = req.body;
  const data = await addBill(uid, start_date, end_date, value, description, category, recurrence);

  res.send(data);
})

app.post("/editBill", async (req, res) => {
  const { bill_id, start_date, end_date, value, description, category, recurrence } = req.body;
  const data = await editBill(bill_id, start_date, end_date, value, description, category, recurrence);

  res.send(data);
})

app.post("/removeBill", async (req, res) => {
  const { bill_id } = req.body;
  const data = await removeBill(bill_id);

  res.send(data);
})

app.post("/getBills", async (req, res) => {
  // Get the basic bill data

  const { uid } = req.body;
  const data = [];
  
  await getBills(uid).then(function (response) {
    response.forEach((element) => {
      data.push(element);
    })
  });

  res.send(data);
})

app.post("/upcomingBills", async (req, res) => {
  // Get the next two payments for each bills

  const { uid, current_date } = req.body;
  const data = [];
  
  await getBills(uid).then(function (response) {
    response.forEach((element) => {
      // Get the next two billing dates
      let nextPayment = incrementBillDate(new Date(element.start_date), element.recurrence_freq);
      while (nextPayment < new Date(current_date)) {
        nextPayment = incrementBillDate(nextPayment, element.recurrence_freq);
      }

      let secondNextPayment = incrementBillDate(nextPayment, element.recurrence_freq);

      if (nextPayment < new Date(element.end_date))
        data.push({
          "value": element.value,
          "date": nextPayment,
          "description": element.description,
          "category": element.category,
        })

      if (secondNextPayment < new Date(element.end_date))
        data.push({
          "value": element.value,
          "date": secondNextPayment,
          "description": element.description,
          "category": element.category,
        })
    })
  });

  res.send(data.sort((a, b) => a.date - b.date).slice(0, 5));
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
