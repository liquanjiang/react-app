import service from './index'

const prod = process.env.REACT_APP_CURRENTMODE === 'production'
const serviceURL = prod ? '/master' : '/master'
const apiService = {
    home: () => {
        const url = serviceURL + '/try/ajax/demo_get.php'
        return service.get(url)
    },
}

export default apiService
