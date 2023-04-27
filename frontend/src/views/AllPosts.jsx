import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Post from "../component/Post";
import { PostService } from "../service/PostService";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import UserList from "./UserList.jsx";

export default function UserPost() {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const [getUserClicked, setGetUserClicked] = useState(false);

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

  const handleScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom && !loading) {
      setLoading(true);
      setTimeout(() => {
        setDisplayedPosts(displayedPosts + 10);
      }, 500); // add a delay of 1 second
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  useEffect(() => {
    setLoading(false);
  }, [displayedPosts]);

  const handleSearch = () => {
    setSearchClicked(true);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchClicked(false);
    setGetUserClicked(false);
  };

  const handleGetUser = () => {
    setGetUserClicked(true);
  };

  const filteredPosts = useMemo(() => {
    if (!searchClicked || searchTerm === "") {
      return posts;
    }
    return posts.filter((post) =>
      post.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchClicked, searchTerm, posts]);

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
        <Box sx={{ mb: 3 }}>
          <TextField
            id="search"
            label="Search User"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            sx={{ width: "50%", mr: "1rem" }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ mr: "1rem" }}
          >
            Search
          </Button>
          <Button
            variant="contained"
            sx={{ mr: "1rem" }}
            onClick={handleClearSearch}
          >
            Go Back
          </Button>
          <Link
            to="/user-list"
            sx={{ textDecoration: "none", marginLeft: "1rem" }}
          >
            <Button variant="contained" onClick={handleGetUser}>
              Get Users
            </Button>
          </Link>
        </Box>
        {getUserClicked ? (
          <UserList posts={[1, 2, 3]} />
        ) : (
          <Stack spacing={3}>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
            >
              {filteredPosts.slice(0, displayedPosts).map((post, index) => (
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

            {loading && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            )}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
