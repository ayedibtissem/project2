
const express=require("express")
const mongoose=require("mongoose")
mongoose.set("strictQuery",false);
const dotenv=require("dotenv")
const cors=require("cors")
const Question = require('./models/question')
const User=require('./models/user')
const Answer = require("./models/answer");
const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.DBURL,()=>{
    console.log("db connected")
})


app.post("/question", async (req, res) => {
  const question = new Question(req.body);
  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/question", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/question/:id", getQuestion, (req, res) => {
  res.json(res.question);
});

app.patch("/question/:id", getQuestion, async (req, res) => {
  if (req.body.title != null) {
    res.question.title = req.body.title;
  }
  if (req.body.text != null) {
    res.question.text = req.body.text;
  }
  if (req.body.options != null) {
    res.question.options = req.body.options;
  }
  if (req.body.answer != null) {
    res.question.answer = req.body.answer;
  }
  try {
    const updatedQuestion = await res.question.save();
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/question/:id", getQuestion, async (req, res) => {
  try {
    await res.question.remove();
    res.json({ message: "Question deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/user", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    score: 0,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getQuestion(req, res, next) {
  let question;
  try {
    question = await Question.findById(req.params.id);
    if (question == null) {
      return res.status(404).json({ message: "Question not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.question = question;
  next();
}

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/user/:id", getUser, (req, res) => {
  res.json(res.user);
});

app.patch("/user/:id", getUser, async (req, res) => {
  if (req.body.score != null) {
    res.user.score = req.body.score;
  }
  try {
    const updatedUser = await updateUser(res.user);
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function updateUser(user) {
  try {
    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw error;
  }
}
    
    app.delete("/user/:id", getUser, async (req, res) => {
      try {
        await res.user.remove();
        res.json({ message: "User deleted." });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });
    
    async function getUser(req, res, next) {
      let user;
      try {
        user = await User.findById(req.params.id);
        if (user == null) {
          return res.status(404).json({ message: "User not found." });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
      res.user = user;
      next();
    }
    
    
    app.post("/answer", async (req, res) => {
      const { questionId, userId, option, answer } = req.body;
    
      if (!answer) {
        return res.status(400).json({ message: "Answer is required." });
      }
    
      try {
        const question = await Question.findById(questionId);
        if (!question) {
          return res.status(404).json({ message: "Question not found." });
        }
    
        const isAnswerCorrect = question.answer === option;
    
        const newAnswer = new Answer({
          questionId,
          userId,
          option,
          answer,
          isCorrect: isAnswerCorrect
        });
    
        await newAnswer.save();
    
        res.status(201).json({
          answer: newAnswer,
          isCorrect: isAnswerCorrect
        });
    
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
    
    app.get("/answer/:id", getAnswer, (req, res) => {
      res.json(res.answer);
    });
    
    async function getAnswer(req, res, next) {
      let answer;
      try {
        answer = await Answer.findById(req.params.id);
        if (answer == null) {
          return res.status(404).json({ message: "Answer not found." });
        }
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
      res.answer = answer;
      next();
    }
    
    app.listen(process.env.URL,()=>{
      console.log(`server is running ${process.env.URL}`)
      })