// Semantic UI components
import { FormField, Label } from "semantic-ui-react";

// library
import React from "react";
import { useField } from "formik";

interface IMyTextInputProps {
  label?: string;
  name: string;
  [x: string]: any;
}

const MyTextInput: React.VFC<IMyTextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default MyTextInput;
