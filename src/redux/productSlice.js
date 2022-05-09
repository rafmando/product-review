import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  comments: [
    {
      id: 1,
      name: 'Jan',
      email: 'jan@yahoo.com',
      profPic: '/assets/jan.jpg',
      stars: 5,
      comment: 'I found this product AMAZING!!',
      td: `May 5 2018, 01:30`
    },
    {
      id: 2,
      name: 'Ruby',
      email: 'ruby@yahoo.com',
      profPic: '/assets/ruby.jpg',
      stars: 2,
      comment: 'I found the product hard the use and had a difficult time navigating through the user interfce. Its a big no from me ):',
      td: `May 5 2018, 01:30`
    },
    {
      id: 3,
      name: 'Fabio',
      email: 'fabio@yahoo.com',
      profPic: '/assets/fabio.jpg',
      stars: 3,
      comment: 'I found the product good however it could be better ):',
      td: `Aug 2 2022, 02:30`
    },
  ],
  oneStarArray : [],
  twoStarArray : [],
  threeStarArray : [],
  fourStarArray : [],
  fiveStarArray : []
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    submitComment: (state,action) => {
      var monthNames = ["January", "February", "March", 
      "April", "May","June","July", "August", "September", 
      "October", "November","December"];

      const d = new Date()
      const month = monthNames[d.getMonth()]
      const date = d.getDate()
      const year = d.getFullYear()
      const hours = d.getHours()
      const minutes = d.getMinutes()
      
      const comment = {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        profPic: '/assets/profile.jpg',
        stars: action.payload.stars,
        comment: action.payload.comment,
        td: `${month} ${date} ${year}, ${hours}:${minutes}`
      }

      if(comment.stars === 1) {
        state.oneStarArray.push(comment)
      } else if(comment.stars === 2) {
        state.twoStarArray.push(comment)
      } else if(comment.stars === 3) {
        state.threeStarArray.push(comment)
      } else if(comment.stars === 4) {
        state.fourStarArray.push(comment)
      } else if(comment.stars === 5) {
        state.fiveStarArray.push(comment)
      } else {
        return comment
      }
      state.comments.push(comment)
    },
  }
});

export const {submitComment} = productSlice.actions

export default productSlice.reducer