<template>
	<div class="article-page">

		<div class="banner">
			<div class="container">

				<h1>{{article.title}}</h1>

				<article-meta :article="article"></article-meta>

			</div>
		</div>

		<div class="container page">

			<div class="row article-content">
				<div class="col-md-12" v-html="article.body"></div>
			</div>
			<ul class="tag-list">
				<nuxt-link 
                    :to="{name: 'home', query: {tab: 'tag', tag: tag}}"
                    class="tag-default tag-pill tag-outline"
                    v-for="(tag, index) in article.tagList" :key="index"
                >
					{{tag}}
				</nuxt-link>
			</ul>
			<hr />

			<div class="article-actions">
				<article-meta :article="article"></article-meta>
			</div>

			<div class="row">
				<article-comment :article="article"></article-comment>
			</div>

		</div>

	</div>
</template>
<script>
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta";
import ArticleComment from "./components/article-comment";
export default {
	middleware: "user",
	async asyncData({ params }) {
		const md = new MarkdownIt();
		const { data } = await getArticle(params.slug);
		const { article } = data;
		article.body = md.render(article.body);
		return {
			article: article,
		};
	},
	components: {
		ArticleMeta,
		ArticleComment,
	},
	head() {
		return {
			title: `${this.article.title} - RealWorld`,
			meta: [
				{
					hid: "description",
					name: "description",
					content: this.article.description,
				},
			],
		};
	},
};
</script>
<style lang="scss" scoped>
</style>