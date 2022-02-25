// Load the full build.
const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

module.exports = {
    dummy,
}
//Returns the total sum of likes in all of the blog posts
const totalLikes = (arrayOfBlogs) => {
    const reducer = (sum, currentValue) => {
        return sum + currentValue.likes
    }

    return arrayOfBlogs.reduce(reducer, 0)
}
//The function finds out which blog has most likes.
const favoriteBlog = (arrayOfBlogs) => {
    const reducer = (prev, current) => {
        return prev.likes > current.likes ? prev : current
    }

    return arrayOfBlogs.reduce(reducer, 0)
}

const mostBlogs = (listWithAlot) => {
    var tagArray = _.map(listWithAlot, 'author') //create an array of tag values from the object array. From here you get the count!! It need the result from chain
    let mostBlogsAuthor = _.chain(tagArray)
        .countBy()
        .toPairs()
        .max(_.last)
        .head()
        .value()

    const countOccurrences = tagArray.reduce(
        (a, v) => (v === mostBlogsAuthor ? a + 1 : a),
        0
    )

    return { author: mostBlogsAuthor, blogs: countOccurrences }
}
//Returns the author, whose blog posts have the largest amount of likes.
const mostLikes = (arrayOfBlogs)=>{


    const authorsNames = [...new Set(arrayOfBlogs.map(blog => blog.author))]


    let arrayOfAuthorsAndTotalLikes = []

    authorsNames.forEach(currentAuthor => 
    {
        let arrayOfBlogsByAuthor = arrayOfBlogs.filter(blog => blog.author === currentAuthor)

        const reducer = (sum, currentValue) => {
            return sum + currentValue.likes
        }

        const  totalLikes = arrayOfBlogsByAuthor.reduce(reducer, 0)
  
        arrayOfAuthorsAndTotalLikes.push({author: currentAuthor, likes:totalLikes} )
    }
    
    
    )
    

 
    const reducer = (prev, current) => {
        return prev.likes > current.likes ? prev : current
    }

    return  arrayOfAuthorsAndTotalLikes.reduce(reducer, 0)

    

}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
