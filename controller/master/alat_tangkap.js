const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../../config/db"); // Update the path to your database connection file

// GET all alat_tangkap records
router.get("/", (req, res) => {
  connection.query("SELECT * FROM alat_tangkap order by id_alat_tangkap", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server Gagal",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data Alat Tangkap",
        data: rows,
      });
    }
  });
});

// POST (STORE) a new alat_tangkap record
router.post("/store",[
    // Validation
    body("nama_alat_tangkap").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const data = {
      nama_alat_tangkap: req.body.nama_alat_tangkap,
    };

    connection.query("INSERT INTO alat_tangkap SET ?", data, (err, rows) => {
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
          message: "Berhasil Menambahkan Data alat_tangkap",
          data: rows
        });
      }
    });    
  }
);

// GET a specific alat_tangkap record by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM alat_tangkap WHERE id_alat_tangkap= ?",
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
          message: "Data Alat : ",
          data: rows[0],
        });
      }
    }
  );
});

// PATCH (UPDATE) alat_tangkap record by ID
router.put(
  "/update/:id",
  [
    // Validation
    body("nama_alat_tangkap").notEmpty(),
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
      nama_alat_tangkap: req.body.nama_alat_tangkap,
    };

    connection.query(
      "UPDATE alat_tangkap SET ? WHERE id_alat_tangkap = ?",
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
    "DELETE FROM alat_tangkap WHERE id_alat_tangkap = ?",
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
