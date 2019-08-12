import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import apiService from './service/apiService'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App/>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
console.log(process.env.NODE_ENV)
console.log(process.env.REACT_APP_PUBLIC_URL)
const param = {
    key: 1,
}
apiService.home().then((res: any) => {
    console.log(res)
}).catch((res: any) => {

})
