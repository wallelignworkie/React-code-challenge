import SkipSize from "@/components/skipSize/SkipSize";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRoute: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SkipSize />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
