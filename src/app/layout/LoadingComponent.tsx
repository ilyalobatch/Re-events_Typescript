// Semantic UI components
import { Dimmer, Loader } from "semantic-ui-react";
import React from "react";

interface ILoadingComponentProps {
  inverted?: boolean;
  content: string;
}

const LoadingComponent: React.VFC<ILoadingComponentProps> = ({
  inverted = true,
  content = "Loading...",
}) => {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content={content} />
    </Dimmer>
  );
};

export default LoadingComponent;
