import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import EditEventPage from "./Pages/EditEventPage";
import EventDetailPage, {
  loader as detailsLoader,
  action as deleteEventAction,
} from "./Pages/EventDetailPage";
import EventRootLayout from "./Pages/EventRootLayout";
import EventPage, { loader as eventsLoader } from "./Pages/EventsPage";
import HomePage from "./Pages/HomePage";
import NewEventPage from "./Pages/NewEventPage";
import RootLayout from "./Pages/RootLayout";
import manipulateEventForm from "./components/formAction";
import NewsletterPage, {
  action as newsletterAction,
} from "./Pages/NewsletterPage";
import { authLoader, checkAuthLoader } from "./components/Util/Auth";
import AuthenticationPage, {
  action as AuthAction,
} from "./Pages/Authentication";
import { logoutAction } from "./Pages/Authentication";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: authLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventRootLayout />,
        children: [
          {
            index: true,
            element: <EventPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventID",
            id: "detail-data-id",
            loader: detailsLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventForm,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventForm,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: AuthAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
