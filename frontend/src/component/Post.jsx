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
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function Post(props) {
  const post_info = props.post;
  const [content, setContent] = useState(post_info.content);
  const [timestamp, setTimestamp] = useState(post_info.updatedAt);

  const [editMode, setEditMode] = useState(false);

  const formatRelativeTime = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  function editContent() {
    setEditMode(true);
  }

  function editSave(){
    setEditMode(false);
    props.handleEditClick(post_info._id, content);
  }

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader
        title={post_info.username}
        subheader={
          <Box component="span" display="flex" alignItems="center">
            <SvgIcon color="action" fontSize="small">
              <ClockIcon />
            </SvgIcon>
            <Box component="span" sx={{ marginLeft: "0.5rem" }}>
              {formatRelativeTime(timestamp)}
            </Box>
          </Box>
        }
      />
      <CardContent>
        {editMode ? (
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            rows={5}
            style={{ width: "100%" }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            {content}
          </Typography>
        )}
      </CardContent>
      {props.login === "user" && (
        <CardActions disableSpacing>
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
            onClick={() => props.handleDeleteClick(post_info._id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}
