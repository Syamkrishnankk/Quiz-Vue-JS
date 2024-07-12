<template>
    <div class="text-center mt-8">
        <h1 class="text-h4 font-weight-medium">Questions</h1>
    </div>
    <span v-for="questions in questionoptions.questions">
        <QuizCard >
            <template #question>
                {{ questions.question }}
            </template>
            <template #qst >
                <v-radio-group v-model="selectedAnswers[questions.id]">
                    <v-radio v-for="options in questions.options"  :label="options.option " :value="options.option " :key="options.id"></v-radio>
                </v-radio-group>
            </template>  
        </QuizCard>
    </span>
    <v-row justify="center" align="center" class="my-10">
        <v-btn color="success" @click="handleSubmit();dialog = true">
            Submit
        </v-btn>
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
          <h3>Hii {{ username }},</h3>
          <p>Your Score : {{ correctCount }}/{{ totalQuestions }}</p>
          <p>Correct Answered : {{ correctCount }}</p>
          <p>Wrong Answered : {{ wrongCount }}</p>
          <p>Not Attempted : {{ notCount }}</p>

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

<script setup>

import QuizCard from './QuizCard.vue'
  import { ref } from 'vue'

  import { useRoute } from 'vue-router';

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
let totalQuestions;
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
  
  totalQuestions = questionoptions.value.questions.length;
  notCount = totalQuestions-selectedLength;
  

  console.log(`You selected ${correctCount} out of ${totalQuestions} questions correctly.`);
  console.log(`You selected ${wrongCount} out of ${totalQuestions} questions Wrongly.`);
  console.log(`You Not selected ${notCount} out of ${totalQuestions} questions .`);
}
const reloadPage = () =>{
  window.location.reload();
}
</script>





