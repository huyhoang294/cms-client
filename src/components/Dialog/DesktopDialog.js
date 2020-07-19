import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

const styles = (theme) => ({});

class DesktopDialog extends Component {
  render() {
    const {
      classes,
      onClose,
      onSave,
      title,
      customCancelButt,
      customSaveButt,
      disabledSave,
      disabledCancel,
    } = this.props;

    return (
      <Dialog open onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{this.props.children}</DialogContent>
        <DialogActions>
          {disabledCancel ? null : (
            <Button autoFocus onClick={onClose} color="secondary">
              {customCancelButt ? customCancelButt : "Cancel"}
            </Button>
          )}

          {disabledSave ? null : (
            <Button onClick={onSave} color="primary">
              {customSaveButt ? customSaveButt : "Save"}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

DesktopDialog.propTypes = {
  handleClose: PropTypes.object.isRequired,
  handleSave: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DesktopDialog);
