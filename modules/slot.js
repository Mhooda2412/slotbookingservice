const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    appointmentDate:{
        type:Date,
        required: true,
    },
    appointmentStartTime:{
        type:String,
        required: true
    },
    appointmentEndTime:{
        type:String,
        required: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User"
    }

},{
    timestamps: true
})


const Slot = mongoose.model('Slot',slotSchema )


module.exports = Slot