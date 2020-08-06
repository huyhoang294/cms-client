import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import DesktopDialog from "../Dialog/DesktopDialog";
import CustomInput from "./CustomInput";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import NumberFormat from "react-number-format";
import PhoneIcon from "@material-ui/icons/Phone";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import EventIcon from "@material-ui/icons/Event";
import WcIcon from "@material-ui/icons/Wc";
import axios from "axios";

class UserFormDialog extends Component {
  state = {
    id: "",
    username: "",
    email: "",
    error: [],
    sex: "",
    birthday: "",
    phoneNum: "",
    modal: null,
    isChange: false,
  };
  render() {
    const { classes, onClose, value } = this.props;

    return (
      <DesktopDialog
        title={"Edit Profile"}
        onClose={onClose}
        onSave={() => {
          this.handleSave();
        }}
      >
        <form
          onChange={() => {
            this.setState({ isChange: true });
          }}
        >
          <Grid style={{ paddingBottom: "15px" }}>
            <CustomInput
              icon={<AccountCircle />}
              value={this.state.username}
              title={"User Name"}
              onChange={(event) => {
                this.setState({ username: event.target.value });
              }}
              error={this.state.error.indexOf("username") !== -1}
            />
          </Grid>

          {this.state.sex ? (
            <Grid style={{ paddingBottom: "15px" }}>
              <Grid container alignItems="flex-end">
                <Grid item style={{ paddingRight: "5px" }}>
                  <WcIcon />
                </Grid>
                <Grid item>
                  <FormControl>
                    <InputLabel>Sex</InputLabel>
                    <Select
                      value={this.state.sex}
                      onChange={(event) => {
                        this.setState({ sex: event.target.value });
                      }}
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          ) : null}

          <Grid style={{ paddingBottom: "15px" }}>
            <CustomInput
              icon={<EmailIcon />}
              value={this.state.email}
              title={"Email"}
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
              error={this.state.error.indexOf("email") !== -1}
            />
          </Grid>

          {this.state.phoneNum ? (
            <Grid style={{ paddingBottom: "15px" }}>
              <NumberFormat
                format="+84 ## ### ####"
                mask="_"
                allowEmptyFormatting
                customInput={CustomInput}
                icon={<PhoneIcon />}
                value={this.state.phoneNum}
                title={"Phone Number"}
                onChange={(event) => {
                  this.setState({ phoneNum: event.target.value });
                }}
                error={this.state.error.indexOf("phone Number") !== -1}
              />
            </Grid>
          ) : null}

          {this.state.birthday ? (
            <Grid style={{ paddingBottom: "15px" }}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container alignItems="flex-end">
                  <Grid item style={{ paddingRight: "5px" }}>
                    <EventIcon />
                  </Grid>
                  <Grid item>
                    <DatePicker
                      value={this.state.birthday}
                      format="DD/MM/yyyy"
                      onChange={(value) => {
                        this.setState({ birthday: value });
                      }}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
          ) : null}   
        </form>
        {this.state.modal}
      </DesktopDialog>
    );
  }

  handleSave() {
    console.log("save");
    this.Validate();

    if (!this.state.isChange) this.props.onClose();

    if (this.state.error.length !== 0) return;
    const userProfile = {
      id: this.state.id,
      username: this.state.username,
      email: this.state.email,
      sex: this.state.sex,
      birthday: this.state.birthday,
      phonenum: this.state.phoneNum,
    };
    axios.post("https://dhd-server.herokuapp.com/api/appuser/updateprofile", userProfile).then((res) => {
      if (res.data.success) {
        this.setState({
          modal: (
            <DesktopDialog
              title={"Success"}
              customCancelButt={"Close"}
              disabledSave={true}
              onClose={() => {
                this.setState({ modal: null });
                this.props.onClose();
              }}
            >
              <Typography>User profile is saved!</Typography>
            </DesktopDialog>
          ),
        });
      } else {
        this.setState({
          modal: (
            <DesktopDialog title={"Error"}>
              <Typography>Something went wrong please try again!</Typography>
            </DesktopDialog>
          ),
        });
      }
    });
  }

  Validate() {
    console.log("validate");
    let error = [];

    if (!this.state.username) error.push("username");

    if (!this.state.email) error.push("email");

    this.setState({ error });
  }

  componentDidMount() {
    this.setState({
      id: this.props.value._id,
      username: this.props.value.username,
      email: this.props.value.email,
      sex: this.props.value.sex,
      birthday: this.props.value.birthday,
      phoneNum: this.props.value.phonenum,
    });
  }
}

UserFormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default UserFormDialog;
