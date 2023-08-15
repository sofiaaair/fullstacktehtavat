const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const summarize = (sum, object) => {
        return sum + object.likes
    }
    return blogs.reduce(summarize, 0)
}

const favoriteBlog = (blogs) => {
    const bigger = (number, object) => {
        if (number > object.likes) {
            return number
        } else {
            return object.likes
        }
    }
    return blogs.reduce(bigger, 0)
}

const mostBlogs = (blogs) => {
    const authors = blogs.reduce((person, info) => {
        person[info.author] = person[info.author] || []
        person[info.author].push({
            title: info.title,
        })
        return person
    }, {})

    const mostblogs = Object.keys(authors).reduce(
        (previous, key) => {
            if (previous.blogs < authors[key].length) {
                return { author: key, blogs: authors[key].length }
            } else {
                return { author: previous.author, blogs: previous.blogs }
            }
        },
        { author: '', blogs: 0 }
    )

    return mostblogs
}

const mostLikes = (blogs) => {
    const authors = blogs.reduce((person, info) => {
        person[info.author] = person[info.author] || []
        person[info.author].push({
            likes: info.likes,
        })
        return person
    }, {})

    const mostlikes = Object.keys(authors).reduce(
        (previous, key) => {
            const likeObject = totalLikes(authors[key])
            if (previous.likes < likeObject) {
                return { author: key, likes: likeObject }
            } else {
                return { author: previous.author, likes: previous.likes }
            }
        },
        { author: '', likes: 0 }
    )

    return mostlikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
