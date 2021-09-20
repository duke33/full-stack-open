// Load the full build.
const _ = require('lodash');



const dummy = (blogs) => {
    return 1
}


const totalLikes = (arrayOfBlogs) => {

    const reducer = (sum, currentValue) => {
        return sum + currentValue.likes
    }

    return arrayOfBlogs.reduce(reducer, 0)

}

const favoriteBlog = (arrayOfBlogs) => {

    const reducer = (prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    }

    return arrayOfBlogs.reduce(reducer, 0)
}

const mostBlogs = (arrayOfBlogs) => {

    var tagArray = _.map(listWithAlot, 'author'); //create an array of tag values from the object array. From here you get the count!! It need the result from chain
    console.log('tag ARRAY', tagArray);
    let mostBlogsAuthor = _.chain(tagArray).countBy().toPairs().max(_.last).head().value()

    const countOccurrences = tagArray.reduce((a, v) => (v === mostBlogsAuthor ? a + 1 : a), 0);

    return { author: mostBlogsAuthor, blogs: countOccurrences }

}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}