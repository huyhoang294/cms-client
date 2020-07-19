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
  Checkbox
} from "@material-ui/core";
import Card from "../Card/CustomCard";
import Table from "../Table/CustomTable";
import { ViewModule } from "@material-ui/icons";
import { withStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

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
});

class StationPage extends Component {
  state = { rowsPerPage: 5, page: 0, station: [], selected: []  };
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
              List Stations
            </Typography>
          </Grid>
          <Grid item>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div></div>
          </Grid>
        </Grid>

        <Card>
          <CardContent style={{ paddingBottom: 0 }}>
            <Table 
            tableHead={["No.", "Location", "Place Name", "Address", "Price", "Status"]}
            numSelected={this.state.selected.length}
              rowCount={
                this.state.station.data ? this.state.station.data.length : 0
              }
              onSelectAllClick={(event) => {
                if (event.target.checked && this.state.station.data) {
                  const newSelected = this.state.station.data.map((n) => n._id);
                  this.setState({ selected: newSelected });
                } else {
                  this.setState({ selected: [] });
                }
              }}
            >
              <TableBody>
                {this.state.station.data
                  ? this.state.station.data
                      .slice(
                        this.state.page * this.state.rowsPerPage,
                        this.state.page * this.state.rowsPerPage +
                          this.state.rowsPerPage
                      )
                      .map((station, key) => {
                        return (
                          <TableRow 
                          key={key} 
                          className={classes.tableBodyRow}
                          selected={
                            this.state.selected.indexOf(station._id) !== -1
                          }
                          aria-checked={
                            this.state.selected.indexOf(station._id) !== -1
                          }
                          >
                              <TableCell padding="checkbox">
                              <Checkbox
                                onChange={(event) => {
                                  const selectedIndex = this.state.selected.indexOf(
                                    station._id
                                  );
                                  let newSelected = [];
                                  if (selectedIndex === -1) {
                                    newSelected = newSelected.concat(
                                      this.state.selected,
                                      station._id
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

                                  this.setState({selected: newSelected})
                                }}
                                checked={
                                  this.state.selected.indexOf(station._id) !==
                                  -1
                                }
                              />
                            </TableCell>
                            <TableCell className={classes.tableCell} key={key}>
                              {station.no}
                            </TableCell>
                            <TableCell className={classes.tableCell} key={key}>
                              {station.location}
                            </TableCell>
                            <TableCell className={classes.tableCell} key={key}>
                              {station.placename}
                            </TableCell>
                            <TableCell className={classes.tableCell} key={key}>
                              {station.address}
                            </TableCell>
                            <TableCell className={classes.tableCell} key={key}>
                            <Chip
                                color={"secondary"}
                                avatar={<Avatar>D</Avatar>}
                                label={station.price_id.price_oneDay + "vnd"}
                                style={{marginRight: "5px"}}
                              />
                              <Chip
                                color={"secondary"}
                                avatar={<Avatar>H</Avatar>}
                                label={station.price_id.price_oneHour + "vnd"}
                                style={{marginRight: "5px"}}
                              />
                              <Chip
                                color={"secondary"}
                                avatar={<Avatar>M</Avatar>}
                                label={station.price_id.price_oneMonth + "vnd"}
                                style={{marginRight: "5px"}}
                              />
                            </TableCell>
                            <TableCell className={classes.tableCell} key={key}>
                              {station.active ? <Chip
                                color={"primary"}
                                label={"Stable"}
                              /> : <Chip
                              color={"secondary"}
                              label={"Maintenance"}
                            />}
                            </TableCell>
                          </TableRow>
                        );
                      })
                  : null}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={this.state.station ? this.state.station.total : 0}
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
          </CardContent>
        </Card>
      </div>
    );
  }

  componentDidMount() {
    axios.get("/api/dashboard/station").then((res) => {
      this.setState({ station: res.data });
    });
  }
}

StationPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StationPage);
