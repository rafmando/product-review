import { useState} from 'react'
import { IoIosStarOutline } from "react-icons/io"
import { useDispatch, useSelector } from 'react-redux'
import { submitComment } from '../../redux/productSlice'
import Nav from '../nav/Nav'
import Graph from '../graph/Graph'
import Comments from '../comments/Comments'
import '../../css/Form.css'

const styles = {
    container: {
      display:'flex',
      flexDirection: 'row',
      alignItems:'center',
    }
}

const colors = {
    darkBlue: 'rgb(12, 17, 66)',
    grey: "rgb(190, 190, 190)"
}

const Form = () => {

    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [comment,setComment] = useState('')
    const [error,setError] = useState(false)
    const [starVal,setStarVal] = useState(0)
    const updatedComments = useSelector((state) => state.productReducer.comments)
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const totalComments = updatedComments.length
    const [starHoverVal, setStarHoverVal] = useState(undefined)
    const stars = Array(5).fill(0)
    const dispatch = useDispatch()
    
    const handleStarClick = value =>{setStarVal(value)}
    const handleStarMouseOver = value => setStarHoverVal(value)
    const handleStarMouseLeave = () => setStarHoverVal(undefined)

    const updateName = e => setName(e.target.value)
    const updateEmail = e => setEmail(e.target.value)
    const updateComment = e => setComment(e.target.value)
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const newComment = {
            id: Math.floor((Math.random() * 1000) + 1),
            name: name,
            email: email,
            stars: starVal,
            comment: comment
        }

        if(name.length === 0 || email.length === 0 || starVal === 0 || comment.length === 0 || !regEx.test(email) || name.length > 10)  {
            setError(true)
        } else {
            dispatch(submitComment(newComment))
        } 
    }
  return (
      <div className="form_container">
          <Nav/>
          <div className="form_error_labels">
            {error&&name.length<=0?<label className="form_submit_error">* missing username</label>:""}
            {error&&name.length > 10?<label className="form_submit_error">* username must be 10 or less characters</label>:""}
            {error&&email.length<=0?<label className="form_submit_error">* missing email</label>:""}
            {error&&!regEx.test(email) ?<label className="form_submit_error">* email is invalid</label>:""}
            {error&&starVal<=0?<label className="form_submit_error">* missing star rating</label>:""}
            {error&&comment.length<=0?<label className="form_submit_error">* missing comment</label>:""}
          </div>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form_inputs">
                <input className="form_input" onChange={updateName} type="text" placeholder="UserName"/>
                <input className="form_input" onChange={updateEmail} type="text" placeholder="Email"/>
                <div style={styles.container}>
                    {stars.map((_,index) => {
                        return (
                            <IoIosStarOutline 
                            key={index}
                            size={29}
                            style={{
                                marginRight: 5,
                                cursor: "pointer"
                            }}
                            color={(starHoverVal || starVal) > index ? colors.darkBlue : colors.grey }
                            onClick={() => handleStarClick(index + 1)}
                            onMouseOver={() => handleStarMouseOver(index + 1)}
                            onMouseLeave={handleStarMouseLeave}
                            data-testid='star'
                            />
                        )
                    })}
                </div>
                <p>Please leave a comment</p>
                <textarea className="form_input comment" onChange={updateComment} type="text" placeholder="Comment" size="250"/>
                <input 
                className="form_submit_btn" 
                type="submit" 
                value="Submit" 
                disabled={name === ''}  
                data-testid='submit_btn'
                style={{backgroundColor:(name === '') ? colors.grey : colors.darkBlue}}
                />
            </div>
            <div className="form_graph">
                <Graph/>
            </div>
        </form>
        <div className="comments">
            <div className="comment_labels">
                <p className="total_comments" data-testid="total-comments">Total Comments: {totalComments}</p>
            </div>
            <Comments/>
        </div>
    </div>
  )
}

export default Form