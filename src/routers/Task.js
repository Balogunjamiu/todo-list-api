const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const Department = require('../models/department')

// create Department
router.post('/taskDepartment', async (req,res)=>{
    const departments = new Department({
        ...req.body
    })
    try{
        const response =  await departments.save()
            res.status(201).send({
                body: response, 
                message: "Category has been created successfully.", 
                status: true})
        }catch(e){
            res.status(400).send({
                error: e,
                message: "Something went wrong."
            })
        }
    })
    // create Task
            router.post('/tasks/:departmentId', async (req,res) =>{
                const task = new Task({
                ...req.body
            })
            const _id = req.params.departmentId
            try{
            const response = await task.save()
            if(response){
                 await Department.findByIdAndUpdate(
                    {_id},
                    {$push:{tasks:task}},
                    {new:true, useFindAndModify:false }
                    )          
            }
            res.status(200).send({
                message: "Task has been created successfully.",
                response: response,
                status: true
            })
            }catch(e){
                res.status(400).send(e)
            }
            })
            // get all tasks
    router.get('/allTasks', async (req, res)=>{
        try{
            const task = await Task.find({})
            res.send(task)

        }catch(e){
            res.status(500).send(e)
        }
    })

    // get all in a department
    router.get('/departmentTasks/:departmentId', async(req, res)=>{
        const _id = req.params.departmentId
        try{
            const task = Department.findById({_id}).populate('tasks').exec()
            if(!task){
                return res.status(200).send('no task in this department')
            }
            res.send(task)
        }catch(e){
            res.status(500).send(e)
        }
    })

    // delete a task
    router.delete('/deleteTask/:id', async (req, res)=>{
        try{
            task = await Task.findOneAndDelete({_id:req.params.id})
            if(!task){
                return res.status(404).send()
            }
            res.send('task has been deleted')
        }catch(e){
            res.status(500).send()
        }
    })

module.exports = router