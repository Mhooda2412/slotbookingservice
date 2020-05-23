const express = require('express')
const Slot = require('../modules/slot')
const auth = require('../middleware/auth')
const router = new express.Router()



router.post('/slots',auth,async (req,res)=>{
    const slot = new Slot({
        ...req.body,
        owner:req.user._id
    })
    try{
		await slot.save()
		res.status(201).send(slot)
	}catch(e){
		res.status(400).send(e)
	}
})


router.get('/slots',auth,async (req,res)=>{
		
	try{
		const slot = await req.user.populate({
			path:'slots'
			
		}).execPopulate()
		res.send(req.user.slots) 
	}catch(e){
		res.status(500).send()
	} 
})

router.get('/slots/all',auth,async (req,res)=>{
		
	try{
        
		const slots = await Slot.find({}) 
		res.send(slots) 
	}catch(e){
		res.status(500).send()
	} 
})

router.get('/slots/:id',auth,async (req,res)=>{
	const _id = req.params.id
	try{
		const slot = await Slot.findOne({_id, owner : req.user._id })
		
		if(!slot){
			return res.status(404).send()
		}
		res.send(slot)
	}catch(e){
		res.status(500).send()
	} 
})

router.patch('/slots/:id',auth,async (req,res)=>{
	const _id = req.params.id
	const updates = Object.keys(req.body)
	const allowedUpdates = ['appointmentDate','appointmentStartTime','appointmentEndTime']
	const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))
	if(!isValidOperation){
		return res.status(400).send({error:"invalid operation"})
	}
	

	try{
		
		const slot = await Slot.findOne({_id, owner : req.user._id})
	
		if(!slot){
			return res.status(404).send()
		}

		updates.forEach((update)=> slot[update] = req.body[update])
		await slot.save()		

		res.send(slot)
	}catch(e){
		res.status(400).send()
	} 
})

router.delete('/slots/:id',auth,async (req,res)=>{
	const _id = req.params.id
	try{
		const slot = await Slot.findOneAndDelete({_id,owner:req.user._id})
		if(!slot){
			return res.status(404).send({error:"Slot not found"})
		}
		res.send(slot)
	}catch(e){
		res.status(500).send()
	}
})



module.exports = router