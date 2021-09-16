const arrayOfpersons = [
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
]

const newSearch = "ar"

const searchResultsArray = arrayOfpersons.filter((person) =>
    person.name.toLowerCase().includes(newSearch.toLowerCase())
);


console.log('searchResultsArray', searchResultsArray);