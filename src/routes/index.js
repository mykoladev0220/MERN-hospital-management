import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard'))

const routes = [
    {
      path: '/dashboard', // the url
      component: Dashboard, // view rendered
    },
  ]
  
  export default routes