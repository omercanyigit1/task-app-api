const express = require('express');
require('./db/mongoose');
const cors = require('cors');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 8000;

/** app.use((req, res, next) => {
    res.status(503).send('Site is currently down. Check back soon!');
}); **/

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is running... ' +port);
});
