const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter');
const path = require("node:path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const users = ["Rose", "Cake", "Biff"];
const links = [
    { href: "/", text: "Home" },
    { href: "about", text: "About" },
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("index", { links: links, users: users });
});

app.get("/about", (req, res) => {
    res.render("about", { links: links, message: "This is a page about me!" });
});

app.get("/:username/messages", (req, res) => {
    console.log("Params:", req.params);
    console.log("Query:", req.query);
    res.end();
});

app.get("/:username/messages/:messageId", (req, res) => {
    console.log(req.params);
    res.end();
});


app.use('/users', userRouter);

app.use((req, res, next) => {
    next();
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`My first Express app - listening on port ${PORT}!`));
