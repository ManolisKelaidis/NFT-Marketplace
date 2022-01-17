import LoadingOverlay from "react-loading-overlay";
import { SpinnerDotted } from "spinners-react";

const Loader = ({ loading, children }) => {
  return (
    <LoadingOverlay
      active={loading}
      spinner={
        <SpinnerDotted
          size={200}
          thickness={100}
          speed={100}
          color="#36ad47"
          secondaryColor="rgba(0, 0, 0, 0.44)"
        />
      }
      styles={{
        wrapper: {
          width: '100%',
          height: loading ? "100vh": "auto",
          overflow: loading ? 'hidden' : 'auto'
        }
      }}
    >
      {children}
    </LoadingOverlay>
  );
};

export default Loader;
