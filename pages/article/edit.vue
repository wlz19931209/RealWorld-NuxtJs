<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<form @submit.prevent="saveArticle">
						<fieldset :disabled='disabled'>
							<fieldset class="form-group">
								<input
									v-model="articles.title"
									type="text"
									class="form-control form-control-lg"
									placeholder="Article Title"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									v-model="articles.description"
									type="text"
									class="form-control"
									placeholder="What's this article about?"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									v-model="articles.body"
									class="form-control"
									rows="8"
									placeholder="Write your article (in markdown)"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
                                    v-model="tag"
									class="form-control"
									placeholder="Enter tags"
                                    @keypress.enter.prevent="addTag"
								/>
								<div class="tag-list">
									<span
										v-for="(tag, index) in articles.tagList"
                                        :key="index"
										class="tag-default tag-pill ng-binding ng-scope"
									>
										<i
											class="ion-close-round"
											@click="removeTag(tag)"
										></i>
										{{tag}}
									</span>
								</div>
							</fieldset>
							<button
								class="btn btn-lg pull-xs-right btn-primary"
                                :disabled='disabled'
                                type="submit"
							>
								Publish Article
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import MarkdownIt from "markdown-it";
import { getArticle, postArticles, putArticle } from "@/api/article";
export default {
	middleware: "user",
	data() {
		return {
            tag: '',
			articles: {
				body: "",
				description: "",
				tagList: [],
				title: "",
            },
            disabled: false
		};
    },
    async mounted() {
        const {data} = await getArticle(this.$route.params.slug)
        this.articles = data.article
    },
    head() {
        return {
            title: `Editor - ${this.$store.state.user.username}`
        }
    },
    methods: {
        addTag() {
            this.articles.tagList.push(this.tag)
            this.tag = ''
        },
        removeTag(tag) {
            const i = articles.tagList.findIndex(item => item === tag)
            articles.tagList.splice(i,1)
        },
        async saveArticle() {
            this.disabled = true
            const {data} = this.$route.params.slug
                ? await putArticle(this.$route.params.slug, this.articles)
                : await postArticles(this.articles)
            this.disabled = false
            this.$router.push({
                name: 'article',
                params: {
                    slug: data.article.slug
                }
            })
        }
    }
};
</script>
<style lang="scss" scoped>
</style>