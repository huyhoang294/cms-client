import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  CardHeader,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from "@material-ui/core";
import { ViewModule } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "./CustomCard";

const styles = (theme) => ({
  title: {
    fontWeight: "bold",
  },
  subheader: {
    fontSize: "0.7rem",
  },
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(214,65,208,1) 0%, rgba(248,78,78,1) 100%)",
  },
});

class CardDashBoard extends Component {
  render() {
    const {
      classes,
      avatar,
      total,
      title,
      subTitle,
      value,
      value2,
      label,
      label2,
    } = this.props;

    return (
      <Card style={{ width: "248px", height: "160px", margin: "auto" }}>
        <CardHeader
          style={{ paddingBottom: 0 }}
          classes={{ title: classes.title, subheader: classes.subheader }}
          avatar={avatar}
          title={title}
          subheader={total ? subTitle + total : subTitle}
        />
        <CardContent>
          <div>
            <Box display={"flex"} alignItems="center">
              <Box width="100%" mr={1}>
                <Typography
                  fontWeight="fontWeightRegular"
                  style={{ fontSize: "0.7rem", color: "rgba(0, 0, 0, 0.54)" }}
                >
                  {label ? label : "Active"}
                </Typography>
              </Box>
              {value || value === 0 ? (
                <Box>
                  <Typography
                    fontWeight="fontWeightRegular"
                    style={{ fontSize: "0.7rem", color: "rgba(0, 0, 0, 0.54)" }}
                  >
                    {value}
                  </Typography>
                </Box>
              ) : null}
            </Box>
            {value || value === 0 ? (
              <Box width="100%" mr={1}>
                <LinearProgress
                  classes={{
                    root: classes.root,
                    colorPrimary: classes.colorPrimary,
                    bar: classes.bar,
                  }}
                  variant="determinate"
                  value={(value / total) * 100}
                />
              </Box>
            ) : null}
          </div>
          {label2 ? (
            <div>
              <Box display={"flex"} alignItems="center">
                <Box width="100%" mr={1}>
                  <Typography
                    fontWeight="fontWeightRegular"
                    style={{ fontSize: "0.7rem", color: "rgba(0, 0, 0, 0.54)" }}
                  >
                    {label2}
                  </Typography>
                </Box>
                {value2 || value2 === 0 ? (
                  <Box>
                    <Typography
                      fontWeight="fontWeightRegular"
                      style={{
                        fontSize: "0.7rem",
                        color: "rgba(0, 0, 0, 0.54)",
                      }}
                    >
                      {value2}
                    </Typography>
                  </Box>
                ) : null}
              </Box>
              {value2 || value2 === 0 ? (
                <Box width="100%" mr={1}>
                  <LinearProgress
                    classes={{
                      root: classes.root,
                      colorPrimary: classes.colorPrimary,
                      bar: classes.bar,
                    }}
                    variant="determinate"
                    value={(value2 / total) * 100}
                  />
                </Box>
              ) : null}
            </div>
          ) : null}
        </CardContent>
      </Card>
    );
  }
}

CardDashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardDashBoard);
