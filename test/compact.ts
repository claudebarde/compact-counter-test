import type {
  ConstructorResult,
  CircuitResults
} from "@midnight-ntwrk/compact-runtime";
import type { StateValue } from "@midnight-ntwrk/onchain-runtime";

export const getStateValue = <T, U>(
  data: ConstructorResult<T> | CircuitResults<T, U>
): StateValue => {
  if (data.hasOwnProperty("result")) {
    // CircuitResults is passed
    return (data as CircuitResults<T, U>).context.transactionContext.state;
  } else {
    // ConstructorResult is passed
    return (data as ConstructorResult<T>).currentContractState.data;
  }
};
