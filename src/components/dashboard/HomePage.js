import React, { Component } from "react";
import axios from "axios";
import { Grid, CardContent, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import CardDashBoard from "../Card/CardDashBoard";
import moneyIcon from "../../public/img/moneyIcon.svg";
import cabinetIcon from "../../public/img/cabinet.svg";
import userIcon from "../../public/img/user.svg";
import Card from "../Card/CustomCard";
import CustomChart from "../Chart/CustomChart";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

let CancelToken = null;
let source = null;
class HomePage extends Component {
  state = {
    result: null,
    data: null,
    startDate: Date.now(),
    endDate: Date.now(),
  };
  render() {
    return (
      <div>
        {this.state.result ? (
          <div>
            <Grid container spacing={5} justify="center">
              <Grid item md={3} sm={6} xs={12}>
                <CardDashBoard
                  subTitle={"Number of Cabinets: "}
                  title={"Cabinets"}
                  total={this.state.result.cabinet.total}
                  value={this.state.result.cabinet.active}
                  label2={"Used"}
                  value2={this.state.result.cabinet.used}
                  avatar={<img src={cabinetIcon} />}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <CardDashBoard
                  subTitle={"Number of Users: "}
                  title={"Users"}
                  total={this.state.result.user.total}
                  value={this.state.result.user.active}
                  label2={"Online"}
                  value2={this.state.result.user.online}
                  avatar={<img src={userIcon} />}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <CardDashBoard
                  avatar={<img src={cabinetIcon} />}
                  subTitle={"Number of Stations: "}
                  title={"Stations"}
                  total={this.state.result.station.total}
                  value={this.state.result.station.active}
                  label={"Current"}
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <CardDashBoard
                  avatar={<img src={moneyIcon} />}
                  subTitle={"Target Profit: "}
                  title={"Profit"}
                  total={"1000"}
                  value={"500"}
                  label={"Current"}
                />
              </Grid>
            </Grid>

            <div style={{ paddingTop: "50px" }}>
              <Card>
                <CardContent>
                  <Grid container spacing={5} style={{paddingBottom: "20px"}}>
                    <Grid item>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container alignItems="flex-end">
                          <Grid item style={{ paddingRight: "5px" }}>
                            <Typography>Start Date</Typography>
                          </Grid>
                          <Grid item>
                            <DatePicker
                              value={this.state.startDate}
                              format="DD/MM/yyyy"
                              onChange={(value) => {
                                this.setState({ startDate: value });
                              }}
                            />
                          </Grid>
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item>
                      <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container alignItems="flex-end">
                          <Grid item style={{ paddingRight: "5px" }}>
                            <Typography>End Date</Typography>
                          </Grid>
                          <Grid item>
                            <DatePicker
                              value={this.state.endDate}
                              format="DD/MM/yyyy"
                              onChange={(value) => {
                                this.setState({ startDate: value });
                              }}
                            />
                          </Grid>
                        </Grid>
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Grid>

                  {/* {this.state.data ? ( */}
                  <CustomChart
                    data={[
                      { argument: "6:30", value: 100 },
                      { argument: "7:00", value: 300 },
                      { argument: "7:30", value: 420 },
                      { argument: "8:00", value: 380 },
                      { argument: "8:30", value: 500 },
                      { argument: "9:00", value: 250 },
                      { argument: "9:30", value: 600 },
                    ]}
                  />
                  {/* ) : null} */}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div>
            <Grid container spacing={5} justify="center">
              <Grid item md={3} sm={6} xs={12}>
                <CardDashBoard
                  avatar={
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={50}
                      height={50}
                    />
                  }
                  subTitle={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="30%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  title={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="60%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  label={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="100%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  label2={
                    <Skeleton animation="wave" height={10} width="100%" />
                  }
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <CardDashBoard
                  avatar={
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={50}
                      height={50}
                    />
                  }
                  subTitle={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="30%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  title={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="60%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  label={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="100%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  label2={
                    <Skeleton animation="wave" height={10} width="100%" />
                  }
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <CardDashBoard
                  avatar={
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={50}
                      height={50}
                    />
                  }
                  subTitle={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="30%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  title={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="60%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  label={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="100%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                />
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <CardDashBoard
                  avatar={
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={50}
                      height={50}
                    />
                  }
                  subTitle={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="30%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  title={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="60%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  label={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="100%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                />
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    );
  }

  updateDashboard() {
    axios.get("https://dhd-server.herokuapp.com/api/dashboard").then((res) => {
      this.setState({ result: res.data });
    });
  }

  listener() {
    axios
      .get("https://dhd-server.herokuapp.com/api/dashboard/listener", { cancelToken: source.token })
      .then((res) => {
        if (res.data) {
          this.updateDashboard();
          this.listener();
        } else {
          this.listener();
        }
      });
  }

  componentDidMount() {
    CancelToken = axios.CancelToken;
    source = CancelToken.source();
    this.updateDashboard();
    // this.listener();
  }

  componentWillUnmount() {
    source.cancel();
  }
}

export default HomePage;
