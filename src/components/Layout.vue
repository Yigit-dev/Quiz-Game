<template>    
<div class="container">
    <div class="header">
        <h1>Quiz Game</h1>
    </div>
    <main>
        <slot />
    </main>
    <footer>
        <p>Yigit Cakmak</p>
    </footer>
</div>
    
</template>

<script>
export default {
    name: 'Layout'
}
</script>

<style scoped>
.container{
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 8vh 0;
}
.header h1{
    font-family: 'Nabla', cursive;
    font-size: 10vh;
    text-align: center;
}
main{
    position: relative;
    background: #35254a;
    width: 60%;
    min-height: 50vh;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-clip: padding-box;
    border: 4px solid transparent;
}
main::before{
    content: '';
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: -1;
    margin: -4px;
    border-radius: inherit;
    background: linear-gradient(61.63deg, rgb(45, 66, 255) 16%, rgb(156, 99, 250) 24%, rgb(45, 66, 255) 54%, rgb(156, 99, 250) 62%, rgb(45, 66, 255) 88%);
    background-size: 400% 400%;
    animation: gradient 6s ease infinite;
}

@media screen and (max-width: 768px){
    .container{
        padding: 0;
    }
    main{
        width: 96%;
    }
}
</style>