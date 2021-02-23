import { AxiosResponse } from 'axios';
import alertLevelOptions from 'Constants/alertLevels';
import useActions from 'Hooks/useActions';
import {
  MutationFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from 'react-query';
import { ItemType } from 'Types';

interface QueryMutation<T> {
  identifier: ItemType;
  mutationFn: MutationFunction<AxiosResponse, T>;
  actionString: string;
  additionalQueryInvalidators?: ItemType[]; // for items like cheatSheet that also invalidate tags
}

function useQueryMutation<T>({
  identifier,
  mutationFn,
  actionString,
  additionalQueryInvalidators = [],
}: QueryMutation<T>): UseMutationResult<AxiosResponse, unknown, T, unknown> {
  const { setAlert } = useActions();
  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onSuccess: () => {
      queryClient.invalidateQueries(identifier);
      additionalQueryInvalidators.map((id) =>
        queryClient.invalidateQueries(id),
      );
    },
    onError: () => {
      setAlert(
        `Failed to ${actionString} ${identifier}`,
        alertLevelOptions.error,
      );
    },
  });
}

export default useQueryMutation;
