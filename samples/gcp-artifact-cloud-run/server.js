import express from 'express';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Venus! 	⊂(◉‿◉)つ');
});

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});