import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Grid,
  CardHeader,
  CardContent,
  Typography,
  InputBase,
  TablePagination,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Avatar,
  Checkbox,
  Button,
  Tooltip,
  Fab,
  CircularProgress,
} from "@material-ui/core";
import Card from "../Card/CustomCard";
import Table from "../Table/CustomTable";
import { ViewModule } from "@material-ui/icons";
import { withStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import UserFormDialog from "../Form/UserFormDialog";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HistoryLogDialog from "../Dialog/HistoryLogDialog";

let CancelToken = null;
let source = null;
const styles = (theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.8),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    marginBottom: "10px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  tableBodyRow: {
    height: "48px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  tableCell: {
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    fontSize: "0.8125rem",
  },
  addButtonCustom: {
    background:
      "linear-gradient(90deg, rgba(248,78,78,1) 0%, rgba(214,65,208,1) 100%)",
    height: "35px",
  },
});

class UserPage extends Component {
  state = {
    rowsPerPage: 5,
    page: 0,
    user: [],
    selected: [],
    searchString: "",
    modal: null,
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              style={{
                fontWeight: "500",
                fontSize: "32px",
                fontStyle: "normal",
                lineHeight: "52px",
                paddingBottom: "10px",
              }}
            >
              List Users
            </Typography>
          </Grid>
          <Grid item>
            <div style={{ display: "flex", flexDirection: "row" }}>
              {/* <Button variant="contained" color="primary" classes={{containedPrimary: classes.addButtonCustom}}>
                ADD USER
              </Button> */}

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={(event) => {
                    this.setState({ searchString: event.target.value });
                    if (
                      event.target.value &&
                      event.target.value.length > 2 &&
                      event.target.value.length < 100
                    ) {
                      setTimeout(
                        (searchString) => {
                          axios
                            .get(
                              "https://dhd-server.herokuapp.com/api/appuser/search",
                              {
                                params: {
                                  searchString: searchString,
                                },
                              }
                            )
                            .then((res) => {
                              this.setState({ user: res.data });
                            });
                        },
                        1000,
                        event.target.value
                      );
                    }
                    if (event.target.value.length === 0) {
                      setTimeout(() => {
                        this.updateUser();
                      }, 1000);
                    }
                  }}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </div>
          </Grid>
        </Grid>

        <Card>
          <CardContent style={{ paddingBottom: 0 }}>
            {this.state.user.data ? (
              <div>
                <Table
                  toolTip={
                    <div>
                      <Tooltip title="Ban">
                        <IconButton
                          aria-label="Ban"
                          onClick={() => {
                            axios
                              .post(
                                "https://dhd-server.herokuapp.com/api/appuser/ban",
                                {
                                  data: this.state.selected,
                                  status: false,
                                }
                              )
                              .then((res) => {
                                if (res.data.success) {
                                  this.setState({ selected: [] });
                                }
                              });
                          }}
                        >
                          <PersonAddDisabledIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Unban" aria-label="unban">
                        <IconButton
                          aria-label="unban"
                          size="small"
                          style={{ marginLeft: "5px" }}
                          onClick={() => {
                            axios
                              .post(
                                "https://dhd-server.herokuapp.com/api/appuser/ban",
                                {
                                  data: this.state.selected,
                                  status: true,
                                }
                              )
                              .then((res) => {
                                if (res.data.success) {
                                  this.setState({ selected: [] });
                                }
                              });
                          }}
                        >
                          <PersonAddIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  }
                  tableHead={[
                    "Name",
                    "Email",
                    "Status",
                    "Active",
                    "Details",
                    "History Log",
                  ]}
                  numSelected={this.state.selected.length}
                  rowCount={
                    this.state.user.data ? this.state.user.data.length : 0
                  }
                  onSelectAllClick={(event) => {
                    if (event.target.checked && this.state.user.data) {
                      const newSelected = this.state.user.data.map(
                        (n) => n._id
                      );
                      this.setState({ selected: newSelected });
                    } else {
                      this.setState({ selected: [] });
                    }
                  }}
                >
                  <TableBody>
                    {this.state.user.data
                      .slice(
                        this.state.page * this.state.rowsPerPage,
                        this.state.page * this.state.rowsPerPage +
                          this.state.rowsPerPage
                      )
                      .map((user) => {
                        return (
                          <TableRow
                            className={classes.tableBodyRow}
                            selected={
                              this.state.selected.indexOf(user._id) !== -1
                            }
                            aria-checked={
                              this.state.selected.indexOf(user._id) !== -1
                            }
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                onChange={(event) => {
                                  const selectedIndex = this.state.selected.indexOf(
                                    user._id
                                  );
                                  let newSelected = [];
                                  if (selectedIndex === -1) {
                                    newSelected = newSelected.concat(
                                      this.state.selected,
                                      user._id
                                    );
                                  } else if (selectedIndex === 0) {
                                    newSelected = newSelected.concat(
                                      this.state.selected.slice(1)
                                    );
                                  } else if (
                                    selectedIndex ===
                                    this.state.selected.length - 1
                                  ) {
                                    newSelected = newSelected.concat(
                                      this.state.selected.slice(0, -1)
                                    );
                                  } else if (selectedIndex > 0) {
                                    newSelected = newSelected.concat(
                                      this.state.selected.slice(
                                        0,
                                        selectedIndex
                                      ),
                                      this.state.selected.slice(
                                        selectedIndex + 1
                                      )
                                    );
                                  }

                                  this.setState({ selected: newSelected });
                                }}
                                checked={
                                  this.state.selected.indexOf(user._id) !== -1
                                }
                              />
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {user.username}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {user.email}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {user.online ? (
                                <Chip
                                  color={"secondary"}
                                  avatar={
                                    <Avatar>
                                      {user.username
                                        .substring(0, 1)
                                        .toUpperCase()}
                                    </Avatar>
                                  }
                                  label={"Online"}
                                />
                              ) : (
                                <Chip
                                  avatar={
                                    <Avatar>
                                      {user.username
                                        .substring(0, 1)
                                        .toUpperCase()}
                                    </Avatar>
                                  }
                                  label={"Offline"}
                                />
                              )}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              {user.active ? (
                                <Chip
                                  color={"secondary"}
                                  avatar={
                                    <Avatar>
                                      {user.username
                                        .substring(0, 1)
                                        .toUpperCase()}
                                    </Avatar>
                                  }
                                  label={"Active"}
                                />
                              ) : (
                                <Chip
                                  avatar={
                                    <Avatar>
                                      {user.username
                                        .substring(0, 1)
                                        .toUpperCase()}
                                    </Avatar>
                                  }
                                  label={"Banned"}
                                />
                              )}
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Tooltip title="Edit" aria-label="edit">
                                <IconButton
                                  aria-label="edit"
                                  size="small"
                                  style={{ marginLeft: "5px" }}
                                  onClick={() => {
                                    this.setState({
                                      modal: (
                                        <UserFormDialog
                                          value={user}
                                          onClose={() => {
                                            this.setState({ modal: null });
                                          }}
                                        />
                                      ),
                                    });
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                              <Tooltip title="Log" aria-label="log">
                                <IconButton
                                  aria-label="log"
                                  size="small"
                                  style={{ marginLeft: "5px" }}
                                  onClick={() => {
                                    this.setState({
                                      modal: (
                                        <HistoryLogDialog
                                          type={"User"}
                                          id={user._id}
                                          onClose={() => {
                                            this.setState({ modal: null });
                                          }}
                                        />
                                      ),
                                    });
                                  }}
                                >
                                  <AssignmentIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 20]}
                  component="div"
                  count={this.state.user ? this.state.user.total : 0}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={(event, newPage) => {
                    this.setState({ page: newPage });
                  }}
                  onChangeRowsPerPage={(event) => {
                    this.setState({
                      rowsPerPage: parseInt(event.target.value, 10),
                      page: 0,
                    });
                  }}
                />
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress style={{ padding: "10px" }} />
              </div>
            )}
          </CardContent>
        </Card>
        {this.state.modal}
      </div>
    );
  }

  updateUser() {
    axios.get("https://dhd-server.herokuapp.com/api/appuser/").then((res) => {
      this.setState({ user: res.data });
    });
  }

  listener() {
    axios
      .get("https://dhd-server.herokuapp.com/api/appuser/listener", {
        cancelToken: source.token,
      })
      .then((res) => {
        if (res.data && this.state.searchString.length === 0) {
          this.updateUser();
          this.listener();
        } else {
          this.listener();
        }
      });
  }

  componentDidMount() {
    CancelToken = axios.CancelToken;
    source = CancelToken.source();
    this.updateUser();
    this.listener();
  }

  componentWillUnmount() {
    source.cancel();
  }
}

UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPage);
