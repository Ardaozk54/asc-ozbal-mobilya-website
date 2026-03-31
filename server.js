import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import categories from "./data/categories.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Ana Sayfa",
    page: "home",
    categories
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Hakkımızda",
    page: "about"
  });
});

app.get("/categories", (req, res) => {
  res.render("categories", {
    title: "Kategoriler",
    page: "categories",
    categories
  });
});

app.get("/categories/:slug", (req, res) => {
  const category = categories.find(item => item.slug === req.params.slug);

  if (!category) {
    return res.status(404).send("Kategori bulunamadı");
  }

  res.render("category-detail", {
    title: category.name,
    page: "categories",
    category
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "İletişim",
    page: "contact"
  });
});

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});