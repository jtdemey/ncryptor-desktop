import styled from "styled-components";

const Container = styled.article`
  height: 48px;
	margin-bottom: 8px;
  padding: 8px;
	background: #52796f;
	border: 8px solid #52796f;
  border-radius: 8px;
  box-shadow: -3px 3px 8px #222;
  color: hsl(97, 13%, 80%);
`;

type MessageBoxProps = {
	text: string;
};

const MessageBox = ({ text }: MessageBoxProps) => (
	<Container>
		{text}
	</Container>
);

export default MessageBox;
