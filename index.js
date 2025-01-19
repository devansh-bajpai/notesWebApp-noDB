const express = require("express");
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    fs.readdir("./files_save", (err, files) => {

        res.render("index", {files: files});
    })
})

app.post('/create', (req, res) => {

    fs.writeFile(`./files_save/${req.body.title.split(' ').join('') + '.txt'}`, req.body.content, (err) => {
        if (err) {
            console.log(err);
            res.redirect('/');
        }
        else {
            res.redirect('/');
        }
    })

    
})

app.listen(3000, () => {
    console.log("App is Listening on PORT 3000");
});