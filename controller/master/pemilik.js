const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../../config/db"); // Update the path to your database connection file

// GET all Pemilik records
router.get("/", (req, res) => {
  connection.query("SELECT * FROM pemilik order by id_pemilik", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server Gagal",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data Pemilik ",
        data: rows,
      });
    }
  });
});

// POST (STORE) a new Pemilik record
router.post("/store",[
    // Validation
    body("nama_pemilik").notEmpty(),
    body("alamat").notEmpty(),
    body("no_hp").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const data = {
      nama_pemilik: req.body.nama_pemilik,
      alamat: req.body.alamat,
      no_hp: req.body.no_hp,
    };

    connection.query("INSERT INTO pemilik SET ?", data, (err, rows) => {
      if (err) {
        console.error("Kesalahan database:", err);
        return res.status(500).json({
          status: false,
          message: "Coba Lagi Dude.....",
          error: err
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Berhasil Menambahkan Data Pemilik",
          data: rows
        });
      }
    });    
  }
);

// GET a specific Pemilik record by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM pemilik WHERE id_pemilik = ?",
    [id],
    (error, rows) => {
      if (error) {
        return res.status(500).json({
          status: false,
          message: "Server Eror Dude.....",
          error: error,
        });
      }
      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: "Not Found, Coba Lagi Dude.....",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Pemilik : ",
          data: rows[0],
        });
      }
    }
  );
});

// PATCH (UPDATE) Pemilik record by ID
router.put(
  "/update/:id",
  [
    // Validation
    body("nama_pemilik").notEmpty(),
    body("alamat").notEmpty(),
    body("no_hp").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const id = req.params.id;
    const data = {
      nama_pemilik: req.body.nama_pemilik,
      alamat: req.body.alamat,
      no_hp: req.body.no_hp,
    };

    connection.query(
      "UPDATE pemilik SET ? WHERE id_pemilik = ?",
      [data, id],
      (error, rows) => {
        if (error) {
          return res.status(500).json({
            status: false,
            message: "Server Eror Dude.....",
            error: error,
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Update Data Success Dude....",
          });
        }
      }
    );
  }
);

// DELETE a jurusan record by ID
router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM pemilik WHERE id_pemilik = ?",
    [id],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          status: false,
          message: "Server Eror Dude.....",
          error: error,
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Sudah Sukses Dihapus Dude....",
        });
      }
    }
  );
});

module.exports = router;
