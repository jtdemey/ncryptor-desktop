import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { applyEllipsis } from "../../utils/StringFormatters";

type FileInputProps = {
  setText: Function;
};

const Container = styled.div`
  margin: 1rem 1rem 0 0;
`;

const Label = styled.label`
  display: inline-block;
  padding: 0.25rem;
  border: 1px solid #cad2c5;
  border-radius: 2px;
  color: #cad2c5;
  font-size: 1.25rem;
  line-height: 1.1rem;
`;

const Input = styled.input`
  display: none;
`;

const SelectedFileSpan = styled.span`
  padding-left: 0.5rem;
  color: #cad2c5;
  font-family: "Lora", serif;
  font-size: 1rem;
  font-weight: normal;
`;

const FileInput = ({ setText }: FileInputProps): JSX.Element => {
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
      file
        .text()
        .then((text: string) => setText(text))
        .catch(err => console.error(err));
    }
  };
  return (
    <Container onClick={() => inputRef.current?.click()}>
      <Label htmlFor="file-input" title="Upload text from file">
        <FontAwesomeIcon icon={faUpload} size="lg" width={28} />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            changeHandler(e)
          }
          name="file-input"
          ref={inputRef}
          type="file"
        />
      </Label>
      {selectedFile && (
        <SelectedFileSpan>
          {applyEllipsis(selectedFile.name, 9)}
        </SelectedFileSpan>
      )}
    </Container>
  );
};

export default FileInput;
