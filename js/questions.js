var questions = [
    {
        question: '¿Llamas',
        correctAnswer: 'Hector',
        answers: ['Pedro', 'Ramón']
    },
    {
        question: 'Anos?',
        correctAnswer: 'catorce',
        answers: ['doce', 'trece']
    },
    {
        question: "autor?",
        correctAnswer: 'Jules Verne',
        answers: ['Douglas Adams', 'Ernest Cline']
    }
]

for(let i = 0; i < questions.length; i++){
    questions[i].answers.sort(() => Math.random() - 0.5)
}
questions.sort(() => Math.random() - 0.5)