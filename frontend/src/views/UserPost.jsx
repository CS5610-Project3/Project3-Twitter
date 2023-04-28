import * as React from "react";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Stack, SvgIcon } from "@mui/material";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Post from "../component/Post";
import cookie from "react-cookies";
import { UserService } from "../service/UserService";
import { TOKEN_COOKIE_NAME } from "../constant";
import Button from "@mui/material/Button";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useNavigate } from "react-router";
import Avatar from "@mui/material/Avatar";
import { PostService } from "../service/PostService";
import AddPostDialog from "../component/AddPostDialog";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function AllPosts() {
  const params = useParams();
  const tempUsername = params.username;
  const [posts, setPosts] = React.useState([]);
  const navigator = useNavigate();
  const isLogin = cookie.load(TOKEN_COOKIE_NAME);
  const cookieUsername = cookie.load("username");
  const [timestamp, setTimestamp] = React.useState(null);
  const [avatartURL, setAvatarURL] = React.useState(null);
  const [addPostDialogOpen, setAddPostDialogOpen] = React.useState(false);
  const [displayedPosts, setDisplayedPosts] = useState(5);
  const [loading, setLoading] = useState(false);

  // 有tempUsername代表是從別人的頁面進來的，這時候要把username設為tempUsername
  // 沒有代表是從自己的頁面進來的，這時候要把cookieUsername設為username

  useEffect(() => {
    if (tempUsername) {
      UserService.getUserInfo(tempUsername)
      .then((res) => {
        const timestamp = res.data.userData.createdAt;
        const formattedTimestamp = formatDate(timestamp);
        setAvatarURL(res.data.userData.profileImage);
        setTimestamp(formattedTimestamp);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      UserService.getUserInfo(cookieUsername)
      .then((res) => {
        const timestamp = res.data.userData.createdAt;
        const formattedTimestamp = formatDate(timestamp);
        setAvatarURL(res.data.userData.profileImage);
        setTimestamp(formattedTimestamp);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, []);

  useEffect(() => {
    if (tempUsername) {
      PostService.getPostsByUser(tempUsername)
      .then((res) => {
        console.log(res);
        setPosts(res.data.posts);
      }) 
      .catch((err) => {
        console.log(err);
      });
    } else {
      PostService.getPostsByUser(cookieUsername)
      .then((res) => {
        console.log(res);
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
    }
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
      }, 500);
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


  function addPost(content) {
    PostService.createPost(username, content)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deletePost(postid) {
    PostService.deletePostById(postid)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function editPost(postid, newContent) {
    PostService.updatePostById(postid, newContent)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  // useEffect(() => {
  //     UserService.getUserInfo(username)
  //       .then((res) => {
  //         const timestamp = res.data.userData.createdAt;
  //         const formattedTimestamp = formatDate(timestamp);
  //         setAvatarURL(res.data.userData.profileImage);
  //         setTimestamp(formattedTimestamp);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     PostService.getPostsByUser(username)
  //       .then((res) => {
  //         console.log(res);
  //         setPosts(res.data.posts);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // }, []);

  const noMorePosts = displayedPosts >= posts.length;

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
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack alignItems="center" direction="row" spacing={2}>
              <Avatar
                alt={!tempUsername ? cookieUsername : tempUsername}
                src={avatartURL}
                sx={{ width: "5rem", height: "5rem" }}
              />
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontSize: "2rem",
                  fontWeight: "600",
                }}
              >
                {!tempUsername ? cookieUsername : tempUsername}
              </Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <SvgIcon color="action" fontSize="small">
                  <CalendarMonthIcon />
                </SvgIcon>
                <Typography
                  color="text.secondary"
                  display="inline"
                  variant="body2"
                >
                  Joined {timestamp}
                </Typography>
              </Stack>
            </Stack>
            <div>
              { !tempUsername ? (
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => setAddPostDialogOpen(true)}
                >
                  New Post
                </Button>
              ) : null}
            </div>
          </Stack>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            {posts.slice(0, displayedPosts).map((post, index) => (
              <Grid
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
                <Post
                  login={!tempUsername ? cookieUsername : tempUsername}
                  post={post}
                  handleDeleteClick={deletePost}
                  handleEditClick={editPost}
                />
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
      </Container>
      <AddPostDialog
        open={addPostDialogOpen}
        handleClose={() => setAddPostDialogOpen(false)}
        handleAddPost={addPost}
      />
    </Box>
  );
}
