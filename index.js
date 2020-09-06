let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dataBaseConfig = require('./database.config');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected sucessfully ')
},
    error => {
        console.log('Could not connected to database : ' + error)
    }
)

// Set up express js port
const questionRoute = require('./routes/question.route')
const groupRoute = require('./routes/group.route')
const subgroupRoute = require('./routes/subgroup.route')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// RESTful API root
app.use('/api', questionRoute);
app.use('/api', groupRoute);
app.use('/api', subgroupRoute);

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// Index Route
app.get('/', (req, res) => {
    res.send('invaild endpoint');
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});