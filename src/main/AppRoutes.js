import { Routes, Route } from 'react-router-dom'
import IngredientsDashboardPage from '../features/ingredients/pages/IngredientsDashboardPage'
import IngredientCreatePage from '../features/ingredients/pages/IngredientCreatePage'
import ViewAllPage from '../features/ingredients/pages/ViewAllPage'
import { LogoutPage } from '../features/authentication/LogoutPage'
import ProvidersDashboardPage from '../features/providers/pages/ProvidersDashboardPage'
import ViewIngredientPage from '../features/ingredients/pages/ViewIngredientPage'
import TabPackaging from '../features/ingredients/pages/TabPackaging'
import TabBasicInformation from '../features/ingredients/pages/TabBasicInformation'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/ingredients">
                <Route path="add" element={<IngredientCreatePage />} />
                <Route path="all" element={<ViewAllPage />} />
                <Route path="view">
                    <Route path=":ingredientId" element={<ViewIngredientPage />}>
                        <Route index element={<TabBasicInformation />} />
                        <Route path="packaging" element={<TabPackaging />} />
                    </Route>
                </Route>
                <Route
                    path="/ingredients"
                    element={<IngredientsDashboardPage />}
                />
            </Route>
            <Route path="/providers">
                <Route path="/providers" element={<ProvidersDashboardPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes
