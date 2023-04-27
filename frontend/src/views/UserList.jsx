import * as React from "react";
import { useMemo } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Post from "../component/Post";
import { PostService } from "../service/PostService";


export default function UserList(props) {
  cards = props.usercards;
  return (
    <Box
    component="main"
    sx={{
      flexGrow: 1,
      py: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Stack spacing={3}>
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
    >
      {cards.slice(0, displayedPosts).map((card, index) => (
        <Grid
          item
          xs={12}
          md={8}
          key={card.id}
          sx={{
            marginBottom: "1rem",
            paddingBottom: "1rem",
            borderBottom:
              index === posts.length - 1 ? "none" : "1px solid #e0e0e0",
          }}
        >
          {/* <Post login={"all"} post={post} /> */}
          <UserCard card={card}/>
        </Grid>
      ))}
    </Grid>

    {noMorePosts ? (
      <Box
        sx={{
          textAlign: "center",
          fontWeight: "300",
          color: "grey",
          fontSize: "small",
        }}
      >
        No more posts to show.
      </Box>
    ) : (
      loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )
    )}
  </Stack>
  </Box>
  );
}
