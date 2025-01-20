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

app.get('/get/:filename', (req, res) => {
    fs.readFile(`./files_save/${req.params.filename}`, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("show", {data: data, filename: req.params.filename});
        }
    });
})


app.post('/edit/:filename', (req, res) => {
    if (req.body.renameFile != ''){
        fs.rename(`./files_save/${req.params.filename}`, `./files_save/${req.body.renameFile}`, (err) => {
            if(err) {
                console.log(err);
            }
            console.log('Rename Complete!');
        })
    }
    fs.writeFile(`./files_save/${req.params.filename}`, req.body.alterContent, (err) => {
        if(err) {
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