<template>
  <div class="Home">
    <LoginQuiz 
      v-show="step === 1" 
      @username="data => username = data"
      @activeStep="data => step = data" />

    <Quiz 
      v-show="step === 2"
      :username="username" />
  </div>
</template>

<script>
import LoginQuiz from '../components/LoginQuiz.vue';
import Quiz from '../components/Quiz.vue';

export default {
    name: "HomeView",
    components: { LoginQuiz, Quiz },
    data(){
      return{
        step: 1,
        username: ''
      }
    }
}
</script>

<style scoped>
.Home{
  width: 100%;
}
</style>