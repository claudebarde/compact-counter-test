import { Contract } from "../output/contract/index.cjs";
import {
  emptyZswapLocalState,
  QueryContext,
  dummyContractAddress
} from "@midnight-ntwrk/compact-runtime";
import type { CircuitContext } from "@midnight-ntwrk/compact-runtime";

const witness = {};
const contract = new Contract(witness);

const initialContext = {
  initialPrivateState: null,
  initialZswapLocalState: emptyZswapLocalState(
    "56881ebdf3ff40471fbea7f650ff12e2d7295f7d25e1608acb2cea5f819d6aa5"
  )
};

const initialState = contract.initialState(initialContext);

const encodedStateValue = initialState.currentContractState.data.encode();
if (
  encodedStateValue.tag === "array" &&
  encodedStateValue.content[0].tag === "cell"
) {
  console.log(encodedStateValue.content[0].content);
}

const circuitContext: CircuitContext<unknown> = {
  currentPrivateState: initialState.currentPrivateState,
  currentZswapLocalState: initialState.currentZswapLocalState,
  originalState: initialState.currentContractState,
  transactionContext: new QueryContext(
    initialState.currentContractState.data,
    dummyContractAddress()
  )
};

const newState = contract.circuits.increment(circuitContext);
const newEncodedStateValue = newState.context.transactionContext.state.encode();
if (
  newEncodedStateValue.tag === "array" &&
  newEncodedStateValue.content[0].tag === "cell"
) {
  console.log(newEncodedStateValue.content[0].content);
}
