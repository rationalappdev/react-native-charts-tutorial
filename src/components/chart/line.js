// @flow

import React, { Component } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  View
} from 'react-native';
import {
  Group,
  Path,
  Surface,
  Shape
} from 'react-native/Libraries/ART/ReactNativeART';

export default class Line extends Component {

  props: {
    values: Array<number>,
    fillColor: string,
    strokeColor: string,
    strokeWidth: number,
  };

  static defaultProps = {
    fillColor: 'rgba(103, 58, 183, 1)',       // solid violet color
    strokeColor: 'rgba(103, 58, 183, 0.25)',  // semi-transparent violet
    strokeWidth: 8,
  };

  state = {
    // set initial width to screen width so when animated it stays constant,
    // try setting it to zero and see what happens on initial load
    width: Dimensions.get('window').width,
    // set initial height to zero so when updated to actual height and
    // animated, the chart raises from the bottom to the top of the container
    height: 0,
  };

  componentWillUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  // Handle container view's onLayout event to get its width and height after rendered and
  // update the state so the component can render the chart using actual width and height
  onLayout = (event: Object) => {
    // pull out width and height out of event.nativeEvent.layout
    const {
      nativeEvent: {
        layout: {
          width,
          height
        }
      }
    } = event;
    // update the state
    this.setState({
      width,
      height,
    })
  };

  buildPath = (values: Array<number>): Path => {
    const {
      strokeWidth,
    } = this.props;
    const {
      width,
      height,
    } = this.state;

    let firstPoint: boolean = true,
      // holds x and y coordinates of the previous point when iterating
      previous: { x: number, y: number };

    const
      minValue = Math.min(...values),
      maxValue = Math.max(...values) - minValue,
      // step between each value point on horizontal (x) axis
      stepX = width / (values.length - 1 || 1),
      // step between each value point on vertical (y) axis
      stepY = maxValue
        ? (height - strokeWidth * 2) / maxValue
        : 0,
      // adjust values so that min value becomes 0 and goes to the bottom edge
      adjustedValues = values.map(value => value - minValue)
    ;

    let path = Path()
    // start from the left bottom corner so we could fill the area with color
      .moveTo(-strokeWidth, strokeWidth);

    adjustedValues.forEach((number, index) => {
      let x = index * stepX,
        y = -number * stepY - strokeWidth;
      if (firstPoint) {
        // straight line to the first point
        path.lineTo(-strokeWidth, y);
      }
      else {
        // make curved line
        path.curveTo(previous.x + stepX / 3, previous.y, x - stepX / 3, y, x, y);
      }
      // save current x and y coordinates for the next point
      previous = { x, y };
      firstPoint = false;
    });

    return path
      // line to the right bottom corner so we could fill the area with color
      .lineTo(width + strokeWidth, strokeWidth)
      .close();
  };

  render() {
    const {
      values,
      fillColor,
      strokeColor,
      strokeWidth
    } = this.props;
    const {
      width,
      height,
    } = this.state;
    return (
      <View
        style={styles.container}
        onLayout={this.onLayout}
      >
        <Surface width={width} height={height}>
          <Group x={0} y={height}>
            <Shape
              d={this.buildPath(values)}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </Group>
        </Surface>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // align at the bottom of the container so when animated it rises to the top
    justifyContent: 'flex-end',
  },
});
