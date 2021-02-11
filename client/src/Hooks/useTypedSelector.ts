import { TypedUseSelectorHook, useSelector as _useSelector } from 'react-redux';
import { RootState } from 'State';

const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
export default useSelector;
