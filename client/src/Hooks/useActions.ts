import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from 'State';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useActions() {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
}
