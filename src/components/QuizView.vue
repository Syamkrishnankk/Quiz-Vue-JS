<template>
    <div class="text-center mt-8">
        <h1 class="text-h4 font-weight-medium">Questions</h1>
    </div>
    
    <v-row  align="center" class="my-10">
      <v-col justify="left" align="left"  cols="9" class="px-2 py-3">
        <!-- <v-pagination :length="totalQuestions" v-model="page" justify="left" active-color="success" total-visible="3" :class="paginationClasses" >
        </v-pagination> -->
        <div
        class="btn-scroll ml-10"
        >
        <span v-for="num in totalQuestions" :key="num">
          <v-btn :class="{'mx-1 my-2': true,'blue': selectedAnswers[num]}" min-width="10" @click="qstChange(num)" >
            {{ num }}
          </v-btn>
        </span>
        
      </div>
        
      </v-col>
      <v-col justify="right" align="right" cols="3" >
        <v-btn color="success" @click="handleSubmit();dialog = true" class="mr-10 btn" >
            End Quiz
        </v-btn>
      </v-col>
    </v-row>

    <span v-for="questions in questionoptions.questions">

        <QuizCard v-if="page === questions.id">
            <template #question>
              {{ questions.id }}. {{ questions.question }}
            </template>
            <template #qst >
                <v-radio-group v-model="selectedAnswers[questions.id]">
                    <v-radio v-for="options in questions.options"  :label="options.option " :value="options.option " :key="options.id"></v-radio>
                </v-radio-group>
            </template>  
        </QuizCard>
    </span>
    <v-row class="mx-5 my-5">
      <v-col class="btn-margin">
        <v-btn @click="PrevQst">
        Prev
        </v-btn>
      </v-col>
      <v-col justify="right" align="right">
        <v-btn @click="nextQst">
        Next
        </v-btn>
      </v-col>
    
    </v-row>
    <v-dialog
        v-model="dialog"
        width="auto"
      >
        <v-card
          max-width="400"
          width="300"
        >
        <div class="px-7 py-5">
          <h3 class="mt-3">Hii {{ username }},</h3>
          <h4 class="mt-2 mb-1">Your Score : {{ correctCount }}/{{ totalQuestions }}</h4>
          <p class="mt-1">Correct Answered : {{ correctCount }}</p>
          <p class="mt-1">Wrong Answered : {{ wrongCount }}</p>
          <p class="mt-1">Not Attempted : {{ notCount }}</p>

        </div>
        
          <template v-slot:actions>
            <v-btn
              class="ms-auto"
              text="Ok"
              @click="dialog = false;reloadPage()"
            ></v-btn>
          </template>
        </v-card>
      </v-dialog>

</template>

<style scoped>
  .btn-scroll{
    scroll-behavior: smooth;
    scrollbar-width:none;
    display: flex;
    flex-direction: row;
    overflow: auto;
  }
  .blue{
    background-color: rgba(255, 255, 255, 0.862);
    color: black;
  }
  @media screen and (max-width: 720px){
    .btn{
    font-size: 12px;
  }
  }

 
</style>

<script setup>

import QuizCard from './QuizCard.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router';
let page = ref(1)
const route = useRoute();
const username = route.query.username;
console.log(username)
    const questionoptions = ref({
        questions : [
        {
            id : 1,
            question : 'A person crosses a 600 m long street in 5 minutes. What is his speed in km per hour?',
            options :[
                { option : '3.6', isCorrect : false },
                { option : '7.2', isCorrect : true },
                { option : '8.4', isCorrect : false },
                { option : '10', isCorrect : false },
                
                ]
        },
        {
            id : 2,
            question : 'If a person walks at 14 km/hr instead of 10 km/hr, he would have walked 20 km more. The actual distance travelled by him is:',
            options :[
                { option : '50 km', isCorrect : true },
                { option : '6 km', isCorrect : false },
                { option : '70 km', isCorrect : false },
                { option : '80 km', isCorrect : false },
                
                ]
        },
        {
            id : 3,
            question : 'Excluding stoppages, the speed of a bus is 54 kmph and including stoppages, it is 45 kmph. For how many minutes does the bus stop per hour?',
            options :[
                { option : '9', isCorrect : false },
                { option : '10', isCorrect : true },
                { option : '12', isCorrect : false },
                { option : '20', isCorrect : false },
                
                ]
        }

    ]
})
const selectedAnswers = ref({}); 
const dialog = ref(false)
let correctCount = 0;
let wrongCount = 0;
let selectedLength = 0;
let notCount;
let totalQuestions = questionoptions.value.questions.length;
function handleSubmit() {
  for (const questionId in selectedAnswers.value) {
    const selectedOption = selectedAnswers.value[questionId];
    selectedLength++;
    const correctOption = questionoptions.value.questions.find(
      (question) => question.id === parseInt(questionId) 
    ).options.find((option) => option.isCorrect);
    console.log(correctOption)
    console.log(selectedOption)
    if (selectedOption === correctOption.option) {
      correctCount++;
    }
    else if(selectedOption !== correctOption.option){
        wrongCount++;
    }
    
  }
  
  
  notCount = totalQuestions-selectedLength;
  

  console.log(`You selected ${correctCount} out of ${totalQuestions} questions correctly.`);
  console.log(`You selected ${wrongCount} out of ${totalQuestions} questions Wrongly.`);
  console.log(`You Not selected ${notCount} out of ${totalQuestions} questions .`);
}
const reloadPage = () =>{
  window.location.reload();
}
function nextQst(){
  if(page.value < totalQuestions){
      page.value +=1
      console.log(page.value)
  }
  else{
    page.value = page.value
    console.log(page.value)
  }
  
}
function PrevQst(){
  if(page.value > 1){
      page.value -=1
  }
  else{
    page.value = page.value
  }
  
}
const qstChange = (num) =>{
  page.value = num
}

</script>
