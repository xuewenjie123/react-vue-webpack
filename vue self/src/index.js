/**
 * Created by ibm on 2017/6/10.
 */
import Vue from 'vue';
import Vuex from 'vuex';

import getter from './vuex/getter'
import mutation from './vuex/mutation'
import state from './vuex/state'
Vue.use(Vuex)
import App from './App.vue'
var store = new Vuex.Store({
    getter,
    mutation,
    state
    }
)
new Vue({
    el:"#app",
    store,
    render:function(h){
        return h(App)
    }
    // render:h=>(App)   es6语法
})