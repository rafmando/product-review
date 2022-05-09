import Comment from '../comments/Comment'
import { useSelector } from 'react-redux'
import '../../css/Comments.css'

const Comments = () => {
  const updatedComments = useSelector((state) => state.productReducer.comments)
  
  return (
    <div className="comments_container">
        {updatedComments.map((comment) => {
          return <Comment key={comment.id} comment={comment}/>
        })}
    </div>
  )
}

export default Comments