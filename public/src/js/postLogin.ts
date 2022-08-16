function postLogin () {
    let email = (document.querySelector('[login-email]') as HTMLInputElement).value
    let password = (document.querySelector('[login-password]') as HTMLInputElement).value
    let data = { email, password }
    console.log(JSON.stringify({ payload: data }))
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    }

    try {
        fetch('https://localhost:3000/user/authenticate', options)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } catch (err) {
        console.log(err)
    }
}
