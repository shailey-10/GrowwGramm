import { Routes, Route, useLocation } from "react-router-dom";
import NewsFeed from "../views/News Feed/NewsFeed";
import SearchFeed from "../views/SearchFeed/SearchFeed";
import UserPage from "../views/User/UserPage";
import ErrorPage from "../views/Error/ErrorPage";
import { SavedFeed } from "../views/SavedPage/SavedFeed";
import { AnimatePresence } from "framer-motion";

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<NewsFeed />} />
        <Route path="/search" element={<SearchFeed />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/recentuser" element={<UserPage />} />
        <Route path="/saved" element={<SavedFeed />} />
        <Route
          path="*"
          element={
            <ErrorPage error="Seems like you are lost, go to home page!" />
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
