import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { UserService } from "../service/UserService";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";

export default function Post(props) {
  const post_info = props.post;
  const navigate = useNavigate();
  const [content, setContent] = useState(post_info.content);
  const [timestamp, setTimestamp] = useState(post_info.updatedAt);
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
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

  useEffect(() => {
    UserService.getUserInfo(post_info.username).then((res) => {
      setProfileImage(res.data.userData.profileImage);
    });
  }, []);

  const formatRelativeTime = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  function editSave() {
    setEditMode(false);
    props.handleEditClick(post_info._id, content);
  }

  function handleDeleteClick() {
    if (window.confirm("Are you sure you want to delete this post?")) {
      props.handleDeleteClick(post_info._id);
    }
  }

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        avatar={
          <Avatar
            src={profileImage}
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
              onClick={() => handleUsernameClick(post_info.username)}
            >
              <Typography
                component="span"
                variant="subtitle1"
                fontWeight="800"
                fontFamily='"Helvetica Neue", Arial, sans-serif'
                sx={{ cursor: "pointer" }}
              >
                {post_info.username}
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
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                  {formatRelativeTime(timestamp)}
                </Typography>
              </Box>
            </Box>
          </Box>
        }
      />

      <CardContent sx={{ marginBottom: editMode || props.login === activeUsername ? "0px" : "20px" }}>
        {editMode ? (
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={5}
            style={{ width: "100%" }}
          />
        ) : (
          <Typography
            variant="body2"
            color="text.primary"
            sx={{
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              marginLeft: "2rem",
              fontSize: "0.9rem",
            }}
          >
            {content}
          </Typography>
        )}
      </CardContent>
      {props.login === activeUsername && (
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "auto",
          }}
        >
          {editMode ? (
            <IconButton aria-label="save" onClick={editSave}>
              <SaveIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="edit" onClick={() => setEditMode(true)}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="delete"
            onClick={handleDeleteClick}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}
