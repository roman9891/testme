it('has an input', async () => {
    const dom = await render('/sample webproject/index.html')

    const input = dom.window.document.querySelector('input')

    assert(input)
})

it('shows a success message on valid email', async () => {
    const dom = await render('/sample webproject/index.html')
    const form = dom.window.document.querySelector('form')
    const input = dom.window.document.querySelector('input')

    input.value = 'valid@email'

    form.dispatchEvent(new dom.window.Event('submit'))

    const h1 = dom.window.document.querySelector('h1')

    assert.strictEqual(h1.innerHTML, 'Looks good!')
})

it('shows a failure message on invalid email', async () => {
    const dom = await render('/sample webproject/index.html')
    const form = dom.window.document.querySelector('form')
    const input = dom.window.document.querySelector('input')

    input.value = 'invalidemail'

    form.dispatchEvent(new dom.window.Event('submit'))

    const h1 = dom.window.document.querySelector('h1')

    assert.strictEqual(h1.innerHTML, 'Invalid email')
})