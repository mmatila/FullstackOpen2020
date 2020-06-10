import Blog from './Blog'
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, cleanup } from '@testing-library/react'

afterEach(cleanup)

describe('Blog component', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Some random author',
        url: 'www.url.com',
        likes: 0,
        user: {
            username: 'mmatila',
            name: 'Manu Matila'
        }
    }

    let component

    test('renders title and author', async () => {

        component = render(
            <Blog blog={blog} />
        )

        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container).toHaveTextContent(blog.author)
    })

    test('clicking button twice triggers two function calls', async () => {

        const mockHandler = jest.fn()

        component = render(
            <Blog blog={blog} updateLikes={mockHandler} />
        )

        const button = component.getByText('like')
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(0)
    })

    test('does not render likes and url by default', async () => {

        component = render(
            <Blog blog={blog} />
        )

        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', async () => {

        component = render(
            <Blog blog={blog} />
        )

        const button = component.getByText('show more')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })
})