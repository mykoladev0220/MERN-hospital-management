import React, {lazy} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/Home';

const Layout = lazy(() => import('../containers/Layout'))

export default function routes() {
    return (
        <BrowserRouter>
        <Routes>
          {/* Place new routes over this */}
          <Route path="/app" exact component={Layout} />
          <Route path="/home" exact element={<Home />} />
          {/* If you have an index page, you can remothis Redirect */}
          <Route path="/" element={<Navigate replace to="/app" />} />
        </Routes>
      </BrowserRouter>
    )
}
