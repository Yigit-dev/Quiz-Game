<template>
    <div class="FinishQuiz">
        <h1>{{username}}</h1>
        <h2>Point: {{this.totalPoint}}</h2>
        <div class="actions">
            <router-link to="/"><button>restart</button></router-link>
            <router-link :to="scoreBoardLink"><button @click="saveScoreBoard">scoreboard</button></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "FinishQuiz",
    data(){
        return{
            questions: [],
            answers: [],
            selectedOptions: [],
            totalPoint: 0,
            username: this.$route.params.username
        }
    },
    async created() {
        await this.$appAxios.get("/quiz")
            .then(response => this.questions = response.data);

        this.calculatePoint()
    },
    computed: {
        scoreBoardLink(){
            return `/scoreboard/q=${this.username}`
        }
    },
    methods: {
        setAnswers(){
            this.questions.forEach(question => {
                question.options.forEach(item  => {
                    if(item.isAnswer === true){
                        this.answers.push(item.id)
                    }
                })
            });
        },
        setOptions(){
            this.questions.forEach(question => {
                this.selectedOptions.push(question.selectedOptionId)
            });
        },
        refreshAnswer(){
            this.questions.forEach(question => {
                this.$appAxios.patch(`/quiz/${question.id}`, {selectedOptionId: null})
                    .then(res => res)
            })
        },
        calculatePoint(){
            this.setAnswers()
            this.setOptions()
            for (let i = 0; i < this.answers.length; i++) {
                if(this.answers[i] === this.selectedOptions[i]){
                    this.totalPoint += this.questions[i].point
                }
            }
        },
        saveScoreBoard(){
            this.$appAxios.post("/scoreboard", {
                username: this.username,
                point: this.totalPoint
            }).then(res => res)

            this.refreshAnswer()
        }
    },
}
</script>
<style scoped>
.FinishQuiz{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.FinishQuiz h1{
    font-size:3rem;
}
.FinishQuiz h2{
    font-size: 1.6rem;
}
</style>