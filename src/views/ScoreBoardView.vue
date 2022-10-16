<template>
    <div class="ScoreBoard">
        <div class="header">
            <router-link to="/"><button>restart</button></router-link>
            <h1>ScoreBoard</h1>
            <div>
                <button v-if="sort === 'asc' || sort == ''" class="icon" @click="sortBy('point')"><IconArrowDown /></button>
                <button v-else-if="sort === 'desc'" class="icon" @click="sortByReverse('point')"><IconArrowUp /></button>
            </div>
        </div>
        <div class="ScoreBoardList">
            <template v-for="score in scoreboard">
                <ScoreBoardItem :score="score"/>
            </template>
        </div>
    </div>
</template>
<script>
import ScoreBoardItem from '../components/ScoreBoardItem.vue'
import IconArrowUp from '../assets/icons/IconArrowUp.vue';
import IconArrowDown from '../assets/icons/IconArrowDown.vue';
export default {
    name: "ScoreBoardView",
    components: { ScoreBoardItem, IconArrowUp, IconArrowDown },
    data() {
        return { 
            scoreboard: [],
            sort: ""
        };
    },
    created() {
        this.getScoreBoard();
    },
    methods: {
        getScoreBoard() {
            this.$appAxios.get("/scoreboard").then(res => {
                this.scoreboard = res.data;
            });
        },
        sortBy(prop){
            this.scoreboard = this.scoreboard.sort((a,b) => a[prop] > b[prop] ? -1 : 1)
            this.sort = "desc"
        },
        sortByReverse(prop){
            this.scoreboard = this.scoreboard.sort((a,b) => a[prop] > b[prop] ? 1 : -1)
            this.sort = "asc"
        }
    },
}
</script>

<style scoped>
.ScoreBoard{
    width: 100%;
    padding: 8px 24px;
}
.ScoreBoard .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 24px;
}
.ScoreBoardList{
    width: 100%;
    max-height: 400px;
    padding: 0 24px;
    overflow-y: scroll;
}
.ScoreBoardList::-webkit-scrollbar {
    display: none;
}
.ScoreBoard button{
    margin: 0;
}
</style>