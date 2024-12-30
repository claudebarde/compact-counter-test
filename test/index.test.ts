import { Contract, ledger } from "../output/contract/index.cjs";
import {
  emptyZswapLocalState,
  QueryContext,
  dummyContractAddress
} from "@midnight-ntwrk/compact-runtime";
import type {
  CircuitContext,
  ConstructorContext
} from "@midnight-ntwrk/compact-runtime";
import { getStateValue } from "./compact";

describe("Counter contract", () => {
  console.log("\n");

  let contract: Contract<unknown, {}>;
  let initialContext: ConstructorContext<unknown>;

  beforeAll(() => {
    const witness = {};
    contract = new Contract(witness);

    initialContext = {
      initialPrivateState: null,
      initialZswapLocalState: emptyZswapLocalState(
        "56881ebdf3ff40471fbea7f650ff12e2d7295f7d25e1608acb2cea5f819d6aa5"
      )
    };
  });

  it("increment", () => {
    const initialState = contract.initialState(initialContext);

    const initialStateValue = getStateValue(initialState);
    expect(ledger(initialStateValue).round).toBe(0n);

    const circuitContext: CircuitContext<unknown> = {
      currentPrivateState: initialState.currentPrivateState,
      currentZswapLocalState: initialState.currentZswapLocalState,
      originalState: initialState.currentContractState,
      transactionContext: new QueryContext(
        initialState.currentContractState.data,
        dummyContractAddress()
      )
    };

    const result = contract.circuits.increment(circuitContext);
    const newStateValue = getStateValue(result);
    expect(ledger(newStateValue).round).toBe(5n);
  });
});
