const express = require('express');
const connectDB=require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// initialize middleware (parses incoming JSON payloads)
app.use(express.json({ extended: false }));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));


//production 
if(process.env.Node_ENV==='production'){
app.use(express.static('client/build'));
app.get('*',(req,res)=>{
	 res.sendFile(path.resolve(_dirname,'client','build','index.html'));
	 
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));