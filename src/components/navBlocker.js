import PropTypes from "prop-types";
import { Prompt } from "react-router";
const NavigationBlocker = (props) => (
  <Prompt
    when={props.navigationBlocked}
    message="Are you sure you want to leave?"
  />
);
NavigationBlocker.propTypes = {
  navigationBlocked: PropTypes.bool.isRequired,
};
export default NavigationBlocker;
