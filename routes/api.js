/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const Book = require("../model").Book;
// const Comment = require("../model").Comment;

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      Book.find({}, (err, data) => {
        if (err || !data) throw new Error(err)
        else {
          res.json(data)
        };
      });
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;

      if (!title) {
        res.send("missing required field title")
        return;
      };

      const book = new Book({
        title: title
      });

      book.save((err, data) => {
        if (err || !data) throw new Error(err)
        else {
          res.json({
            _id: data.id,
            title: data.title
          })
        };
      });
    })
    
    .delete(function(req, res){
      Book.deleteMany({}, (err, data) => {
        if (err || !data) {
          res.json({
            error: "could not delete"
          });
        }
        else {
          res.send("complete delete successful")
        }
      });
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      Book.findOne({_id: bookid}, (err, data) => {
        if (err || !data) {
          res.send("no book exists")
          return;
        }
        
        res.json({
          _id: data.id,
          title: data.title,
          comments: data.comments
        })
      });
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let newcomment = req.body.comment;

      if (!newcomment) {
        res.send("missing required field comment")
      }
      else {
        Book.findOne({_id: bookid}, (err, bookData) => {
          if (err || !bookData) {
            res.send("no book exists")
          }
          else {
            bookData.comments.push(newcomment);
            bookData.commentcount = bookData.commentcount + 1;
            bookData.save((err, saved) => {
              if (err) throw new Error(err);
              res.json(saved)
            });
          }
        });
      }
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      Book.findOne({_id: bookid}, (err, data) => {
        if (err || !data) {
          res.send("no book exists");
        }
        else {
          data.remove();
          res.send("delete successful")
        }
      });
      //if successful response will be 'delete successful'
    });
};
