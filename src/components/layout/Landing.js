import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Card, CardHeader, CardContent, Button, Typography } from "@material-ui/core";
import { isMobile } from "react-device-detect";
import { connect } from "react-redux";

class Landing extends React.Component {
  
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
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
                Welcome To DHD
              </Typography>
            </div>
            
            <CardContent>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <Button href="/login" style={{
                  background: 'linear-gradient(90deg, #3EC8E2, #686FD0)',
                  width: '80%',
                  border: 0,
                  borderRadius: 40,
                  boxShadow: '0 3px 5px 2px rgba(68, 185, 223, .3)',
                  color: '#FFFFFF',
                  margin: '10px'
                }}>Sign In</Button>
                <Button href="/register" style={{
                  background: 'linear-gradient(90deg, #F84E4E, #D641D0)',
                  width: '80%',
                  border: 0,
                  borderRadius: 40,
                  boxShadow: '0 3px 5px 2px rgba(248, 78, 78, .3)',
                  color: '#FFFFFF',
                  margin: '10px'
                }}>Sign Up</Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
      
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(mapStateToProps, {})(Landing)