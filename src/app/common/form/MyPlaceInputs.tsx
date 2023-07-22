// Semantic UI components
import { FormField, Segment, List } from "semantic-ui-react";

// library
import React from "react";
import { useField } from "formik";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export interface FormFields {
  address: string;
  latLng?: {} | null;
}

interface IMyPlaceInputProps {
  options?: any;
  label?: string;
  name: string;
  [x: string]: any;
}

const MyPlaceInput: React.VFC<IMyPlaceInputProps> = ({
  label,
  options,
  ...props
}) => {
  const [field, meta, helpers] = useField<FormFields>(props);

  const handleSelect = (address: any) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => helpers.setValue({ address, latLng }))
      .catch((error) => helpers.setError(error));
  };

  const handleBlur = (e: any) => {
    field.onBlur(e);
    if (!field.value.latLng) {
      helpers.setValue({ address: "", latLng: null });
    }
  };

  return (
    <PlacesAutocomplete
      value={field.value.address}
      onChange={(value) => helpers.setValue({ address: value })}
      onSelect={(value) => handleSelect(value)}
      searchOptions={options}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <FormField error={meta.touched && !!meta.error}>
          <input
            {...getInputProps({
              ...props,
              name: field.name,
              onBlur: (e) => handleBlur(e),
            })}
          />
          {/* {meta.touched && meta.error ? (
            <Label basic color="red">
              {meta.error?.address}
            </Label>
          ) : null} */}
          {suggestions?.length > 0 && (
            <Segment
              loading={loading}
              style={{
                marginTop: 0,
                position: "absolute",
                zIndex: 1000,
                width: "100%",
              }}
            >
              <List selection>
                {suggestions.map((suggestion) => (
                  <List.Item
                    {...getSuggestionItemProps(suggestion)}
                    key={suggestion.placeId}
                  >
                    <List.Header>
                      {suggestion.formattedSuggestion.mainText}
                    </List.Header>
                    <List.Description>
                      {suggestion.formattedSuggestion.secondaryText}
                    </List.Description>
                  </List.Item>
                ))}
              </List>
            </Segment>
          )}
        </FormField>
      )}
    </PlacesAutocomplete>
  );
};

export default MyPlaceInput;
