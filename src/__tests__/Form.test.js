import { screen,render, fireEvent, } from '@testing-library/react'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import Form from '../components/form/Form'

window.ResizeObserver = function () {
    return {
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    };
};

describe('Initial render', () => {
    
    test('renders form correctly', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )
       
        const nameInput = screen.getByPlaceholderText('UserName') 
        expect(nameInput).toBeInTheDocument()
    
        const emailInput = screen.getByPlaceholderText('Email') 
        expect(emailInput).toBeInTheDocument()
    
        const commentInput = screen.getByPlaceholderText('Comment') 
        expect(commentInput).toBeInTheDocument()
    
        const starRatings = screen.getAllByTestId('star')
        expect(starRatings).toHaveLength(5)
    
    })
    
    test('submit btn should be disabled for empty name', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )
    
        const nameInput = screen.getByPlaceholderText('UserName') 
        fireEvent.change(nameInput, {'target': {'value': ''}})
    
        const submitButton = screen.getByRole('button',{name: 'Submit'})
        expect(submitButton).toHaveAttribute('disabled')
        
    })
    
    test('submit btn should be enabled for non-empty name', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )
    
        const nameInput = screen.getByPlaceholderText('UserName') 
        fireEvent.change(nameInput, {'target': {'value': ''}})
    
        const submitButton = screen.getByRole('button',{name: 'Submit'})
        expect(submitButton).toHaveAttribute('disabled')
        
        fireEvent.change(nameInput,{'target': {'value':'Rafael'}})
        expect(submitButton).not.toHaveAttribute('disabled')
        
    })
})

describe('Submitting form with no input', () => {
    test('submitting name with no input should show error', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )
    
        const nameInput = screen.getByPlaceholderText('UserName') 
        fireEvent.change(nameInput, {'target': {'value': ''}})
    
        let nameLabelNull = screen.queryByText(/missing username/i)
        expect(nameLabelNull).not.toBeInTheDocument();
    
        const submitButton = screen.getByRole('button',{name: 'Submit'})
        fireEvent.submit(submitButton)
    
        const nameLabel = screen.getByText(/missing username/)
        expect(nameLabel).toBeInTheDocument()
          
    })

    test('submitting email with no input should show error', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )
    
        const emailInput = screen.getByPlaceholderText('Email') 
        fireEvent.change(emailInput, {'target': {'value': ''}})
    
        let emailLabelNull = screen.queryByText(/missing email/i)
        expect(emailLabelNull).not.toBeInTheDocument();
    
        const submitButton = screen.getByRole('button',{name: 'Submit'})
        fireEvent.submit(submitButton)
    
        const emailLabel = screen.getByText(/missing email/)
        expect(emailLabel).toBeInTheDocument()
          
        
    })
 
    test('submitting comment with no input should show error', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )
    
        const commentInput = screen.getByPlaceholderText('Comment')
        fireEvent.change(commentInput, {'target': {'value': ''}})
    
        let commentLabelNull = screen.queryByText(/missing comment/i)
        expect(commentLabelNull).not.toBeInTheDocument();
    
        const submitButton = screen.getByRole('button',{name: 'Submit'})
        fireEvent.submit(submitButton)
    
        const commentLabel = screen.getByText(/missing comment/)
        expect(commentLabel).toBeInTheDocument()
          
        
    })

})

describe('Submitting form with a input', () => {
    test('submitting name with a input, error should disapear', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )
        
        const nameInput = screen.getByPlaceholderText('UserName') 
        fireEvent.change(nameInput, {'target': {'value': ''}})

        const submitButton = screen.getByRole('button',{name: 'Submit'})
        fireEvent.submit(submitButton)

        let nameLabel = screen.queryByText(/missing username/i)
        expect(nameLabel).toBeInTheDocument();

        fireEvent.change(nameInput, {'target': {'value': 'Rafael'}})
        expect(nameLabel).not.toBeInTheDocument();
    
    })

    test('submitting name with more than 10 characters, error should appear', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )

        const nameInput = screen.getByPlaceholderText('UserName') 
        fireEvent.change(nameInput, {'target': {'value': 'RafaelBubbaMubba'}})

        let commentLabelNull = screen.queryByText(/username must be 10 or less characters/i)
        expect(commentLabelNull).not.toBeInTheDocument();

        const submitButton = screen.getByRole('button',{name: 'Submit'})
        fireEvent.submit(submitButton)

        let nameTenCharLabel = screen.queryByText(/username must be 10 or less characters/i)
        expect(nameTenCharLabel).toBeInTheDocument();
    })

    test('Submitting email with a input, error should disapear', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )
        
        const emailInput = screen.getByPlaceholderText('Email') 
        fireEvent.change(emailInput, {'target': {'value': ''}})

        const submitButton = screen.getByRole('button',{name: 'Submit'})
        fireEvent.submit(submitButton)

        let emailLabel = screen.queryByText(/missing email/i)
        expect(emailLabel).toBeInTheDocument();

        fireEvent.change(emailInput, {'target': {'value': 'yaman@yahoo.com'}})
        expect(emailLabel).not.toBeInTheDocument();
    
    })

    test('submitting comment with a input, error should disapear', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )
        
        const commentInput = screen.getByPlaceholderText('Comment') 
        fireEvent.change(commentInput, {'target': {'value': ''}})

        const submitButton = screen.getByRole('button',{name: 'Submit'})
        fireEvent.submit(submitButton)

        let commentLabel = screen.queryByText(/missing comment/i)
        expect(commentLabel).toBeInTheDocument();

        fireEvent.change(commentInput, {'target': {'value': 'yaman@yahoo.com'}})
        expect(commentLabel).not.toBeInTheDocument();
    
    })
})

describe('Submitting form with invalid email',() => {
    test('submitting email with wrong pattern an error should apear', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )

        const emailInput = screen.getByPlaceholderText('Email') 
        fireEvent.change(emailInput, {'target': {'value': 'rmard.com'}})
        
        let emailInvalidLabelNull = screen.queryByText(/email is invalid/i)
        expect(emailInvalidLabelNull).not.toBeInTheDocument();

        const submitButton = screen.getByRole('button',{name: 'Submit'})
        fireEvent.submit(submitButton)

       let emailInvalidLabel = screen.queryByText(/email is invalid/i)
        expect(emailInvalidLabel).toBeInTheDocument();
    })

    test('submitting email with right pattern the error should disapear', () => {
        render(
            <Provider store={store}>
                <Form/>
            </Provider>
        )

        const emailInput = screen.getByPlaceholderText('Email') 
        fireEvent.change(emailInput, {'target': {'value': 'rmard.com'}})
        
        let emailInvalidLabelNull = screen.queryByText(/email is invalid/i)
        expect(emailInvalidLabelNull).not.toBeInTheDocument();

        const submitButton = screen.getByRole('button',{name: 'Submit'})
        fireEvent.submit(submitButton)

       let emailInvalidLabel = screen.queryByText(/email is invalid/i)
        expect(emailInvalidLabel).toBeInTheDocument();
    })
})







