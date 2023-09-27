const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../../config/db"); // Update the path to your database connection file

// GET all Kapal records
router.get("/", (req, res) => {
    connection.query(
      "SELECT k.nama_kapal, p.nama_pemilik, d.luas, at.nama_alat_tangkap " +
      "FROM kapal k " +
      "JOIN pemilik p ON k.id_pemilik = p.id_pemilik " +
      "JOIN dpi d ON k.id_dpi = d.id_dpi " +
      "JOIN alat_tangkap at ON k.id_alat_tangkap = at.id_alat_tangkap",
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server Gagal",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Data Kapal ",
            data: rows,
          });
        }
      }
    );
  });
  

// POST (STORE) a new Kapal record
router.post("/store",[
    // Validation
    body("nama_kapal").notEmpty(),
    body("id_pemilik").notEmpty(),
    body("id_dpi").notEmpty(),
    body("id_alat_tangkap").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const data = {
      nama_kapal: req.body.nama_kapal,
      id_pemilik: req.body.id_pemilik,
      id_dpi: req.body.id_dpi,
      id_alat_tangkap: req.body.id_alat_tangkap,
    };

    connection.query("INSERT INTO kapal SET ?", data, (err, rows) => {
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
          message: "Berhasil Menambahkan Data Kapal",
          data: rows
        });
      }
    });    
  }
);

// GET a specific Kapal record by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM kapal WHERE id_kapal = ?",
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
          message: "Data Kapal : ",
          data: rows[0],
        });
      }
    }
  );
});

// PATCH (UPDATE) Kapal record by ID
router.put(
  "/update/:id",
  [
    // Validation
    body("nama_kapal").notEmpty(),
    body("id_pemilik").notEmpty(),
    body("id_dpi").notEmpty(),
    body("id_alat_tangkap").notEmpty(),
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
      nama_kapal: req.body.nama_kapal,
      id_pemilik: req.body.id_pemilik,
      id_dpi: req.body.id_dpi,
      id_alat_tangkap: req.body.id_alat_tangkap,
    };

    connection.query(
      "UPDATE kapal SET ? WHERE id_kapal = ?",
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
    "DELETE FROM kapal WHERE id_kapal = ?",
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
