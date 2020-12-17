<template>
	<div class="col-xs-12 col-md-8 offset-md-2">

		<form class="card comment-form">
			<div class="card-block">
				<textarea class="form-control" v-model="comment.comment.body" placeholder="Write a comment..." rows="3"></textarea>
			</div>
			<div class="card-footer">
				<img :src="user.image" class="comment-author-img" />
				<button class="btn btn-sm btn-primary" @click.prevent='setComment'>
					Post Comment
				</button>
			</div>
		</form>

		<div class="card" v-for="comment in comments" :key="comment.id">
			<div class="card-block">
				<p class="card-text">{{comment.body}}</p>
			</div>
			<div class="card-footer">
				<nuxt-link :to="{
                    name: 'profile',
                    params: {
                        username: comment.author.username
                    }
                }" class="comment-author">
					<img :src="comment.author.image" class="comment-author-img" />
				</nuxt-link>
				&nbsp;
				<nuxt-link :to="{
                    name: 'profile',
                    params: {
                        username: comment.author.username
                    }
                }" class="comment-author">{{comment.author.username}}</nuxt-link>
				<span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
				<span class="mod-options" v-if="comment.author.username == user.username">
					<!-- <i class="ion-edit"></i> -->
					<i class="ion-trash-a" @click="delComment(comment)"></i>
				</span>
			</div>
		</div>

	</div>
</template>
<script>
import { getComments, setComment, deleteComment } from "@/api/article";
import { mapState } from "vuex";
export default {
	name: "ArticleComment",
	props: {
		article: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			comments: [],
			comment: {
				comment: {
					body: "",
				},
			},
		};
	},
	async mounted() {
		const { data } = await getComments(this.article.slug);
		this.comments = data.comments;
	},
	computed: {
		...mapState(["user"]),
	},
	methods: {
		async setComment() {
			const { data } = await setComment(this.article.slug, this.comment);
            this.comments.unshift(data.comment);
            this.comment.comment.body = ''
		},
		async delComment(comment) {
			await deleteComment(this.article.slug, comment.id);
			const i = this.comments.findIndex((item) => item.id === comment.id);
			this.comments.splice(i, 1);
		},
	},
};
</script>
<style lang="scss" scoped>
</style>