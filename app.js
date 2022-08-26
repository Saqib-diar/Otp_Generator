const express = require('express')
const app = express()

require('./model')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use('/api', require('./routes/userRoutes'))

app.get('*', (req, res)=>{
    res.status(404).send('Route does not exist');
})



const port = 8080
app.listen(port, ()=>{
    console.log(`server is running on port http://localhost:${port}`);
})