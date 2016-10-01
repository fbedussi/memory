function observeStore(store, subtree, onChange) {
  let currentState;

  function handleChange() {
    let nextState = subtree? store.getState()[subtree] : store.getState();
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

export default observeStore;