import "./App.css";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterProfessional from "./pages/RegisterProfessional";
import ProfilePage from "./pages/ProfilePage";
import ViewProPage from "./pages/ViewProPage";
import ProfessionalsView from "./pages/ProfessionalsView";
import ProfessionalUpdate from "./pages/ProfessionalUpdate";

import AllProfessionals from "./pages/AllProfessionals";
import UserListPage from "./pages/UserListPage";
import UserUpdateScreen from "./pages/UserUpdateScreen";
import TodoList from "./pages/TodoList";
import PostsList from "./pages/ViewPost";
import PublicPost from "./components/PublicPost";
import PrivatePost from "./components/PrivatePost";
import Khalti from "./pages/Khalti";
import ProtectedRoute from "./components/ProtectedRoutes";
import ProtectedRoutePro from "./components/ProtectedRoutePro";
import ProtectedRouteUser from "./components/ProtectedRouteUser";
import PrivateRoutes from "./utils/PrivateRoute";
import Test from "./pages/test";
import PasswordResetConfirmPage from "./pages/PasswordResetconfirmPage";
import YourBookings from "./pages/yourbooking";
import History from "./pages/History";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <AuthProvider> */}
        <Routes>
          {/* <Route element={<PrivateRoutes />}> */}
          <Route>
            <Route
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
              path="/"
              exact
            />
          </Route>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<Test />} path="/test" />
          <Route element={<RegisterPage />} path="/register" />
          <Route
            element={
              <ProtectedRouteUser>
                <RegisterProfessional />
              </ProtectedRouteUser>
            }
            path="/register-professional"
          />

          <Route element={<YourBookings />} path="/your-booking" />
          <Route element={<History />} path="/history" />

          <Route
            element={
              <ProtectedRoutePro>
                <PublicPost />
              </ProtectedRoutePro>
            }
            path="/public-post"
          />
          <Route
            element={
              <ProtectedRoutePro>
                <PrivatePost />
              </ProtectedRoutePro>
            }
            path="/private-post"
          />

          <Route element={<ProfilePage />} path="/profile" />
          <Route
            element={
              <ProtectedRoutePro>
                <ProfessionalUpdate />
              </ProtectedRoutePro>
            }
            path="/professional/profile"
          />
          <Route element={<ViewProPage />} path="/viewpro" />

          <Route element={<Khalti />} path="/khalti" />

          <Route element={<AllProfessionals />} path="/professionals" />
          <Route element={<TodoList />} path="/todo/" />

          <Route element={<PostsList />} path="/posts/" />
          <Route
            element={<PasswordResetConfirmPage />}
            path="/password-reset-confirm/:uidb64/:token"
          />
          <Route element={<ProfessionalsView />} path="/professionals/:id" />
          <Route element={<UserListPage />} path="/admin/userlist" />
          <Route element={<UserUpdateScreen />} path="/admin/user/:id/edit" />
        </Routes>
        {/* </AuthProvider> */}
      </Router>
    </div>
  );
}

export default App;
