import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

const styles = (theme) => ({});

class CustomInput extends Component {
  render() {
    const { classes, value, onChange, title, icon, error, isRequired } = this.props;

    return (
      <Grid container alignItems="flex-end">
        <Grid item style={{paddingRight: "5px"}}>{icon}</Grid>
        <Grid item>
          <TextField
            label={title}
            value={value}
            onChange={onChange}
            error={error}
            helperText={error}
            required={isRequired}
          />
        </Grid>
      </Grid>
    );
  }
}

CustomInput.propTypes = {
  onChange: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomInput);
