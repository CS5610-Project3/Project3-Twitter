import * as React from "react";
import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";

function UserCard(props) {
  const user_info = props.card;
  const navigate = useNavigate();
  const [activeUsername, setActiveUsername] = React.useState(null);

  useEffect(() => {
    setActiveUsername(cookie.load("username"));
  }, []);

  const handleUsernameClick = (username) => {
    if (username === activeUsername) {
      navigate("/user-post");
      return;
    }
    navigate(`/${username}`);
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
          <Avatar
            src={user_info.profileImage}
            aria-label="recipe"
            sx={{ width: "3rem", height: "3rem" }}
          ></Avatar>
        }
        title={
          <Box component="span" display="flex" flexDirection="column">
            <Box
              component="span"
              display="flex"
              alignItems="center"
              onClick={() => handleUsernameClick(user_info.username)}
            >
              <Typography
                component="span"
                variant="subtitle1"
                fontWeight="800"
                fontFamily='"Helvetica Neue", Arial, sans-serif'
                sx={{ cursor: "pointer" }}
              >
                {user_info.username}
              </Typography>
              <img
                src="/src/assets/Twitter_Verified_Badge.svg"
                alt="Verified"
                style={{
                  marginLeft: "0.25rem",
                  fill: "blue",
                  width: "1.1rem",
                  height: "auto",
                }}
              />
            </Box>
            <Box component="span" display="flex" alignItems="center">
              <SvgIcon
                color="action"
                fontSize="inherit"
                sx={{ fontSize: "0.7rem" }}
              >
                <ClockIcon />
              </SvgIcon>
              <Box component="span" sx={{ marginLeft: "0.3rem" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.8rem" }}
                >
                  {formatDate(user_info.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
        }
      />
    </Card>
  );
}

export default UserCard;
