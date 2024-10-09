const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0
  }

  if (blogs.length === 1) {
    return blogs[0].likes
  }

  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return 0
  }
  const { title, author, likes } = blogs.reduce((mostLikes, blog) => {
    return blog.likes > mostLikes.likes ? blog : mostLikes
  })

  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const authorBlogs = blogs.reduce((authorCount, blog) => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
    return authorCount
  }, {})

  const mostBlogsAuthor = Object.entries(authorBlogs).reduce(
    (max, [author, count]) => {
      return count > max.count ? { author, count } : max
    },
    { author: null, count: 0 }
  )
  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((countLikes, blog) => {
    countLikes[blog.author] = (countLikes[blog.author] || 0) + blog.likes
    return countLikes
  }, {})

  const mostLikesAuthor = Object.entries(authorLikes).reduce(
    (max, [author, likes]) => {
      return likes > max.likes ? { author, likes } : max
    },
    { author: null, likes: 0 }
  )
  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
