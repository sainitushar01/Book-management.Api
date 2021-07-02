const book=[
    {
     ISBN:"12345Book",
     title:"Happiness",
     pubDate:"2021-07-07",
     language:"en",
     numPage:250,
     author:[1,2],
     publication:[1],
     category:["tech","programming","education","thriller"],
    },
];
const author=[
    {
        id:1,
        name:"Tushar",
        books:["12345Book"],
    },
    {
        id:2,
        name:"Saini",
        books:["12345Books","1223455433"],
    },
];
const publication=[
        {
            id:1,
            name:"writex",
            books:["12345Book"],
        },
        {
            id:2,
            name:"maritex",
            books:[],
        },
];
module.exports={
    book,
    author,
    publication
}


