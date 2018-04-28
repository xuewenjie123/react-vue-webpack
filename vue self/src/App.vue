<template>
    <div id="app">
       <message :msg="AsMsg"></message>
    </div>
</template>
<script>
    import MessageInfo from "./components/MessageInfo.vue";
    export default{
        components:{
            "Message":MessageInfo
        },
        methods:{
            AsMsg(){
                return this.$store.getter.getMsg
            }
        }

    }
</script>
<style>

</style>