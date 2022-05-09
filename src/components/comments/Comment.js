const Comment = ({comment}) => {
  return (
    <div className="comment_post" data-testid="comment">
        <img className="comment_post_img" src={comment.profPic} alt='Profile-pic'/>
        <div className="comment_post_textarea">
            <div className="comment_post_headings">
                <h2>{comment.name}</h2>
                <h2 className="comment_post_td">{comment.td}</h2>
                <h2 className="rating">Rating: {comment.stars} stars</h2>
            </div>
            <p>{comment.comment}</p>
        </div>
    </div>
  )
}

export default Comment