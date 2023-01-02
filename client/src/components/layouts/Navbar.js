import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Images & Icons
import Logo from "../../assets/logo.png";
import {
  AppstoreOutlined,
  TeamOutlined,
  MessageOutlined,
  SettingTwoTone,
  LogoutOutlined,
  FolderOpenOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

// Firebase
import { signOutUser } from "../../firebase/firebase.functions";

// Redux
import { resetAuth } from "../../redux/auth/auth.reducer";
import { resetUser } from "../../redux/user/user.reducer";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);
  const links = [
    {
      label: "My Dashboard",
      icon: <AppstoreOutlined className="icon" />,
      path: "/",
    },
    {
      label: "Projects",
      icon: <FolderOpenOutlined className="icon" />,
      path: "/projects",
    },
    {
      label: "Teams",
      icon: <TeamOutlined className="icon" />,
      path: "/teams",
    },
    {
      label: "Messages",
      icon: <MessageOutlined className="icon" />,
      path: "/messages",
    },
    {
      label: "Settings",
      icon: <SettingTwoTone className="icon" />,
      path: "/settings",
    },
    {
      label: "About",
      icon: <InfoCircleOutlined className="icon" />,
      path: "/about",
    },
  ];

  return (
    <>
      {loggedIn && (
        <div className="navbar center-vertical">
          <main>
            <div className="navbar__header row">
              <img src={Logo} alt="TimeLine Logo" />
              <h1>
                Time<span>Line</span>
              </h1>
            </div>

            {/* Links */}
            {links.map((link) => {
              const { label, icon, path } = link;

              return (
                <NavLink key={label} to={path} className="link row">
                  {icon}
                  <p>{label}</p>
                </NavLink>
              );
            })}
          </main>

          {/* Logout */}
          <button
            type="button"
            className="logout row"
            onClick={() =>
              signOutUser(() => {
                dispatch(resetUser());
                dispatch(resetAuth());
                navigate("/signin");
              })
            }
          >
            <LogoutOutlined className="icon" />
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;
