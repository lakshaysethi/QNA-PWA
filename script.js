const questions_input = document.getElementById('questions-input')
const current_question = document.getElementById('current-question')
const answers_input = document.getElementById('answers-input')
const answers_to_question = document.getElementById('answers-to-question')
const questions_holder = document.getElementById('questions-holder')
const answers_holder = document.getElementById('answers-holder')
const main = document.getElementById('main')
const back_btn = document.getElementById('back-to-questions')
const add_question_btn = document.getElementById('add-question')
let current_question_obj = null

class Question {
    constructor(name){
        this.name = name
        this.answers_array = [] // array of string answers
    }

}

let questions_array = [];
if (localStorage.getItem('questions')){
    questions_array = JSON.parse(localStorage.getItem('questions'))
    refreshQuestionsList()
}

main.style.display = 'block'
const addnewQuestion = (question_name)=>{
    if(question_name=='') return
    let new_question = new Question(question_name)
    questions_array.push(new_question)
    questions_input.value = ''
    saveWork()
    refreshQuestionsList()
}


const listener = (e)=>{
    if(e.key=='Enter'){
        addnewQuestion(e.target.value)

        }
}

questions_input.addEventListener('keypress',listener)

add_question_btn.addEventListener('click',()=>{
    addnewQuestion(questions_input.value)
})

answers_input.addEventListener('keypress',(e)=>{
    if(e.key=='Enter'){

        let answer = e.target.value
        current_question_obj.answers_array.push(answer)
        e.target.value = ''
        saveWork()
        refreshAnswersList()
    }
})
const saveWork = ()=>{
    let qns_array_string = JSON.stringify(questions_array)
    localStorage.setItem('questions',qns_array_string)
}


function refreshQuestionsList (){
    questions_holder.innerHTML = ''
    questions_array.forEach(question => {
        let qn= document.createElement('div')
        qn.classList.add('question')
        qn.innerText = question.name
        qn.addEventListener('click',()=>{
            current_question_obj = question
            let index = questions_array.indexOf(question)
            showAnswers(index)
        })
        questions_holder.append(qn)
    });
}


function showAnswers(index){
    main.style.display ='none'
    answers_to_question.style.display='block'
    current_question.innerText=questions_array[index].name
    refreshAnswersList()

}



function refreshAnswersList (){
    let index = questions_array.indexOf(current_question_obj)
    answers_holder.innerHTML = ''
 
    questions_array[index].answers_array.forEach(answer => {
        let ans= document.createElement('div')
        ans.classList.add('answer')
        ans.innerText = answer
        answers_holder.append(ans)
    });
}




back_btn.onclick = () =>{
    showMain()
}


function showMain(){
    main.style.display ='block'
    answers_to_question.style.display='none'
    // current_question.innerText=questions_array[index].name
    refreshQuestionsList()
   
}