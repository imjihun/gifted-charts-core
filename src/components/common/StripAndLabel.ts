import { screenWidth } from "../../utils/constants";

export const getTopAndLeftForStripAndLabel = (props) => {
  const {
    autoAdjustPointerLabelPosition,
    topPointerLabel,
    pointerX,
    pointerLabelWidth,
    activatePointersOnLongPress,
    yAxisLabelWidth,
    pointerRadius,
    pointerWidth,
    shiftPointerLabelX,
    pointerLabelHeight,
    pointerYLocal,
    pointerStripUptoDataPoint,
    pointerStripHeight,
    shiftPointerLabelY,
    scrollX,
  } = props;
  let left = 0, top = 0;

  if (topPointerLabel) {
    top = -pointerYLocal
  }
  else if (autoAdjustPointerLabelPosition) {
    if ((pointerStripHeight - pointerYLocal) - pointerLabelHeight > 10) {
      top = 10;
    } else {
      top = (pointerStripHeight - pointerYLocal) - pointerLabelHeight;
    }
  } else {
    top = (
      pointerStripUptoDataPoint
        ? pointerRadius || pointerStripHeight / 2
        : -pointerYLocal + 8
    ) - pointerLabelWidth / 2 + shiftPointerLabelY;
  }

  if (autoAdjustPointerLabelPosition) {
    const isCoveredPointer = top < 0 && top + pointerLabelHeight > 0

    const widthFromLeft = activatePointersOnLongPress
      ? pointerX - scrollX + 10
      : pointerX
    const widthFromRight = activatePointersOnLongPress
      ? ((props.width ?? 0) + 10 || screenWidth - yAxisLabelWidth - 15) - (pointerX - scrollX)
      : (props.width || screenWidth - yAxisLabelWidth - 15) - pointerX
    if (
      widthFromLeft < pointerLabelWidth / 2
      || isCoveredPointer && !(widthFromRight < pointerLabelWidth)
    ) {
      left = (pointerWidth || 3) + 4;
    }
    else if (
      widthFromRight < pointerLabelWidth / 2
      || isCoveredPointer && !(widthFromLeft < pointerLabelWidth)
    ) {
      left = -pointerLabelWidth - 4;
    }
    else {
      left = -pointerLabelWidth / 2 + 5;
    }
  } else {
    left = (pointerRadius || pointerWidth / 2) - 10 + shiftPointerLabelX;
  }

  return {
    top,
    left,
  };
};
