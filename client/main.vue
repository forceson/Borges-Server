<template>
    <div class="container">
        <h1>Borges</h1>
        <ol>
            <li v-for="data in JSON.parse(platforms)">
                <a v-bind:href="`/platforms/${data._id}`">{{ data.name }}</a>
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: "main",
    }
</script>

<style scoped>

</style>