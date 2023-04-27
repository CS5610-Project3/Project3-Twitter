import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import badWords from "bad-words";

const MAX_LENGTH = 140;
const filter = new badWords();

export default function AddPostDialog({ open, handleClose, handleAddPost }) {
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = () => {
    // Replace inappropriate words with asterisks
    const cleanContent = content
      .split(" ")
      .map((word) =>
        filter.isProfane(word) ? word.replace(/./g, "*") : word
      )
      .join(" ");
    handleAddPost(cleanContent);
    setContent("");
    handleClose();
  };

  const handleChange = (e) => {
    setContent(e.target.value);
    setCharCount(e.target.value.length);
  };

  const isDisabled = charCount > MAX_LENGTH;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="content"
          label="Content"
          type="text"
          fullWidth
          value={content}
          onChange={handleChange}
          multiline
          rows={8}
          style={{ width: 450 }}
          inputProps={{ maxLength: MAX_LENGTH }}
          helperText={`${charCount}/${MAX_LENGTH}`}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={isDisabled}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
