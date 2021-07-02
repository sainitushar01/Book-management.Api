const express=require("express");
//database
const database=require("./database");
//initialization
const booky=express();
//configuration
booky.use(express.json());
/*  
Route           /
Description     Get all books
Access          Public
parameter       None
Methods         GET
 */
booky.get("/",(req,res)=>{
return res.json({books:database.book});
});
/*  
Route           /is
Description     Get specific books
Access          Public
parameter       isbn
Methods         GET
 */
booky.get("/is/:isbn",(req,res)=>{
    const getSpecificBook = database.book.filter(
        (book) => book.ISBN===req.params.isbn
        );
        if(getSpecificBook.length===0){
            return res.json({
                error:`No book found for the ISBN of ${req.params.isbn}`,
        });
        }
    return res.json({book:getSpecificBook});
    });
    /*  
Route           /c
Description     Get specific books based on category
Access          Public
parameter       category
Methods         GET
 */
booky.get("/c/:category",(req,res)=>{
   const getSpecificBook=database.book.filter((book)=>
book.category.includes(req.params.category)
);
if(getSpecificBook.length===0){
    return res.json({
        error:`No book found for the category of ${req.params.category}`,
});
}
return res.json({book:getSpecificBook});
});
    /*  
Route           /l
Description     Get specific books based on language
Access          Public
parameter       language
Methods         GET
 */
booky.get("/l/:language",(req,res)=>{
    const getSpecificBook=database.book.filter((book)=>
 book.language===req.params.language
 );
 if(getSpecificBook.length===0){
     return res.json({
         error:`No book found for the language of ${req.params.language}`,
 });
 }
 return res.json({book:getSpecificBook});
 });
      /*  
Route           /author
Description     Get all authors
Access          Public
parameter       None
Methods         GET
 */
booky.get("/author",(req,res)=>{
 return res.json({authors:database.author});
});
      /*  
Route           /author/id
Description     Get specific authors
Access          Public
parameter       id
Methods         GET
 */
booky.get("/author/id/:id",(req,res)=>{
    const getSpecificAuthor = database.author.filter(
        (author) => author.id===parseInt(req.params.id)
        );
        if(getSpecificAuthor.length===0){
            return res.json({
                error:`No author found for the ID of ${req.params.id}`,
        });
        }
    return res.json({book:getSpecificAuthor});
    });

/*  
Route           /author/books
Description     Get specific authors based on book
Access          Public
parameter       book
Methods         GET
*/  
booky.get("/author/books/:book",(req,res)=>{
  const getSpecificAuthor=database.author.filter((author)=>author.books.includes(req.params.book))
  if(getSpecificAuthor.length===0)
  {
      return res.json({error:`No author found with book ${req.params.book}`});
  }
  return res.json({author:getSpecificAuthor});
});
      /*  
Route           /publication
Description     Get all authors
Access          Public
parameter       None
Methods         GET
 */
booky.get("/publication",(req,res)=>{
return res.json({publication:database.publication});
});
      /*  
Route           /publication/id
Description     Get specific publication
Access          Public
parameter       id
Methods         GET
 */
booky.get("/publication/id/:id",(req,res)=>{
    const getSpecificPub = database.publication.filter(
        (publication) => publication.id===parseInt(req.params.id)
        );
        if(getSpecificPub.length===0){
            return res.json({
                error:`No publication found for the ID of ${req.params.id}`,
        });
        }
    return res.json({book:getSpecificPub});
    });
    /*  
Route           /author/books
Description     Get specific publications based on book
Access          Public
parameter      isbn
Methods         GET
*/  
booky.get("/publication/books/:isbn",(req,res)=>{
    const getSpecificPub=database.publication.filter((publication)=>publication.books.includes(req.params.isbn))
    if(getSpecificPub.length===0)
    {
        return res.json({error:`No Publication found with book ${req.params.isbn}`});
    }
    return res.json({publication:getSpecificPub});
  });
    /*  
Route          /book/add
Description     Add new book
Access          Public
parameter     NONE
Methods       POST
*/ 
booky.post("/book/add",(req,res)=>{
const { newBook }=req.body;
database.book.push(newBook);
return res.json({books:database.book});
});
//to perform other requests other than get ,we use http client
 /*  
Route           /author/add
Description     add new author
Access          Public
parameter      none
Methods        Post
*/ 
booky.post("/author/add",(req,res)=>{
const{ newAuthor }=req.body;
database.author.push(newAuthor);
return res.json({authors:database.author});
});
 /*  
Route           /publication/add
Description     add new publication
Access          Public
parameter      none
Methods        Post
*/ 
booky.post("/publication/add",(req,res)=>{
    const{ newPublication }=req.body;
    database.publication.push(newPublication);
    return res.json({publications:database.publication});
});
 /*  
Route           /book/update/title
Description     update book title
Access          Public
parameter      none
Methods       PUT
*/ 
booky.put("/book/update/title/:isbn",(req,res)=>{
  database.book.forEach((book)=>{
       if(book.ISBN===req.params.isbn)
       {
           book.title=req.body.newBookTitle;
           return;
       }
   });
   return res.json({ books: database.book });
});
 /*  
Route           /book/update/author
Description     update/add new author for a book
Access          Public
parameter      none
Methods       PUT
*/ 
booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{
// update book database
database.book.forEach((book)=>{
    if(book.ISBN===req.params.isbn)
    {
        return book.author.push(parseInt(req.params.authorId));
    }
});
//update author database
database.author.forEach((author)=>{
    if(author.id===parseInt(req.params.authorId))
    {
        return author.books.push(req.params.isbn);
    }
});
return res.json({books:database.book,author:database.author});
});

 /*  
Route           /author/update/name
Description     update/add new author for a book
Access          Public
parameter      none
Methods       PUT
*/ 
booky.put("/author/update/name/:id",(req,res)=>{
    database.author.forEach((author)=>{
         if(author.id===parseInt(req.params.id))
         {
             author.name=req.body.newAuthorName;
             return;
         }
     });
     return res.json({ author: database.author });
  });
 /*  
Route           /publication/update/name
Description     update publication for a book
Access          Public
parameter      none
Methods       PUT
*/ 
booky.put("/publication/update/name/:id",(req,res)=>{
    database.publication.forEach((publication)=>{
         if(publication.id===parseInt(req.params.id))
         {
             publication.name=req.body.newPublicationName;
             return;
         }
     });
     return res.json({ publication: database.publication });
  });
   /*  
Route           /publication/update/book
Description     update/add new book for a publication
Access          Public
parameter      isbn
Methods       PUT
*/ 
booky.put("/publication/update/book/:isbn",(req,res)=>{
    // update publication database
    database.publication.forEach((publication)=>{
        if(publication.id===req.body.pubId)
        {
            return publication.books.push(req.params.isbn);
        }
    });
    //update book database
    database.book.forEach((book)=>{
        if(book.ISBN===req.params.isbn)
        {
            book.publication=req.body.pubId;
            return;
        }
    });
    return res.json({publications:database.publication,books:database.book,message:"Sucessfully updated"});
    });
booky.listen(3000,()=>console.log("server is running🧨🧨"));