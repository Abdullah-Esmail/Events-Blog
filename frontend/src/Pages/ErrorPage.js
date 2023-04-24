import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

function ErrorPage() {
  const errorObj = useRouteError();
  let title, message;
  if (errorObj.status === 404) {
    title = errorObj.statusText;
    message = errorObj.error.message;
  }
  if (errorObj.status === 500) {
    // title = JSON.parse(errorObj.data).title;
    // message = JSON.parse(errorObj.data).message;
    title = errorObj.data.title; //without parse since we use throw json()
    message = errorObj.data.message;
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p style={{ color: "red" }}>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
