const mongoose = require('mongoose');
const Constant = require('./constant');

mongoose.connect( Constant.db_url , (err , db)=>{
    if(err) console.log('error connecting ab',err)
    console.log('Connected to db')
})

