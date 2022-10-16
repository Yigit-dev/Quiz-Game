<template>
    <li @click="selectAnswer(option)" :class="option.isSelect ? 'active': null">{{option.option}}</li>
</template>
<script>
export default {
    name: 'QuizItem',
    props: ["option", "resetSelected", "questionIndex"],
    data(){
        return{
            isSelect: false
        }
    },
    methods: {
        selectAnswer(option){
            this.resetSelected()
            this.$appAxios.patch(`/quiz/${this.questionIndex+1}`, {
                "selectedOptionId": option.id
            }).then(res => res)
            
            this.option.isSelect === true ? this.option.isSelect = false : this.option.isSelect = true
        }
    },
}
</script>