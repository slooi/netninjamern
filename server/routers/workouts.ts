import express from "express";

const router = express.Router()

// GET all
router.get(`/`,(req,res)=>{
	res.status(200).json({msg:"GET all workouts"})
})

// GET id
router.get(`/:id`,(req,res)=>{
	const {id} = req.params
	res.status(200).json({msg:`GET workout: ${id}`})
})

// POST
router.post(`/`,(req,res)=>{
	
	res.status(200).json({msg:"POST workout"})
})

// DELETE
router.delete("/:id",(req,res)=>{
	const {id} = req.params
	res.status(200).json({msg:"DELETE workout: "+id})
})

// PATCH
router.patch("/:id",(req,res)=>{
	const {id} = req.params
	res.status(200).json({msg:"PATCH workout: "+id})
})



export const routerWorkouts = express.Router().use("/workouts",router)