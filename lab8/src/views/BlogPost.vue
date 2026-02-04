<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <router-link to="/blog">Back to Blog List</router-link>
  </div>
</template>

<script>
export default {
  name: 'BlogPostView',
  data() {
    return {
      posts: [
        { id: 1, title: 'hello', content: 'oioioi' },
        { id: 2, title: 'hi', content: 'loopy' },
        { id: 3, title: 'halo', content: 'oioioivang' }
      ],
      post: {}
    }
  },
  created() {
    const postId = parseInt(this.$route.params.id)
    this.post = this.posts.find(p => p.id === postId) || {}
  }
}
</script>