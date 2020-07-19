import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import logo from "../../public/assets/img/logo512.png";
import { isMobile } from "react-device-detect";
import { TextField , Container, Card, CardHeader, CardContent, Button, Typography, Grid, FormHelperText } from "@material-ui/core";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    background: 'linear-gradient(90deg, #F84E4E, #D641D0)',
    border: 0,
    borderRadius: 40,
    boxShadow: '0 3px 5px 2px rgba(248, 78, 78, .3)',
    color: '#FFFFFF',
  }
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        background: 'url(background.png)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>
        <Container>
          <Card style={{
            width: isMobile ? '80%' : '30%',
            textAlign: 'center',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#ffffff',
            boxShadow: '0px 3px 3px -2px rgba(149, 223, 237, 0.5), 0px 3px 4px 0px rgba(149, 223, 237, 0.3), 0px 1px 8px 0px rgba(149, 223, 237, 0.1)'
          }}>
            <div style={{
              background: 'linear-gradient(to bottom, #95DFED, #4BA0F5)',
            }}>
              <img src="Logo.png" style={{
                paddingTop: '16px',
                width: '20%',
                height: 'auto'
              }}/>
              <Typography variant="h4" style={{
                fontWeight: '700',
                color: '#ffffff',
                paddingBottom: '10px',
              }}>
                Register
              </Typography>
            </div>
            
            <CardContent>
              <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                <TextField
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  label="Name"
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <FormHelperText error>{errors.name}</FormHelperText>

                <TextField
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <FormHelperText error>{errors.email}</FormHelperText>

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <FormHelperText error>{errors.password}</FormHelperText>

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <FormHelperText error>{errors.password2}</FormHelperText>

                <Button
                  fullWidth
                  className={classes.submit}
                  type="submit"
                >
                  Sign up
                </Button>
                <Grid container>
                  <Grid item>
                    <Link to="/login" variant="body2">
                      {"Already have an account? Login"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { registerUser })(withRouter(withStyles(styles)(Register)));
