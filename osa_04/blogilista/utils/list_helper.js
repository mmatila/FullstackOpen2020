const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)

    return likes.length === 0
        ? 0
        : likes.reduce((a, b) => a + b)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const likes = blogs.map(blog => blog.likes)
    const mostLikes = likes.reduce((a, b) => Math.max(a, b))
    const answer = blogs.find(blog => blog.likes === mostLikes)

    return answer
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const blogsByAuthor = _.toPairs(_.groupBy(blogs, blog => blog.author))
    const blogCountByAuthor = blogsByAuthor.map(([author, blogs]) => ({
        author,
        blogs: blogs.length
    })).sort((author1, author2) => author2.blogs - author1.blogs)

    return blogCountByAuthor[0]
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const blogsByAuthor = _.toPairs(_.groupBy(blogs, blog => blog.author))
    const likeCountByAuthor = blogsByAuthor.map(([author, blogs]) => ({
        author,
        likes: blogs.reduce((a, b) => a + b.likes, 0)
    })).sort((author1, author2) => author2.likes - author1.likes)

    return likeCountByAuthor[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}