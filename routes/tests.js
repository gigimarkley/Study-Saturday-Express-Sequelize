const router = require('express').Router();
const Test = require(`../db/models/test`)
const Student = require(`../db/models/student`)

//gets all the tests
router.get('/', async (req,res,next) => {
  try {
    const allTests = await Test.findAll();
    res.send(allTests)
  } catch (error) {
    next(error)
  }
})

//gets test for specific id
router.get('/:id', async (req,res,next) => {
  try{
    const testById = await Test.findByPk (req.params.id)
    res.send(testById)
  } catch (error) {
    next(error)
  }
})

//creates a new test for student ---use association
router.post('/student/:studentId', async (req,res,next) => {
  try{

    let student = await Student.findByPk(req.params.studentId) //find the student
    let test = await Test.create(req.body)
    let studentTest = await test.setStudent(student) //using magic method
    res.status(201).send(newTest)
  }catch (error) {
    next(error)
  }
})

//deletes test by id
router.delete('/:id', async (req,res,next) => {
  try{
    await Test.destroy({where: { id: req.params.id}})
    res.status(204).send()
  }catch (error) {
    next(error)
  }
})

module.exports = router;
