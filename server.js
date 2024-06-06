let app = require("express")();
app.get("/*", (req, res) => {
    if (req.url == "/") {
        res.sendFile(__dirname + "/dist/index.html");
        return;
    }

    if (req.url.split('/')[1] == "src") {
        res.sendFile(__dirname + "/" + req.url);
        return;
    }
    res.sendFile(__dirname + "/dist/" + req.url);
})

app.listen(8000);