// Semantic UI components
import { Container } from "semantic-ui-react";

// Components
import { EventDashBoard } from "../../features/events/eventDashBoard/EventDashBoard";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import HomePage from "../../features/home/HomePage";
import NavBar from "../../features/nav/NavBar";
import ErrorComponent from "../common/errors/ErrorComponent";
import AccountPage from "../../features/auth/AccountPage";
import LoadingComponent from "./LoadingComponent";
import ProfilePage from "../../features/profiles/profilePage/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import Footer from "../../features/nav/Footer";
import ModalManager from "../common/modals/ModalManager";

// library
import React from "react";
import { Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../store/configureStore";

function App() {
  const { t } = useTranslation();
  const { key } = useLocation();
  const { initialized } = useSelector((state: RootState) => state.async);

  if (!initialized) {
    return <LoadingComponent content={t("profile.loading")} />;
  }

  return (
    <>
      <ModalManager />
      <ToastContainer theme="colored" position="bottom-right" hideProgressBar />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container className="main">
              <Route exact path="/events" component={EventDashBoard} />
              <Route path="/events/:id" component={EventDetailedPage} />
              <PrivateRoute
                path={["/createEvent", "/manage/:id"]}
                component={EventForm}
                key={key}
              />
              <PrivateRoute path="/account" component={AccountPage} />
              <PrivateRoute path="/profile/:id" component={ProfilePage} />
              <Route path="/error" component={ErrorComponent} />
            </Container>
            <Footer />
          </>
        )}
      />
    </>
  );
}

export default App;
