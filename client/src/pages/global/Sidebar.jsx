import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import logomini from "../../assets/images/logomini.png";
import { getCurrentUser } from "../../api";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const activeTab = selected === title;

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: activeTab ? colors.blueAccent[200] : colors.grey[100],
        backgroundColor: activeTab ? colors.primary[500] : colors.primary[400],
        borderRadius: "25px",
        marginRight: "20px",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [userRole, setUserRole] = useState("user");

  getCurrentUser().then((user) => {
    setUserRole(user.role);
    console.log("User role:", userRole);
  });

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu.item.active": {
          color: "#6870fa !important",
        },
        "& .pro-menu-item:hover .pro-item-content": {
          color: `${colors.blueAccent[200]} !important`,
        },
        "& .pro-menu-item:hover .MuiSvgIcon-root": {
          color: `${colors.blueAccent[200]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/*  Logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            syle={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
                mb="10px"
              >
                <img
                  alt="planzo-logo"
                  width="40px"
                  height="40px"
                  src={logomini}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />

                <Typography variant="h3" color={colors.grey[100]}>
                  PLANZO
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={"../../assets/user.png"}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>

              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Ed Roh
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP Fancy Admin
                </Typography>
              </Box>
            </Box>
          )} */}

          {/* MENU ITEMS */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* Dashboard */}
            <Item
              title="Dashboard"
              to="/home"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Data */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Projects"
              to="/project"
              icon={<FolderOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Tasks"
              to="/task"
              icon={<AssignmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Tools */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Tools
            </Typography>
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Notes"
              to="/note"
              icon={<DescriptionOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Documentation"
              to="/documentation"
              icon={<LibraryBooksOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Outlook Email"
              to="/email-inbox"
              icon={<EmailOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Analyze Email (WIP)"
              to="/emailanalysis"
              icon={<EmailOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* ADMIN TOOLS */}
            {userRole === "admin" && (
              <Box>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Admin Tools
                </Typography>
                <Item
                  title="Create User"
                  to="/create-user"
                  icon={<PersonAddOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            )}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
