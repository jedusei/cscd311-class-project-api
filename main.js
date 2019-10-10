const
    express = require('express'),
    cors = require('cors'),
    mongoose = require('mongoose');

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(require('./Routes'));

let mongoURL = "mongodb://localhost:27017/ug-hall";
(async () => {
    await mongoose.connect(mongoURL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    app.listen(80, () => {
        console.log("Server started.");
    })
})();