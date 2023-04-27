import * as React from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import UserCard from "../component/UserCard";

export default function UserList(props) {
  const cards = props.usercards;
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
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {cards.map((card, index) => (
            <Grid
              item
              xs={12}
              md={8}
              key={card.id}
              sx={{
                marginBottom: "1rem",
                paddingBottom: "1rem",
                borderBottom:
                  index === cards.length - 1 ? "none" : "1px solid #e0e0e0",
              }}
            >
              <UserCard card={card} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}
