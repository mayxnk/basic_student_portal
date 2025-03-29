const express = require('express')
const cors = require('cors')
const zod = require('zod')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {authMiddleware} = require('./middleware')
const {JWT_SECRET,MONGODB_URI} = require('./config')
const {Student} = require('./db')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


//signup
const { mongoose } = require('mongoose')
mongoose.connect(MONGODB_URI)

const saltRounds = 10;
const signupBody = zod.object({
    email: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string(),
    gender:zod.string()
})

app.post('/signup',async (req,res) => {
    const {success} = signupBody.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingStudent = await Student.findOne({
        email: req.body.email
    })

    if (existingStudent) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const secPass = await bcrypt.hash(req.body.password, saltRounds);
    const student = await Student.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: secPass,
        gender: req.body.gender
    })
    const studentId = student._id;

    const token = jwt.sign({
        email:req.body.email
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


//signin 

const signinBody = zod.object({
    email: zod.string().email(),
	password: zod.string()
})

app.post("/signin", async (req, res) => {
    console.log("Received Headers:", req.headers);
  console.log("Received Body:", req.body);
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const student = await Student.findOne({
        email: req.body.email,
    });
    if(!student){
        return res.status(400).json({ error: "Login with proper credentials!" });
    }
    
    const pass = await bcrypt.compare(req.body.password, student.password)
    if(!pass){
        return res.status(400).json({ error: "Login with proper credentials!" });
    }

    if (student) {
        const token = jwt.sign({
            email:req.body.email
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }


    res.status(411).json({
        message: "Error while logging in"
    })
})

app.get('/dashboard',authMiddleware,async (req,res) => {
    const student = await Student.findOne({
        email: req.email
    })

    res.json({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        gender: student.gender
    })
})


app.listen(3000,() => {
    console.log('Server listening on PORT 3000');
})