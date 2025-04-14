import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

type ButtonProps = {
  backgroundColor?: string;
  borderColor?: string;
  icon?: IconProp;
  onClick?: Function;
  style?: any;
  text: string;
};

export const Btn = styled.div`
  margin: 0 0.1rem 1rem 0.1rem;
  padding: 0.5rem;
  background: #52796f;
  border: 1px solid #354f52;
  border-radius: 0.2rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.45);
  color: #cad2c5;
  cursor: pointer;
  font-family: "Lato", sans-serif;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

export const SvgSpan = styled.span`
  padding: 0.25rem 0.25rem 0.25rem 0;
`;

export const TextSpan = styled.h3`
  display: inline-block;
  margin: 0;
  padding: 0 0 0 0.25rem;
`;

const Button = ({
  backgroundColor = "#52796f",
  borderColor = "#354f52",
  icon,
  onClick = () => null,
  style = {},
  text,
}: ButtonProps) => {
  return (
    <Btn
      onClick={e => onClick(e)}
      style={{
        background: backgroundColor,
        border: `1px solid ${borderColor}`,
        ...style,
      }}
    >
      {icon && (
        <SvgSpan>
          <FontAwesomeIcon
            icon={icon}
            width="16px"
            style={{ transform: "translateY(0.1rem)" }}
          />
        </SvgSpan>
      )}
      <TextSpan>{text}</TextSpan>
    </Btn>
  );
};

export default Button;
