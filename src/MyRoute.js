import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import NotFoundComponent from './components/NotFoundComponent'
import MainComponent from './components/MainComponent'
import LotteryCreate from './admin/LotteryCreate'
import LotteryTable from './admin/LotteryTable'
import LotteryEdit from './admin/LotteryEdit'

const MyRoute = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}></Route>
                <Route path='/main' element={<MainComponent />}></Route>
                <Route path='/lottery' element={<LotteryTable />}></Route>
                <Route path='lottery/create' element={<LotteryCreate />}></Route>
                <Route path='lottery/edit/:id' element={<LotteryEdit />}></Route>
                <Route path='*' element={<NotFoundComponent />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoute;