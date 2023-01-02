import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// Firebase
import { getCurrentUser } from "../../firebase/firebase.functions";

// Redux
import { setAuth } from "../../redux/auth/auth.reducer";
import { setUser } from "../../redux/user/user.reducer";

// Context
import { useUserAPI } from "../../context/API/userAPI.context";
import { useGlobal } from "../../context/UI/global/global.context";

function AuthSession() {
  const {
    _loading: { showLoading, hideLoading },
  } = useGlobal();
  const { API__getUser } = useUserAPI();
  const { loggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Setting the Previous Page Location
  useEffect(() => {
    const formatedPathname = pathname.toLowerCase();
    const blacklisted = {
      "/": true,
      "/signin": true,
      "/signup": true,
    };
    if (!blacklisted[formatedPathname])
      sessionStorage.setItem("PREVIOUS_PAGE", pathname);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Getting Current User Data
  useEffect(() => {
    if (!loggedIn) {
      if (localStorage.getItem("SESSION")) showLoading("Checking Status...");

      getCurrentUser((user) => {
        if (user) {
          const { accessToken, uid: fbID, email, providerData } = user;
          API__getUser(accessToken, fbID, (API__data, API__error) => {
            if (API__error) {
              navigate("/signin");
            } else {
              const { firstName, lastName, projects } = API__data.user;
              dispatch(
                setAuth({
                  fbID,
                  email,
                  accessToken,
                  provider: providerData[0].providerId,
                })
              );
              dispatch(setUser({ firstName, lastName, projects }));

              const previousPage = sessionStorage.getItem("PREVIOUS_PAGE");
              navigate(previousPage ? previousPage : "/");
            }
          });
        }

        hideLoading();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return <></>;
}

export default AuthSession;
