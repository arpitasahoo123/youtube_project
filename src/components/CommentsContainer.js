import React from 'react'

const CommentsContainer = () => {

const commentsData = [
  {
    name : "Arpita",
    text : "Lorem Ipsum",
    replies : []
  },
  {
    name : "Arpita2",
    text : "dummy text",
    replies : [
      {
        name : "Arpita3",
        text : "Lorem Ipsum",
        replies : [
          {
          name : "Arpita5",
          text : "dummy text",
          replies : []
          }
        ]
      },
      {
        name : "Arpita4",
        text : "Lorem Ipsum",
        replies : []
      }
    ]
  }
  
]

const Comment = ({data}) => {
  const {name,text} = data;
    return <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg w-full mb-3">
      <img className="w-12 h-12"
      alt = "user" src="data:image/png;base64,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"/>
      <div className="px-3 w-full">
        <p className="font-bold">{name}</p>
        <p>{text}</p>
      </div>
    </div>
}

const CommentsList = ({ comments }) => {
  return comments.map((comment, i) => (
    <div key={i}>
      <Comment data={comment} />
      {comment.replies && comment.replies.length > 0 && (
        <div className="pl-5 border-l border-black ml-5">
          <CommentsList comments={comment.replies} />
        </div>
      )}
    </div>
  ));
};


  return (
    <div className="p-5 m-2 w-[72%]">
      <h1 className="text-2xl font-bold">Comments:</h1>
      <CommentsList comments={commentsData}/>
    </div>
  )
}

export default CommentsContainer