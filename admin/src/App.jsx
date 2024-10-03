// import React from "react";
// import {
//   BrowserRouter,
//   Navigate,
//   Route,
//   Routes,
//   useNavigate,
// } from "react-router-dom";
// import { Signup } from "./components/Signup/Signup";
// import { Dashboard } from "./components/Dashboard/Dashboard";
// import { Home } from "./components/Home/Home";
// import { Signin } from "./components/Signin/Signin";

// // export const App = () => {
// //   const adminLoggedIn = localStorage.getItem("adminLoggedIn");
// //   return (
// //     <>
// //       <BrowserRouter>
// //         <Routes>
// //           <Route
// //             path="/"
// //             element={
// //               adminLoggedIn === "false" ? (
// //                 <Home />
// //               ) : (
// //                 <Navigate to="/admin-dashboard" />
// //               )
// //             }
// //           />
// //           <Route
// //             path="/admin-dashboard"
// //             element={
// //               adminLoggedIn === "true" ? <Dashboard /> : <Navigate to="/admin-signin" />
// //             }
// //           />
// //           <Route
// //             path="/admin-signin"
// //             element={
// //               adminLoggedIn === "false" ? <Signin /> : <Navigate to="/admin-dashboard" />
// //             }
// //           />
// //           <Route
// //             path="/admin-signup"
// //             element={
// //               adminLoggedIn === "false" ? <Signup /> : <Navigate to="/admin-dashboard" />
// //             }
// //           />
// //         </Routes>
// //       </BrowserRouter>
// //     </>
// //   );
// // };

// export const App = () => {
//   const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"; // Convert to boolean

//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route
//             path="/"
//             element={
//               !adminLoggedIn ? (
//                 <Home />
//               ) : (
//                 <Navigate to="/admin-dashboard" />
//               )
//             }
//           />
//           <Route
//             path="/admin-dashboard"
//             element={
//               adminLoggedIn ? <Dashboard /> : <Navigate to="/" />
//             }
//           />
//           <Route
//             path="/admin-signin"
//             element={
//               !adminLoggedIn ? <Signin /> : <Navigate to="/admin-dashboard" />
//             }
//           />
//           <Route
//             path="/admin-signup"
//             element={
//               !adminLoggedIn ? <Signup /> : <Navigate to="/admin-dashboard" />
//             }
//           />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup/Signup";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Home } from "./components/Home/Home";
import { Signin } from "./components/Signin/Signin";
import { ProtectedRoute } from "./components/ProtectedRoute"; // New component

export const App = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true"
  );

  // Sync localStorage with state
  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setAdminLoggedIn(loggedIn);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route
          path="/"
          element={
            !adminLoggedIn ? <Home /> : <Navigate to="/admin-dashboard" />
          }
        />
        {/* Protected Route */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute isLoggedIn={adminLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Public Routes (Sign In / Sign Up) */}
        <Route
          path="/admin-signin"
          element={
            !adminLoggedIn ? <Signin /> : <Navigate to="/admin-dashboard" />
          }
        />
        <Route
          path="/admin-signup"
          element={
            !adminLoggedIn ? <Signup /> : <Navigate to="/admin-dashboard" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
