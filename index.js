const express = require("express"); //conecta con la libreria de expres
const mongoose = require("mongoose"); // conecta con la libreria de mongoose
const app = express();
const port = 2500;
let db = "";
app.use(express.json());

// Ejercicio/01 - API que muestra los correos de dominio @twitter.com
app.get("/Ejercicio/01", async (req, res) => {
  const result = await db
    .collection("companies")
    .find({ email_address: /@twitter.com/ })
    .limit(5)
    .toArray();

  res.send(result);
});

// Ejercicio/02 - API que muestra las compañias creadas entre 2005-2008
app.get("/Ejercicio/02", async (req, res) => {
  const result = await db
    .collection("companies")
    .find({
      $and: [
        { founded_year: { $gte: 2005 } },
        { founded_year: { $lte: 2008 } },
      ],
    })
    .limit(12)
    .toArray();

  res.send(result);
});

// Ejercicio/03 - API que muestra la info de compañia Technorati
app.get("/Ejercicio/03", async (req, res) => {
  const result = await db
    .collection("companies")
    .find({ name: /Technorati/ })
    .limit(5)
    .toArray();

  res.send(result);
});

// Ejercicio/04 - API que muestra las compañias con categoria advertising y fundadas en 2002
app.get("/Ejercicio/04", async (req, res) => {
  const result = await db
    .collection("companies")
    .find({
      $and: [{ category_code: /advertising/ }, { founded_year: { $eq: 2002 } }],
    })
    .limit(5)
    .toArray();

  res.send(result);
});

// Ejercicio/05 - API que muestra las compañias con categoria games_video o messaging
app.get("/Ejercicio/05", async (req, res) => {
  const result = await db
    .collection("companies")
    .find({
      $or: [{ category_code: /messaging/ }, { category_code: /games_video/ }],
    })
    .limit(5)
    .toArray();

  res.send(result);
});

// Ejercicio/06 - API que muestra  por parametros URL  las compañías cuyo año de fundación sea 2006	
app.get("/Ejercicio/06", async (req, res) => {
  try {
    console.log(req.query);
    const founded_year = parseInt(req.query.founded_year);

    const result = await db
      .collection("companies")
      .find({
        founded_year,
      })
      .limit(5)
      .toArray();

    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

// Ejercicio/07 - API que muestra por medio del body  las compañías cuyo año de fundación sea 2006
app.post("/Ejercicio/07", async (req, res) => {
  try {
    console.log(req.body);
    const result = await db
      .collection("companies")
      .find(req.body)
      .limit(5)
      .toArray();

    res.status(200).json({ ok: true, data: result });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://bit:core123@cluster0.i090fv3.mongodb.net/sample_training?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conectado a la BD de  mongo ");
    db = mongoose.connection.db;
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
