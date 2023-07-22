// Semantic UI components
import { FormField, Label, Select } from "semantic-ui-react";

//library
import React from "react";
import { useField } from "formik";

interface IMySelectInputProps {
  label?: string;
  name: string;
  [x: string]: any;
}

const MySelectInput: React.VFC<IMySelectInputProps> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        options={[]}
        clearable
        value={field.value || null}
        onChange={(e, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
};

export default MySelectInput;
