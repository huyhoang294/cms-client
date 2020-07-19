import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import logo from "../../public/assets/img/logo512.png";
import { Link, withRouter } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Container, Card, CardHeader, CardContent, Button, Typography, Grid, FormHelperText } from "@material-ui/core";

const styles = theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    background: 'linear-gradient(90deg, #3EC8E2, #686FD0)',
    border: 0,
    borderRadius: 40,
    boxShadow: '0 3px 5px 2px rgba(68, 185, 223, .3)',
    color: '#FFFFFF',
  }
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
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
                Login
              </Typography>
            </div>
            
            <CardContent>
              <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                <TextField
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <FormHelperText error>
                  {errors.email}
                  {errors.emailnotfound}
                </FormHelperText>

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  autoComplete="current-password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <FormHelperText error>
                  {errors.password}
                  {errors.passwordincorrect}
                </FormHelperText>

                <Button
                  fullWidth
                  className={classes.submit}
                  type="submit"
                >
                  Login
                </Button>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: isMobile ? 'column' : null }}>
                  <div style={{ marginBottom: isMobile ? '10px' : null}}>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </div>
                  <div>
                    <Link to="/register" variant="body2">
                      {"Don't have an account? Register"}
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }
  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, { loginUser })(
  withStyles(styles)(Login)
);
