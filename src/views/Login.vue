<template>
    <v-app>
        <v-snackbar timeout="2000" top right v-model="snackbar.show" :color="snackbar.color">{{snackbar.text}}</v-snackbar>
        <v-card outlined width="500" class="mx-auto" style="margin-top: 20vh">
            <v-card-title style="background-color: #499C54; color: beige">Login</v-card-title>
            <v-card-text>
                <v-card-text>
                    <v-text-field dense label="Username" outlined v-model="user.username"
                                  autofocus prepend-icon="mdi-account"
                    ></v-text-field>
                    <v-text-field v-model="user.password"
                                  @click:append="show_password" prepend-icon="mdi-lock"
                                  :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="eye ? 'text' : 'password'" label="Password" outlined
                                  dense
                    ></v-text-field>
                </v-card-text>
              <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="mx-auto" color="success" @click="login">Kirish</v-btn>
                </v-card-actions>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'Login',
        data() {
            return {
                eye: false,
                user: {
                    username: 'ishonch',
                    password: '123'
                },
                snackbar: {
                    show: false,
                    text: '',
                    color: ''
                }
            }
        },
        methods: {
            ...mapActions('auth',['requestToken']),
            login(){
                this.requestToken(this.user).then(r=>{
                    this.$router.push('/')
                })
            },
            show_password() {
                this.eye = !this.eye
            },
        }
    };
</script>

<style></style>
