// Semantic UI components
import { FormField, Label } from "semantic-ui-react";

// library
import React from "react";
import { useField } from "formik";

interface IMyTextAreaProps {
  label?: string;
  name: string;
  [x: string]: any;
}

const MyTextArea: React.VFC<IMyTextAreaProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default MyTextArea;
