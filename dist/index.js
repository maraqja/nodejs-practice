import express from 'express';
import { userRouter } from './users/users.js';
const port = 8000;
const app = express();
const cb = function (req, res, next) {
    console.log('middleware');
    next();
};
app.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
app.get('/hello', cb, (req, res) => {
    res.send('Hello!');
});
app.post('/hello', (req, res) => {
    res.send('Hello');
});
app.use('/users', userRouter);
app.use((err, req, res) => {
    console.log(err.message);
    res.status(401).send(err.message);
});
app.listen(port, () => {
    console.log(`Server started on localhost:${port}`);
});
