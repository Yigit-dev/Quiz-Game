<template>
    <li :class="username === score.username ? 'active' : null">
        <h2>{{score.username}}</h2>
        <h2>{{score.point}}</h2>
    </li>
</template>
<script>
export default {
    name: "ScoreBoardItem",
    props: {
        score: {
            type: Object,
            required: true
        }
    },
    data(){
        return{
            username: this.$route.params.username,
        }
    }
}
</script>
<style scoped>
    li{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 24px;
        background: var(--c-optionActive);
        border-radius: 16px;
        margin: 16px 0;
    }
    li.active{
        border: 3px solid var(--brand-color);
    }
</style>