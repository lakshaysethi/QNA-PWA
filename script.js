const questions_input = document.getElementById('questions-input')
const current_question = document.getElementById('current-question')
const answers_input = document.getElementById('answers-input')
const answers_to_question = document.getElementById('answers-to-question')
const questions_holder = document.getElementById('questions-holder')
const answers_holder = document.getElementById('answers-holder')
const main = document.getElementById('main')
const back_btn = document.getElementById('back-to-questions')


class Question {
    constructor(name){
        this.name = name
        this.answers_array = [] // array of string answers
    }

}




let questions_array = [];
if (localStorage.getItem('questions')){
    questions_array = localStorage.getItem('questions')
}

main.style.display = 'block'

questions_input.addEventListener('keypress',(e)=>{
    if(e.key=='Enter'){
        questions_array.push(e.target.value)
        e.target.value = ''
        saveWork()
        refreshQuestionsList()
    }
})

const saveWork = ()=>{
    let qns_array_string = JSON.stringify(questions_array)
    localStorage.setItem('questions_array',qns_array_string)
}


const refreshQuestionsList = ()=>{
    questions_array.forEach(question => {
        let qn= document.createElement('div')
        qn.classList.add('question')
        qn.innerText = question.name
        qn.addEventListener('click',()=>{
            let index = questions_array.indexOf(question)
            showAnswers(index)
        })
    });
}


function showAnswers(index){
    main.style.display ='none'
    answers_to_question.style.display='block'
    current_question.innerText=questions_array[index].name
    

}



const refreshAnswersList = (index)=>{
    questions_array[index].answers_array.forEach(answer => {
        let ans= document.createElement('div')
        ans.classList.add('answer')
        ans.innerText = answer.name
        ans.addEventListener('click',()=>{
            let index = answers_array.indexOf(answer)
            showAnswers(index)
        })
    });
}