<template>
    <Dialog :key="$route.fullPath" v-model:visible="visible" modal>
        <template #header>
        <div>Вход в систему</div>
        </template>

        <h5>Логин</h5>
        <span class="p-input-icon-left">
        <i class="pi pi-user" style="position: relative; left: 25px" />
        <InputText v-model="login" aria-describedby="username-help" placeholder="Логин"
            type="username"/><br>
        <small v-if="this.$store.state.loginError" id="username-help" class="p-error">
            Проверьте правильность логина и пароля
        </small>
        </span>

        <h5>Пароль</h5>
        <span class="p-input-icon-left">
        <i class="pi pi-lock" style="position: relative; left: 25px"/>
        <InputText v-model="password" aria-describedby="password-help" placeholder="Пароль"
            type="password"/>
        <br>
        <small v-if="this.$store.state.loginError" id="password-help" class="p-error">
            Проверьте правильность логина и пароля
        </small>
        </span>

        <template #footer>
        <Button autofocus icon="pi pi-check" label="Войти" @click="signIn"/>
        </template>
    </Dialog>
</template>

<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

export default {
    name: "LoginDialog",
    components: { Dialog, InputText, Button },
    data() {
        return {
        login: 'administrator',
        password: 'password',
        visible: true,
        modal: true,
        }
    },
    methods: {
        signIn() {
        console.log('login');
        this.$store.dispatch('auth', { login: this.login, password: this.password });
        }
    }
}
</script>

<style scoped>
</style>