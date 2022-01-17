import React, { useContext, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Context, { DispatchContext } from "./context";
import {
  SET_INITIALIZED,
  loadWeb3,
  retrieveBlockchainData,
  retrieveOwners,
} from "../../store/EthereumSlice";

const Ethereum = ({ children }) => {
  const ethereumState = useSelector((state) => state.ethereum);
  const dispatch = useDispatch();

  const initialize = useCallback(async () => {
    try {
      dispatch(SET_INITIALIZED({ initialized: false }));

      await dispatch(loadWeb3({})).unwrap();
      await dispatch(retrieveBlockchainData({})).unwrap();
      await dispatch(retrieveOwners({})).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(SET_INITIALIZED({ initialized: true }));
    }
  }, [dispatch]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <Context.Provider value={ethereumState}>
        {ethereumState.initialized ? (
          children
        ) : (
          <div className="text-white h4 p-5">Initialize data...</div>
        )}
      </Context.Provider>
    </DispatchContext.Provider>
  );
};

/* We can use from our pages/components,
 * the "useSelector" hook (from 'react-redux'),
 * instead of "useEthereumSelector".
 *
 * NOTE: useSelector() returns all stores (e.g. auth, user, ethereum e.t.c.)
 * but useEthereumSelector() returns only the 'ethereum' store.
 */
export const useEthereumSelector = () => useContext(Context);

/* We can use from our pages/components,
 * the "useDispatch" hook (from 'react-redux'),
 * instead of "useEthereumDispatch".
 */
export const useEthereumDispatch = () => useContext(DispatchContext);

export default Ethereum;
