<template>
    <div class="container">
        <table style="width:100%">
            <tr>
                <th>Key</th>
                <th>Korean</th>
                <th>Japanese</th>
            </tr>
            <tr v-for="data in JSON.parse(platform).sentences">
                <td>{{data.key}}</td>
                <td>{{data.sentence.korean}}</td>
                <td>{{data.sentence.japanese}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: "platform"
    }
</script>

<style scoped>
    table {
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>