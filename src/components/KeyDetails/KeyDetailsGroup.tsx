import React from "react";
import KeyPropertyLabel from "./KeyPropertyLabel";
import KeyPropertyValue from "./KeyPropertyValue";

type KeyDetailsGroupProps = {
  animationDelay?: number;
  color?: string;
  labelText: string;
  showCopyBtn?: boolean;
  valueText: string;
};

const KeyDetailsGroup = ({
  animationDelay,
  color,
  labelText,
  showCopyBtn,
  valueText
}: KeyDetailsGroupProps): JSX.Element => (
  <article>
    <KeyPropertyLabel text={labelText} />
    <KeyPropertyValue
      animationDelay={animationDelay ?? 0}
      color={color}
      showCopyBtn={showCopyBtn}
      text={valueText}
    />
  </article>
);

export default KeyDetailsGroup;
