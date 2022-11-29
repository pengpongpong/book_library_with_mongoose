const mongoose = require("mongoose")
const { Schema } = mongoose


// const CommentSchema = new Schema({
//     comment: {type: String},
//     bookId: {type: String}
// });

// const Comment = mongoose.model("Comment", CommentSchema);

const BookSchema = new Schema({
    comments: [String],
    title: {type: String, required: true},
    commentcount: {type: Number, default: 0}
});

const Book = mongoose.model("Book", BookSchema);

// exports.Comment = Comment;
exports.Book = Book;