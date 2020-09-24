import Vue from 'vue'
import Vuex from 'vuex'

import { account } from '@/lib/users/_store/account.module';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        account,
    }

})