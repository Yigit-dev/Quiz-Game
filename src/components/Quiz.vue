<template>
    <div class="Quiz">
        <div class="header">
            <h1>{{username}}</h1>
            <h2>{{questionCount}}% / 100%</h2>
        </div>
        <hr>
        <div class="questions">
            <template v-for="item in questions">
                <div v-if="item.id === questionIndex+1">
                    <div class="question">
                        <h2>Question</h2>
                        <p>{{item.question}}</p>
                    </div>
                    <div class="options">
                        <ul class="option">
                            <QuizItem v-for="option in item.options"
                                :key="option.id" 
                                :option="option"
                                :resetSelected="resetSelected"
                                :questionIndex="questionIndex" />
                        </ul>
                    </div>
                    <div class="actions">
                        <button v-if="questionIndex !== 0" @click="prevQuestion">prev</button>
                        <button v-if="!isFinished" @click="nextQuestion">next</button>
                        <router-link v-else :to="finishLink"><button>finish</button></router-link>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import QuizItem from "./QuizItem.vue";
export default {
    name: "Quiz",
    components: { QuizItem },
    props: {
        username: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            questions: [],
            questionIndex: 0,
            isFinished: false
        };
    },
    async created() {
        await this.$appAxios.get("/quiz")
            .then(response => this.questions = response.data);
    },
    computed: {
        questionCount(){
            return Math.round((this.questionIndex / this.questions.length)*100)
        },
        isFinished(){
            if(this.questions.length === this.questionIndex + 1){
                this.isFinished = true
            } else {
                this.isFinished = false
            }
            return this.isFinished
        },
        finishLink(){
            return `/finish-quiz/${this.username}`
        }
    },
    methods: {
        prevQuestion() {
            this.questionIndex !== 0 ? this.questionIndex-- : 0;
        },
        nextQuestion() {
            this.questionIndex++;
        },
        resetSelected() {
            for(let option in this.questions[this.questionIndex].options){
                this.questions[this.questionIndex].options[option].isSelect = false
            }
        }
    },
}
</script>

<style scoped>
.Quiz .header{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 36px;
}
.Quiz .questions{
    padding: 24px;
}
.question{
    display: flex;
    flex-direction: column;
    padding-bottom: 24px;
}
.options .option li{
    background: transparent;
    padding: 24px;
    margin: 24px 0;
    border-radius: 12px;
    border: 3px solid var(--c-disable);
    transition: 300ms all;
}
.options .option li:hover{
    transition: 300ms all;
    border-radius: 16px;
    border: 3px solid var(--brand-color);
}
.options .option li.active{
    border: 3px solid var(--brand-color);
    background: var(--c-optionActive);
}
</style>