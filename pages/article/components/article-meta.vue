<template>
	<div class="article-meta">
		<nuxt-link
			:to="{
				name: 'profile',
				params: {
					username: article.author.username,
				},
			}"
			><img :src="article.author.image"
		/></nuxt-link>
		<div class="info">
			<nuxt-link to="" class="author">{{
				article.author.username
			}}</nuxt-link>
			<span class="date">{{
				article.createdAt | date("MMM DD,YYYY")
			}}</span>
		</div>
		<template v-if="article.author.username !== $store.state.user.username">
			<button
				class="btn btn-sm btn-outline-secondary"
				:class="{ active: article.author.following }"
				:disabled="followDisable"
				@click="updateFollow"
			>
				<i class="ion-plus-round"></i>
				&nbsp;
				{{ article.author.following ? "Unfollow" : "Follow" }}
				{{ article.author.username }}
			</button>
			&nbsp;&nbsp;
			<button
				class="btn btn-sm btn-outline-primary"
				:disabled="disabled"
				:class="{ active: article.favorited }"
				@click="onFavorite"
			>
				<i class="ion-heart"></i>
				&nbsp;
				{{
					article.favorited
						? "Unfavorite Artcile"
						: "Favorite Artcile"
				}}
				<span class="counter">({{ article.favoritesCount }})</span>
			</button>
		</template>
		<template v-else>
			<nuxt-link
				class="btn btn-sm btn-outline-secondary"
				:to="{
					name: 'editArticle',
					params: {
						slug: article.slug,
					},
				}"
			>
				<i class="ion-edit"></i>
				&nbsp; Edit Article
			</nuxt-link>
			&nbsp;&nbsp;
			<button
				class="btn btn-sm btn-outline-danger"
				:disabled="disabled"
				@click="deleteArticle"
			>
				<i class="ion-trash-a"></i>
				&nbsp; Delete Article
			</button>
		</template>
	</div>
</template>
<script>
import {
	setFollow,
	deleteFollow,
	addFavorite,
	deleteFavorite,
	deleteArticle,
} from "@/api/article";
export default {
	name: "articleMeta",
	props: {
		article: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			disabled: false,
			followDisable: false,
		};
	},
	methods: {
		async updateFollow() {
			this.followDisable = true;
			const authorName = this.article.author.username;
			if (this.article.author.following) {
				await deleteFollow(authorName);
				this.article.author.following = false;
			} else {
				await setFollow(authorName);
				this.article.author.following = true;
			}
			this.followDisable = false;
		},
		async onFavorite() {
			this.disabled = true;
			if (this.article.favorited) {
				await deleteFavorite(this.article.slug);
				this.article.favorited = false;
				this.article.favoritesCount -= 1;
			} else {
				await addFavorite(this.article.slug);
				this.article.favorited = true;
				this.article.favoritesCount += 1;
			}
			this.disabled = false;
		},
		async deleteArticle() {
            this.disabled = true;
            await deleteArticle(this.article.slug)
            this.disabled = false;
            this.$router.push({
                name: 'home',
                query: {
                    tab: 'global_feed'
                }
            })
        },
	},
};
</script>
<style lang="scss" scoped>
</style>