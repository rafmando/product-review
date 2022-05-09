import { useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import '../../css/Graph.css'
ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = () => {
  
  const oneStarArr = useSelector((state) => state.productReducer.oneStarArray)
  const twoStarArr = useSelector((state) => state.productReducer.twoStarArray)
  const threeStarArr = useSelector((state) => state.productReducer.threeStarArray)
  const fourStarArr = useSelector((state) => state.productReducer.fourStarArray)
  const fiveStarArr = useSelector((state) => state.productReducer.fiveStarArray)

  const data = {
    labels: ['1 star', '2 star', '3 star', '4 star', ' 5 star'],
    datasets: [
      {
        label: 'Star ratings',
        data: [oneStarArr.length, twoStarArr.length + 1, threeStarArr.length + 1, fourStarArr.length, fiveStarArr.length + 1],
        backgroundColor: [
          'rgb(12, 17, 66,0.2)',
          'rgb(12, 17, 66,0.4)',
          'rgb(12, 17, 66,0.6)',
          'rgb(12, 17, 66,0.8)',
          'rgb(12, 17, 66,0.9)',
        ],
        borderColor: [
          'rgb(12, 17, 66,0.2)',
          'rgb(12, 17, 66,0.4)',
          'rgb(12, 17, 66,0.6)',
          'rgb(12, 17, 66,0.2)',
          'rgb(12, 17, 66,0.9)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
       <Doughnut data-testid="graph" data={data}/>
    </div>
   
  )
  
}

export default Graph