import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

const styles = (theme) => ({
    CustomCard: {
        boxShadow: "none",
        borderRadius: "10px",
    }
});

class CustomCard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Card classes={{root: classes.CustomCard}}>
        {this.props.children}
      </Card>
    );
  }
}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomCard);
