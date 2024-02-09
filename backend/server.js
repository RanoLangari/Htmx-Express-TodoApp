import express from "express";
import cors from "cors";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/data", (_, res) => {
  db.query("SELECT * FROM tbl_worklist ORDER BY id DESC", (err, result) => {
    if (err) return res.send("Gagal Mendaptkan Data");
    let html = "";
    result.map((data) => {
      html += `
      <li id="item-${data.id}"
       class="flex items-center justify-between mb-2">
      <span>${data.work}</span>
      <button 
            hx-delete="http://localhost:8000/data/${data.id}" 
            hx-trigger="click"  
            hx-swap="outerHTML"
            hx-target="#item-${data.id}"
            class="text-red-500">Delete
          </button>
        </li>
      `;
    });
    res.send(html);
  });
});

app.post("/data", (req, res) => {
  const { work } = req.body;
  db.query(`INSERT INTO tbl_worklist(work) VALUES('${work}')`, (err, _) => {
    if (err) throw err;
    res.send("Data Berhasil Ditambahkan!!!");
  });
});

app.delete("/data/:id", (req, res) => {
  console.log("Nyalaa");
  const id = req.params.id;
  db.query(`DELETE FROM tbl_worklist WHERE id = '${id}'`, (err, _) => {
    if (err) return res.send("Gagal Menghapus data");
    res.send("");
  });
});

app.use("*", (_, res) => {
  res.send("Endpoint Tidak Ditemukan");
});
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
