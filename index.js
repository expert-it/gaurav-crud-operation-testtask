
//required module
const express = require('express'),
    cors = require('cors'),
    path = require('path'),
    Constant = require('./constant'),
    app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded());



app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/uploads", express.static(__dirname + '/uploads'));

const http = require('http').createServer(app);
http.listen(Constant.PORT, () => {
    console.log('Server started on port ' + Constant.PORT);
});


require('./mongo')
require('./server/routes/index')(app)
