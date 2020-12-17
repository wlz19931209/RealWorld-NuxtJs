<template>
	<div class="profile-page">
		<div class="user-info">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<img :src="profile.image" class="user-img" />
						<h4>{{ profile.username }}</h4>
						<p>
							{{ profile.bio }}
						</p>
						<button
                            v-if="profile.username !== $store.state.user.username"
							class="btn btn-sm btn-outline-secondary"
							:class="{ active: profile.following }"
							:disabled="followDisable"
							@click="updateFollow"
						>
							<i class="ion-plus-round"></i>
							&nbsp;
							{{ profile.following ? "Unfollow" : "Follow" }}
							{{ profile.username }}
						</button>
						<nuxt-link
							class="btn btn-sm btn-outline-secondary action-btn"
							v-else
							to="/setting"
						>
							<i class="ion-gear-a"></i> Edit Profile Settings
						</nuxt-link>
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<div class="articles-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{ active: tab === 'my_article' }"
									exact
									:to="{
										name: 'profile',
										query: {
											tab: 'my_article',
										},
									}"
									>My Articles</nuxt-link
								>
							</li>
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{
										active: tab === 'favorited_article',
									}"
									exact
									:to="{
										name: 'profile',
										query: {
											tab: 'favorited_article',
										},
									}"
									>Favorited Articles</nuxt-link
								>
							</li>
						</ul>
					</div>

					<template v-if="articles && articles.length > 0">
						<div
							class="article-preview"
							v-for="article in articles"
							:key="article.slug"
						>
							<div class="article-meta">
								<nuxt-link to=""
									><img :src="article.author.image"
								/></nuxt-link>
								<div class="info">
									<nuxt-link to="" class="author">{{
										article.author.username
									}}</nuxt-link>
									<span class="date">{{
										article.createdAt | date("MMM DD, YYYY")
									}}</span>
								</div>
								<button
									class="btn btn-outline-primary btn-sm pull-xs-right"
									:class="{ active: article.favorited }"
									:disabled="article.disabled"
									@click="onFavorite(article)"
								>
									<i class="ion-heart"></i>
									{{ article.favoritesCount }}
								</button>
							</div>
							<nuxt-link
								:to="{
									name: article,
									params: {
										slug: article.slug,
									},
								}"
								class="preview-link"
							>
								<h1>{{ article.title }}</h1>
								<p>{{ article.description }}</p>
								<span>Read more...</span>
							</nuxt-link>
						</div>
					</template>

					<div v-else class="article-preview">
						{{
							isLoading
								? "Loading articles..."
								: "No articles are here... yet."
						}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getProfile } from "@/api/profile";
import {
	getArticles,
	deleteFollow,
	setFollow,
	deleteFavorite,
	addFavorite,
} from "@/api/article";
export default {
	name: "profile",
	middleware: "user",
	watchQuery: ["tab"],
	async asyncData({ params, query }) {
		let tab = query.tab || "my_article";
		const username = params.username;
		let serachData = {
			limit: 5,
			offset: 0,
		};
		tab === "my_article"
			? (serachData.author = username)
			: (serachData.favorited = username);
		let isLoading = true;
		const [profileRes, articleRes] = await Promise.all([
			getProfile(username),
			getArticles(serachData),
		]);
		const { profile } = profileRes.data;
		const { articles } = articleRes.data;
		articles.forEach((article) => (article.disabled = false));
		isLoading = false;
		return {
			profile,
			articles,
			tab,
			isLoading,
		};
	},
	data() {
		return {
			followDisable: false,
		};
	},
	methods: {
		async updateFollow() {
			this.followDisable = true;
			const authorName = this.profile.username;
			if (this.profile.following) {
				await deleteFollow(authorName);
				this.profile.following = false;
			} else {
				await setFollow(authorName);
				this.profile.following = true;
			}
			this.followDisable = false;
		},
		async onFavorite(article) {
			article.disabled = true;
			if (article.favorited) {
				await deleteFavorite(article.slug);
				article.favorited = false;
				article.favoritesCount -= 1;
			} else {
				await addFavorite(article.slug);
				article.favorited = true;
				article.favoritesCount += 1;
			}
			article.disabled = false;
		},
	},
};
</script>
<style lang="scss" scoped>
</style>