import { Grid, Paper, Typography } from "@material-ui/core";

export const ChatItem = ({ message, user }) => {
  const Item = () => (
    <Paper
      style={{
        margin: 20,
        padding: 8,
        marginLeft: 30,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <Typography variant="subtitle2" component="h2">
        {message.author !== user.email ? message.author : "You"}
      </Typography>
      <Typography variant="body1" component="p">
        {message.body}
      </Typography>
      <Typography variant="body2" component="p">
        {message.dateUpdated.toLocaleString()}
      </Typography>
    </Paper>
  );

  return (
    <Grid container direction="row" key={message.index}>
      <Grid item xs={12} md={6}>
        {message.author !== user.email && <Item />}
      </Grid>
      <Grid item xs={12} md={6}>
        {message.author === user.email && <Item />}
      </Grid>
    </Grid>
  );
};
