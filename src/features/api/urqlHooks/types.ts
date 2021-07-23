import { UseMutationResponse, UseQueryArgs, UseQueryResponse } from 'urql';

export type MutationHook<
  TData = any,
  TVariables = Record<string, any>,
> = () => UseMutationResponse<TData, TVariables>;

export type QueryHook<TData = any, TVariables = Record<string, any>> = (
  args?: Omit<UseQueryArgs<TVariables, TData>, 'query'>,
) => UseQueryResponse<TData, TVariables>;
