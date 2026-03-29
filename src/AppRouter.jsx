import { Routes, Route } from 'react-router-dom'
import Home from './Home.jsx'
import OwnerApp from './OwnerApp.jsx'
import StaffApp from './StaffApp.jsx'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/"       element={<Home />} />
      <Route path="/owner"  element={<OwnerApp />} />
      <Route path="/staff"  element={<StaffApp />} />
    </Routes>
  )
}
