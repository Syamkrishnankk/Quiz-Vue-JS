<template>
  <v-container class="fill-height">
    <v-responsive>
      <div class="text-center">
        <h1 class="text-h2 font-weight-bold">Quiz</h1>
      </div>
      <v-row align="center" justify="center"> 
        <v-col cols="auto">
          <v-text-field 
        :rules="rules" 
        class="mt-10" 
        min-width="400"
        placeholder="Name"
        @keyup.enter="gotoQuiz"
        color="success"
        v-model="username"
        
      >
      </v-text-field>
      </v-col>
   
      </v-row>
      
      <v-row align="center" justify="center" >
        <v-col cols="auto">
          <v-btn @click="gotoQuiz">
          Enter
        </v-btn>
        </v-col>
        
      </v-row>
      
    </v-responsive>
  </v-container>
</template>


<script setup>

import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue'
import QuizView from './QuizView.vue'
import Quiz from './Quiz.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const  rules=ref( [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
      ])
const username = ref('')

const gotoQuiz= () =>{
  console.log(username.value)
  if(username.value.length >0){
    console.log(username.value.length)
    // console.log({...router})
    router.push({path:'/quizview',query:{ username : username.value  }})
    // router.replace({path:'/QuizView'})
    console.log(username.value)
  }
  
}

</script>