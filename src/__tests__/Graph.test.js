import { screen,render, fireEvent, } from '@testing-library/react'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import Graph from '../components/graph/Graph'

window.ResizeObserver = function () {
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
};

describe('Graph appears onload', () => {
    test('should render the graph correctly', () => {
        render(
            <Provider store={store}>
                <Graph/>
            </Provider>
        )

        const graphContainer = screen.getByTestId('graph')
        expect(graphContainer).toBeInTheDocument()

    })
})