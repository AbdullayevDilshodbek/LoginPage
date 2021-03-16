import axios from "axios";

const state = {};
const getters = {};
const mutations = {
    SET_USER_DATA: (state, data) => {
        state.data = data;
        localStorage.setItem('user',JSON.stringify(data))
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
    }
};
const actions = {
    requestToken({commit},payload){
        return new Promise((resolve, reject) => {
            axios.post(process.env.VUE_APP_AUTH_URL, {
                grant_type: "password",
                client_id : 2,
                client_secret : process.env.VUE_APP_CLIENT_SECRET,
                username : payload.username,
                password : payload.password
            }).then(response =>{
                commit('SET_USER_DATA',response.data)
                resolve(response);
            }).catch(error =>{
                reject(error)
            })
        })
    },
    logout(){
        localStorage.removeItem('user')
    }
};

 export default {
     namespaced: true,
     state,
     mutations,
     actions,
     getters
 }
