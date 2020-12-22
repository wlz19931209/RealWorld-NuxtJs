<template>
	<div class="auth-page">
		<div class="container page">
			<div class="row">

				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">
						{{ isLogin ? 'Sign in' : 'Sign up'}}
					</h1>
					<p class="text-xs-center">
						<nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
						<nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
					</p>

					<ul class="error-messages" v-show="errors">
						<template v-for="(err, key) in errors">
							<li v-for="(e, i) of err" :key="key + i">{{key}} - {{e}}</li>
						</template>
					</ul>

					<form @submit.prevent="onSubmit">
						<fieldset class="form-group" v-if="!isLogin">
							<input required v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
						</fieldset>
						<fieldset class="form-group">
							<input required v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email">
						</fieldset>
						<fieldset class="form-group">
							<input required v-model="user.password" minlength="8" class="form-control form-control-lg" type="password" placeholder="Password">
						</fieldset>
						<button class="btn btn-lg btn-primary pull-xs-right">
							{{ isLogin ? 'Sign in' : 'Sign up'}}
						</button>
					</form>
				</div>

			</div>
		</div>
	</div>
</template>
<script>
import { login, register } from "@/api/user";
// js-cookie 只能用于客户端 使用process.client判断是否为客户端环境
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
    name: "login",
    middleware: 'nouser',
	computed: {
		isLogin() {
			return this.$route.name === "login";
		},
	},
	data() {
		return {
			user: {
				username: "",
				email: "",
				password: "",
			},
			errors: null,
		};
	},
	mounted() {
		// 搞点假数据 免得填
		// this.user = {
		// 	username: "wlz",
		// 	email: "jake@jake1.jake",
		// 	password: "jakejake",
		// };
	},
	methods: {
		async onSubmit() {
			try {
				this.errors = null;
				const { data } = this.isLogin
					? await login({
							user: this.user,
					  })
					: await register({
							user: this.user,
					  });
                this.$store.commit("setUser", data.user);
				// 数据持久化
				Cookie.set("user", data.user);
				this.$router.push("/");
			} catch (e) {
				this.errors = e.response.data.errors;
			}
		},
	},
};
</script>
<style lang="scss" scoped>
</style>