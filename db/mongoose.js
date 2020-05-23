const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/slotbookingservice', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})