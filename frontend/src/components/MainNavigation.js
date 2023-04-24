import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import style from "./MainNavigation.module.css";
import NewsletterSignup from "./NewsletterSignup";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <>
      <header className={style.header}>
        <nav>
          <ul className={style.list}>
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) => {
                  return (
                    isActive ? style.action : undefined,
                    isPending ? style.pending : undefined
                  );
                }}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className={({ isActive, isPending }) => {
                  return (
                    isActive ? style.action : undefined,
                    isPending ? style.pending : undefined
                  );
                }}
              >
                Events
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events/new"
                className={({ isActive, isPending }) => {
                  return (
                    isActive ? style.action : undefined,
                    isPending ? style.pending : undefined
                  );
                }}
              >
                New Event
              </NavLink>
            </li>
            {!token && (
              <li>
                <NavLink
                  to="/auth?mode=login"
                  className={({ isActive, isPending }) => {
                    return (
                      isActive ? style.action : undefined,
                      isPending ? style.pending : undefined
                    );
                  }}
                >
                  Signin
                </NavLink>
              </li>
            )}
            {token && (
              <li>
                <Form action="/logout" method="post">
                  <button>Logout</button>
                </Form>
              </li>
            )}
          </ul>
        </nav>
        <NewsletterSignup />
      </header>
    </>
  );
}

export default MainNavigation;
