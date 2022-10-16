<template>
    <div class="LoginQuiz">
        <h1>Username</h1>
        <div class="username">
            <input type="text" placeholder="username" v-model="username" @keydown.enter="enterUsername">
            <small v-show="inputError !== ''">{{inputError}}</small>
        </div>
        <button @click="enterUsername">Enter <IconEnter /></button>
    </div>
</template>
<script>
import IconEnter from '../assets/icons/IconEnter.vue';
export default {
    name: "LoginQuiz",
    components: { IconEnter },
    data(){
        return{
            username: "",
            inputError: "",
            scoreboard: []
        }
    },
    created(){
        this.$appAxios.get("/scoreboard")
            .then(res => this.scoreboard = res.data);
    },
    methods: {
        enterUsername(){
            const usernameControl = this.scoreboard.filter(item => item.username === this.username.trim()).length
            if(usernameControl === 0){
                if(this.username.trim() !== ""){
                    this.$emit("username", this.username.trim())
                    this.$emit("activeStep", 2)
                } else {
                    this.inputError = "Please don't leave blank"
                }
            } else {
                this.inputError = "This username already exists";
            }
        }
    }
}
</script>
<style scoped>
.LoginQuiz{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 50vh;
}
.LoginQuiz h1{
    color: #fff;
    margin: 0;
    font-weight: 700;
}

.LoginQuiz button{
    background: var(--c-orange);
    color: #fff;
    font-weight: 700;
    padding: 6px 24px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 3px solid transparent;
    transition: 300ms all;
}
.LoginQuiz button svg{
    margin-left: 6px;
}
.LoginQuiz button:hover{
    transition: 300ms all;
    border: 3px solid #fff;
}
.username {
    position: relative;
}
</style>