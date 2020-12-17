<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>

					<form>
						<fieldset>
							<fieldset class="form-group">
								<input
									class="form-control"
									v-model="currentUser.image"
									type="text"
									placeholder="URL of profile picture"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									v-model="currentUser.username"
									type="text"
									placeholder="Your Name"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control form-control-lg"
									v-model="currentUser.bio"
									rows="8"
									placeholder="Short bio about you"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									v-model="currentUser.email"
									type="text"
									placeholder="Email"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="password"
									placeholder="Password"
								/>
							</fieldset>
							<button
								class="btn btn-lg btn-primary pull-xs-right"
								@click.prevent="saveUser"
							>
								Update Settings
							</button>
						</fieldset>
					</form>
					<hr />
					<button
						class="btn btn-outline-danger"
						@click="logout"
					>
						Or click here to logout.
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import { updateUser } from "@/api/user";
export default {
	middleware: "user",
	head() {
		return {
			title: `${this.currentUser.username} - RealWorld`,
		};
	},
	data() {
		return {
			currentUser: {},
		};
	},
	mounted() {
		this.currentUser = JSON.parse(Cookie.get("user"));
	},
	methods: {
		async saveUser() {
			const { data } = await updateUser(this.currentUser);
			this.$store.commit("setUser", data.user);
            Cookie.set("user", data.user);
            this.$router.push({
                name: 'profile',
                params: {
                    username: data.user.username
                }
            })
        },
        logout() {
            this.$store.commit('logout')
            Cookie.remove("user")
            this.$router.push({
                name: 'home',
                query: {
                    tab: 'global_feed'
                }
            })
        }
	},
};
</script>
<style lang="scss" scoped>
</style>