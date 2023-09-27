const express = require("express");
const app = express();
const port = 3030;

const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({ extended: true}));
app.use(bodyPs.json());


const alatTangkapRouter = require("./controller/master/alat_tangkap");
const dpiRouter = require("./controller/master/dpi");
const pemilikRouter = require("./controller/master/pemilik");
const kapalRouter = require("./controller/master/kapal");

app.use("/api/alat_tangkap", alatTangkapRouter);
app.use("/api/dpi", dpiRouter);
app.use("/api/pemilik", pemilikRouter);
app.use("/api/kapal", kapalRouter);

app.listen(port, () =>{
    console.log(`aplikasi berjalan di http://localhost:${port}`)
});