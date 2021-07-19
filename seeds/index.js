const Quiz = require('../models/quiz');//isme dataType ready hua hain

const question1 = require('./questions1')//isme saara dataBase pada hua hain
const question2 = require('./questions2')
const question3 = require('./questions3')
const question4 = require('./questions4');

//as a default yaad karle
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/quiz-game', {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology:true
});

const db = mongoose.connection;//shortcut
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const seedDB = async() => {
    await Quiz.deleteMany({});
        //loading FRIENDS questions
        for(let i = 0; i < 10; i++)//here 10
        {
            const Q = new Quiz({
                question: `${question1[i].question}`,
                option1: `${question1[i].option1}`,
                option2: `${question1[i].option2}`,
                option3: `${question1[i].option3}`,
                option4: `${question1[i].option4}`,
                answer: `${question1[i].answer}`
            })
            await Q.save();
        }
        //loading HARRY POTTERS questions
        for(let i = 0; i < 5; i++)
        {
            const Q = new Quiz({
                question: `${question2[i].question}`,
                option1: `${question2[i].option1}`,
                option2: `${question2[i].option2}`,
                option3: `${question2[i].option3}`,
                option4: `${question2[i].option4}`,
                answer: `${question2[i].answer}`
            })
            await Q.save();
        }
        //loading BROOKLYN NINE NINE questions
        for(let i = 0; i < 5; i++)
        {
            const Q = new Quiz({
                question: `${question3[i].question}`,
                option1: `${question3[i].option1}`,
                option2: `${question3[i].option2}`,
                option3: `${question3[i].option3}`,
                option4: `${question3[i].option4}`,
                answer: `${question3[i].answer}`
            })
            await Q.save();
        }
        //loading CRICKET questions
        for(let i = 0; i < 5; i++)
        {
            const Q = new Quiz({
                question: `${question4[i].question}`,
                option1: `${question4[i].option1}`,
                option2: `${question4[i].option2}`,
                option3: `${question4[i].option3}`,
                option4: `${question4[i].option4}`,
                answer: `${question4[i].answer}`
            })
            await Q.save();
        }
}

seedDB().then(() => {
    mongoose.connection.close();
})

//after executing this program i have the mongoose database(questions) ready with 20 Qs in order