import styled from "styled-components";
import KeyPropertyLabel from "./KeyPropertyLabel";
import KeyPropertyValue from "./KeyPropertyValue";

type KeyDetailsGroupProps = {
  animationDelay?: number;
  color?: string;
  labelText: string;
  showCopyBtn?: boolean;
  valueText: string;
};

const Container = styled.article`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 100%;
  overflow-wrap: break-word;
`;

const KeyDetailsGroup = ({
  animationDelay,
  color,
  labelText,
  showCopyBtn,
  valueText,
}: KeyDetailsGroupProps) => (
  <Container>
    <KeyPropertyLabel text={labelText} />
    <KeyPropertyValue
      animationDelay={animationDelay ?? 0}
      color={color}
      showCopyBtn={showCopyBtn}
      text={valueText}
    />
  </Container>
);

export default KeyDetailsGroup;
