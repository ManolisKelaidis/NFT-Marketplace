import { useMemo } from "react";
import { useLocation } from "react-router";

const useParams = () => {
  const location = useLocation();

  const searchParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  return searchParams;
};

export default useParams;