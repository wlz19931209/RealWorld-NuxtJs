<template>
	<div class="home-page">

		<div class="banner">
			<div class="container">
				<h1 class="logo-font">conduit!</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>

		<div class="container page">
			<div class="row">

				<div class="col-md-9">
					<div class="feed-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item" v-if="user">
								<nuxt-link class="nav-link" exact :class="{active: tab === 'your_feed'}" :to="{name: 'home', query: {tab: 'your_feed'}}">Your Feed</nuxt-link>
							</li>
							<li class="nav-item">
								<nuxt-link class="nav-link" exact :class="{active: tab === 'global_feed'}" :to="{name: 'home', query: {tab: 'global_feed'}}">Global Feed</nuxt-link>
							</li>
							<li class="nav-item" v-show="tag">
								<nuxt-link class="nav-link" exact :class="{active: tab === 'tag'}" :to="{name: 'home', query: {tab: 'tag', tag: tag}}">#{{tag}}</nuxt-link>
							</li>
						</ul>
					</div>

					<template v-if="articles && articles.length > 0">
						<div class="article-preview" :key="article.slug" v-for="article in articles">
							<div class="article-meta">
								<nuxt-link :to="`/profile/${article.author.username}`"><img :src="article.author.image" /></nuxt-link>
								<div class="info">
									<nuxt-link :to="`/profile/${article.author.username}`" class="author">{{article.author.username}}</nuxt-link>
									<span class="date">{{article.createdAt | date('MMM DD,YYYY')}}</span>
								</div>
								<button @click="onFavorite(article)" :disabled="article.disabled" :class="article.favorited && 'active'" class="btn btn-outline-primary btn-sm pull-xs-right">
									<i class="ion-heart"></i> {{article.favoritesCount}}
								</button>
							</div>
							<nuxt-link :to="`/article/${article.slug}`" class="preview-link">
								<h1>{{article.title}}</h1>
								<p>{{article.description}}</p>
								<span>Read more...</span>
							</nuxt-link>
						</div>
					</template>
					<div v-else class="article-preview">
						{{ isLoading ? 'Loading articles...' : 'No articles are here... yet.' }}
					</div>
				</div>

				<div class="col-md-3">
					<div class="sidebar">
						<p>Popular Tags</p>
						<div class="tag-list">
							<nuxt-link v-for="tag in tags" :key="tag" :to="{name: 'home', query:{tag: tag, tab: 'tag'}}" class="tag-pill tag-default">{{tag}}</nuxt-link>
						</div>
					</div>
				</div>

				<!-- 分页列表 -->
				<nav>
					<ul class="pagination">
						<li v-for="item in tatalPage" :key="item" class="page-item" :class="page == item && 'active'">
							<nuxt-link class="page-link" :to="{name: 'home', query:{page: item, tag: tag, tab: tab}}">
								{{item}}
							</nuxt-link>
						</li>
					</ul>
				</nav>
				<!-- /分页列表 -->
			</div>
		</div>

	</div>
</template>
<script>
import {
	getArticles,
	getYourFeed,
	addFavorite,
	deleteFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
export default {
	name: "home",
	// 使用watchQuery监听参数字符串变化来触发asyncData
	watchQuery: ["page", "tag", "tab"],
	async asyncData({ query, store }) {
		let page = parseInt(query.page || 1);
		let tag = query.tag || null;
		let tab = query.tab || "global_feed";
		const limit = 5;
		// const { data } = await getArticles({
		// 	limit,
		// 	offset: (page - 1) * limit,
		// });
		// const { data: tagData} = await getTags()
		// const { articles, articlesCount } = data;
		// const { tags } = tagData.tags;
		// 并行异步任务
		const loadArticles =
			store.state.user && tab === "your_feed" ? getYourFeed : getArticles;
        let isLoading = true
		const [articleRes, tagRes] = await Promise.all([
			loadArticles({
				limit,
				tag,
				offset: (page - 1) * limit,
			}),
			getTags(),
        ]);
        isLoading = false
		const { articles, articlesCount } = articleRes.data;
		const { tags } = tagRes.data;
		articles.forEach((article) => (article.disabled = false));
		return {
			articles,
			articlesCount,
			limit,
			page,
			tags,
			tag,
            tab,
            isLoading,
		};
	},
	computed: {
		tatalPage() {
			return Math.ceil(this.articlesCount / this.limit);
		},
		...mapState(["user"]),
	},
	methods: {
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