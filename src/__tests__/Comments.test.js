import reducer, { submitComment } from '../redux/productSlice'

var monthNames = ["January", "February", "March", 
"April", "May","June","July", "August", "September", 
"October", "November","December"];

const d = new Date()
const month = monthNames[d.getMonth()]
const date = d.getDate()
const year = d.getFullYear()
const hours = d.getHours()
const minutes = d.getMinutes()

const mockComment = {
    id:  0.8038483947306547,
    name: 'Rafael',
    email: 'raf@yahoo.com',
    profPic: '/assets/profile.jpg',
    stars: 2,
    comment: 'I found this product Ok!!',
    td: `${month} ${date} ${year}, ${hours}:${minutes}`
}
describe('Testing the comments initial state', () => {
    test('renders the 2 default comments', () => {
        expect(reducer(undefined, {})).toEqual(
            {
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
        )
    })
})

describe('Adds comment to comments array', () => {
    test('adds comment to the comments array divides ratings into correct array', () => {
        expect(reducer(undefined, submitComment(mockComment))).toEqual(
            {
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
                    {
                        id:  0.8038483947306547,
                        name: 'Rafael',
                        email: 'raf@yahoo.com',
                        profPic: '/assets/profile.jpg',
                        stars: 2,
                        comment: 'I found this product Ok!!',
                        td: `${month} ${date} ${year}, ${hours}:${minutes}`
                    },
                ],
                oneStarArray : [],
                twoStarArray : [{
                    id:  0.8038483947306547,
                    name: 'Rafael',
                    email: 'raf@yahoo.com',
                    profPic: '/assets/profile.jpg',
                    stars: 2,
                    comment: 'I found this product Ok!!',
                    td: `${month} ${date} ${year}, ${hours}:${minutes}`
                },],
                threeStarArray : [],
                fourStarArray : [],
                fiveStarArray : []
            }
        )
    })
})





