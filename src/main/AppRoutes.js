import { Routes, Route } from 'react-router-dom'
import IngredientsDashboardPage from '../features/ingredients/pages/IngredientsDashboardPage'
import AddIngredientPage from '../features/ingredients/pages/AddIngredientPage'
import ViewAllPage from '../features/ingredients/pages/ViewAllPage'
import { LogoutPage } from '../features/authentication/LogoutPage'
import Test from './Test'
import ProvidersDashboardPage from '../features/providers/pages/ProvidersDashboardPage'
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/ingredients">
                <Route path="add" element={<AddIngredientPage />} />
                <Route path="all" element={<ViewAllPage />} />
                <Route path="/ingredients" element={<IngredientsDashboardPage />} />
            </Route>
            <Route path="/providers">
                <Route path="/providers" element={<ProvidersDashboardPage />} />
            </Route>
            <Route path="/" element={<Test />} />
        </Routes>
    )
}

export default AppRoutes
