import React, { Component } from "react";
import PropTypes from "prop-types";
import {} from "@material-ui/core";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Title
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";

const styles = (theme) => ({});

class CustomChart extends Component {
  render() {
    const { classes, data } = this.props;

    return (
      <Chart data={data}>
        <ArgumentAxis />
        <ValueAxis />

        <LineSeries valueField="value" argumentField="argument" />
        <Title
            text="Cabinet open times"
          />
      </Chart>
    );
  }
}

CustomChart.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomChart);
