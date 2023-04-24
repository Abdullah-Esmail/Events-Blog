import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  const navigation = useNavigation();
  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" && <p>loading...</p>}
        {navigation.state === "idle" && <Outlet />}
      </main>
    </>
  );
}

export default RootLayout;
