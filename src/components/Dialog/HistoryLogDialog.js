import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import DesktopDialog from "../Dialog/DesktopDialog";
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

const styles = (theme) => ({
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

class HistoryLogDialog extends Component {
  state = {
    rowsPerPageAuth: 5,
    pageAuth: 0,
    rowsPerPageOpen: 5,
    pageOpen: 0,
    rowsPerPageOrder: 5,
    pageOrder: 0,
    result: [],
  };
  render() {
    const { classes, onClose, type, id } = this.props;

    return (
      <DesktopDialog
        title={"History Log"}
        customCancelButt={"Close"}
        disabledSave={true}
        onClose={onClose}
        fullWidth={true}
      >
        {this.state.result.data ? (
          <div>
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
                      fontSize: "24px",
                      fontStyle: "normal",
                      lineHeight: "52px",
                      paddingBottom: "10px",
                    }}
                  >
                    Authorize Logs
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>

              <Card>
                <CardContent style={{ paddingBottom: 0 }}>
                  {this.state.result.data ? (
                    <div>
                      <Table
                        disableCheckBox={true}
                        tableHead={[
                          "Owner",
                          "Authorize for",
                          "Cabinet Number",
                          "Station Number",
                          "Limit",
                          "Authorize Time",
                        ]}
                        rowCount={
                          this.state.result.data.authLogs
                            ? this.state.result.data.authLogs.length
                            : 0
                        }
                      >
                        <TableBody>
                          {this.state.result.data.authLogs
                            .slice(
                              this.state.pageAuth * this.state.rowsPerPageAuth,
                              this.state.pageAuth * this.state.rowsPerPageAuth +
                                this.state.rowsPerPageAuth
                            )
                            .map((authLog) => {
                              return (
                                <TableRow className={classes.tableBodyRow}>
                                  <TableCell className={classes.tableCell}>
                                    {authLog.owner_id.email}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {authLog.authorize_id.email}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {authLog.box_id.no}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {authLog.station_id.placename +
                                      "-" +
                                      authLog.station_id.location +
                                      "-" +
                                      authLog.station_id.no}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {authLog.limit}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {authLog.authorize_time}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>

                      <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={
                          this.state.result.data.authLogs
                            ? this.state.result.data.authLogs.length
                            : 0
                        }
                        rowsPerPage={this.state.rowsPerPageAuth}
                        page={this.state.pageAuth}
                        onChangePage={(event, newPage) => {
                          this.setState({ pageAuth: newPage });
                        }}
                        onChangeRowsPerPage={(event) => {
                          this.setState({
                            rowsPerPageAuth: parseInt(event.target.value, 10),
                            pageAuth: 0,
                          });
                        }}
                      />
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>

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
                      fontSize: "24px",
                      fontStyle: "normal",
                      lineHeight: "52px",
                      paddingBottom: "10px",
                    }}
                  >
                    Open Logs
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>

              <Card>
                <CardContent style={{ paddingBottom: 0 }}>
                  {this.state.result.data ? (
                    <div>
                      <Table
                        disableCheckBox={true}
                        tableHead={[
                          "User",
                          "Cabinet Number",
                          "Station Number",
                          "Open Time",
                        ]}
                        rowCount={
                          this.state.result.data.openLogs
                            ? this.state.result.data.openLogs.length
                            : 0
                        }
                      >
                        <TableBody>
                          {this.state.result.data.openLogs
                            .slice(
                              this.state.pageOpen * this.state.rowsPerPageOpen,
                              this.state.pageOpen * this.state.rowsPerPageOpen +
                                this.state.rowsPerPageOpen
                            )
                            .map((openLog) => {
                              return (
                                <TableRow className={classes.tableBodyRow}>
                                  <TableCell className={classes.tableCell}>
                                    {openLog.user_id.email}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {openLog.box_id.no}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {openLog.station_id.placename +
                                      "-" +
                                      openLog.station_id.location +
                                      "-" +
                                      openLog.station_id.no}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {openLog.open_time}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>

                      <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={
                          this.state.result.data.openLogs
                            ? this.state.result.data.openLogs.length
                            : 0
                        }
                        rowsPerPage={this.state.rowsPerPageOpen}
                        page={this.state.pageOpen}
                        onChangePage={(event, newPage) => {
                          this.setState({ pageOpen: newPage });
                        }}
                        onChangeRowsPerPage={(event) => {
                          this.setState({
                            rowsPerPageOpen: parseInt(event.target.value, 10),
                            pageOpen: 0,
                          });
                        }}
                      />
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>

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
                      fontSize: "24px",
                      fontStyle: "normal",
                      lineHeight: "52px",
                      paddingBottom: "10px",
                    }}
                  >
                    Order Logs
                  </Typography>
                </Grid>
                <Grid item></Grid>
              </Grid>

              <Card>
                <CardContent style={{ paddingBottom: 0 }}>
                  {this.state.result.data ? (
                    <div>
                      <Table
                        disableCheckBox={true}
                        tableHead={[
                          "User",
                          "Cabinet Number",
                          "Station Number",
                          "Start",
                          "End",
                          "Open Time",
                        ]}
                        rowCount={
                          this.state.result.data.orderLogs
                            ? this.state.result.data.orderLogs.length
                            : 0
                        }
                      >
                        <TableBody>
                          {this.state.result.data.orderLogs
                            .slice(
                              this.state.pageOrder *
                                this.state.rowsPerPageOrder,
                              this.state.pageOrder *
                                this.state.rowsPerPageOrder +
                                this.state.rowsPerPageOrder
                            )
                            .map((orderLog) => {
                              return (
                                <TableRow className={classes.tableBodyRow}>
                                  <TableCell className={classes.tableCell}>
                                    {orderLog.user_id.email}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {orderLog.box_id.no}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {orderLog.station_id.placename +
                                      "-" +
                                      orderLog.station_id.location +
                                      "-" +
                                      orderLog.station_id.no}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {orderLog.start_time}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {orderLog.end_time}
                                  </TableCell>
                                  <TableCell className={classes.tableCell}>
                                    {orderLog.order_time}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>

                      <TablePagination
                        rowsPerPageOptions={[5, 10, 20]}
                        component="div"
                        count={
                          this.state.result.data.orderLogs
                            ? this.state.result.data.orderLogs.length
                            : 0
                        }
                        rowsPerPage={this.state.rowsPerPageOrder}
                        page={this.state.pageOrder}
                        onChangePage={(event, newPage) => {
                          this.setState({ pageOrder: newPage });
                        }}
                        onChangeRowsPerPage={(event) => {
                          this.setState({
                            rowsPerPageOrder: parseInt(event.target.value, 10),
                            pageOrder: 0,
                          });
                        }}
                      />
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress style={{ padding: "10px" }} />
          </div>
        )}
      </DesktopDialog>
    );
  }

  componentDidMount() {
    if (this.props.type === "User") {
      axios
        .get("https://dhd-server.herokuapp.com/api/appuser/log", {
          params: {
            userId: this.props.id,
          },
        })
        .then((res) => {
          this.setState({ result: res.data });
        });
    }
    if (this.props.type === "Cabinet") {
      axios
        .get("https://dhd-server.herokuapp.com/api/cabinet/log", {
          params: {
            cabinetId: this.props.id,
          },
        })
        .then((res) => {
          this.setState({ result: res.data });
        });
    }
    //   if(this.props.type === "Cabinet") {

    //   }
  }
}

HistoryLogDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoryLogDialog);
