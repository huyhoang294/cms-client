import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  Checkbox,
  Toolbar,
  Tooltip,
} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import { withStyles, lighten } from "@material-ui/core/styles";
import classnames from "classnames";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";

const styles = (theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
  },
  tableHeadCell: {
    color: "inherit",
    "&, &$tableCell": {
      fontSize: "1em",
    },
  },
  tableResponsive: {
    width: "100%",
    overflowX: "auto",
  },
  tableHeadRow: {
    height: "56px",
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

class CustomTable extends Component {
  render() {
    const {
      tableHead,
      classes,
      onSelectAllClick,
      numSelected,
      rowCount,
      toolTip,
      disableCheckBox,
    } = this.props;
    return (
      <div className={classes.tableResponsive}>
        {numSelected && numSelected > 0 ? (
          <Toolbar
            className={clsx(classes.root, {
              [classes.highlight]: numSelected > 0,
            })}
          >
            {toolTip}
          </Toolbar>
        ) : null}
        <TableContainer>
          <Table className={classes.table}>
            {tableHead !== undefined ? (
              <TableHead>
                <TableRow className={classes.tableHeadRow}>
                  {disableCheckBox ? null : (
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={
                          numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all desserts" }}
                      />
                    </TableCell>
                  )}

                  {tableHead.map((prop, key) => {
                    return (
                      <TableCell
                        className={
                          classes.tableCell + " " + classes.tableHeadCell
                        }
                        key={key}
                      >
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
            ) : null}
            {this.props.children}
          </Table>
        </TableContainer>
      </div>
    );
  }
}

CustomTable.propTypes = {
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

export default withStyles(styles)(CustomTable);
