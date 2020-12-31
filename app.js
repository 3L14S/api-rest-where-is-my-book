const error = require("console");
const e = require("express");
const express = require("express");
const mysql = require("mysql");
const app = express();
const util = require("util");

const port = process.env.PORT ? process.abort.env.PORT : 3000;
app.use(express.json());

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "where-is-my-book",
});

const queryPromisify = util.promisify(conexion.query).bind(conexion);
conexion.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("coneccion a la base de datos establecida");
});

app.post("/categoria", async (req, res) => {
  try {
    const nombreEnMayusc = req.body.nombre.split(" ").join("").toUpperCase();
    if (!req.body.nombre) {
      throw new Error("no ingresaste el nombre");
    }
    if (nombreEnMayusc.length <= 3) {
      throw new Error("el nombre es demasiado corto");
    }
    const queryDeChekeoNombreRepetido =
      "select * from categoria where nombre = ?";
    const chekeoNombreRepetido = await queryPromisify(
      queryDeChekeoNombreRepetido,
      [nombreEnMayusc]
    );

    if (chekeoNombreRepetido.length > 0) {
      throw new Error("La categoria ya existe");
    }
    const query = "insert into categoria (nombre) values (?)";
    const respuesta = await queryPromisify(query, [nombreEnMayusc]);
    res.status(200).send({ Respuesta: "categoria guardada correctamente" });
  } catch (error) {
    console.error(error.message);
    res.status(413).send({ error: error.message });
  }
});

app.get("/categoria", async (req, res) => {
  try {
    const query = "select * from categoria";
    const respuesta = await queryPromisify(query);
    res.status(200).send({ respuesta: respuesta });
  } catch (error) {
    console.error(error.message);
    res.status(413).send({ Error: error.message });
  }
});

app.get("/categoria/:id", async (req, res) => {
  try {
    const id = req.params.id.toUpperCase();
    const queryCategoriaExistente = "select * from categoria";
    const validacionCategoria = await queryPromisify(queryCategoriaExistente);
    const existeCategoria = validacionCategoria.find(
      (elemento) => elemento.nombre == id
    );
    if (Boolean(!existeCategoria)) {
      throw new Error("la categoria no existe");
    }
    const query = "SELECT * FROM categoria WHERE nombre = ?";
    const respuesta = await queryPromisify(query, [req.params.id]);
    res.status(200).send({ Respuesta: respuesta });
  } catch (error) {
    console.error(error.message);
    res.status(413).send({ error: error.message });
  }
});

// app.delete("/categoria/:id", (req, res) => {
//   try {
//   } catch (error) {
//     console.error(error.message);
//     res.status(413).send({ error: error.message });
//   }
// });

app.listen(port, () => console.log(`escuchando en el puerto ${port}`));
