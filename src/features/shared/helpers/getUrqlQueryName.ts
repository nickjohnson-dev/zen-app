type GetUrqlQueryName = (op: any) => string;

export const getUrqlQueryName: GetUrqlQueryName = (op) =>
  op?.query?.definitions?.[0]?.name?.value;
