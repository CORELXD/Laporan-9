const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../../config/db"); // Update the path to your database connection file

// GET all dpi records
router.get("/", (req, res) => {
  connection.query("SELECT * FROM dpi order by id_dpi", (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Server Gagal",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Data DPI",
        data: rows,
      });
    }
  });
});

// POST (STORE) a new dpi record
router.post("/store",[
    // Validation
    body("nama_dpi").notEmpty(),
    body("luas").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }
    const data = {
      nama_dpi: req.body.nama_dpi,
      luas: req.body.luas,
    };

    connection.query("INSERT INTO dpi SET ?", data, (err, rows) => {
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
          message: "Berhasil Menambahkan Data Dpi",
          data: rows
        });
      }
    });    
  }
);

// GET a specific dpi record by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM dpi WHERE id_dpi = ?",
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
          message: "Data Dpi : ",
          data: rows[0],
        });
      }
    }
  );
});

// PATCH (UPDATE) dpi record by ID
router.put(
  "/update/:id",
  [
    // Validation
    body("nama_dpi").notEmpty(),
    body("luas").notEmpty(),
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
      nama_dpi: req.body.nama_dpi,
      luas: req.body.luas,
    };

    connection.query(
      "UPDATE dpi SET ? WHERE id_dpi = ?",
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
    "DELETE FROM dpi WHERE id_dpi = ?",
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
