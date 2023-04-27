import * as React from "react";
import {useEffect} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {Stack} from "@mui/material";
import Grid from "@mui/material/Grid";
import Post from "../component/Post";
import {PostService} from "../service/PostService";

export default function UserPost() {
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    PostService.getAllPosts()
      .then((res) => {
        console.log(res);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      <Container maxWidth="md">
        <Stack spacing={3}>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {posts.map((post, index) => (
              <Grid
                item
                xs={12}
                md={8}
                key={post.id}
                sx={{
                  marginBottom: "1rem",
                  paddingBottom: "1rem",
                  borderBottom:
                    index === posts.length - 1 ? "none" : "1px solid #e0e0e0",
                }}
              >
                <Post login={"all"} post={post} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
