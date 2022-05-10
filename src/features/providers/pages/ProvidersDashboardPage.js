import { useEffect, useState } from "react"
import { fetchProviders } from "../../../services/providersAPI"

const ProvidersDashboardPage = () => {
  const [providers, setProviders] = useState({
    results: [],
    total: 0
  })
  useEffect(() => {
    fetchProviders().then(res => setProviders(res))
  }, [])
  return (<div>ProvidersDashboardPage</div>)
}

export default ProvidersDashboardPage