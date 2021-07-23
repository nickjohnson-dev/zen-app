import { ErrorOption } from 'react-hook-form';
import { CombinedError } from 'urql';

export type FormatError = (combinedError: CombinedError) => ErrorOption;

export const formatError: FormatError = (combinedError) => ({
  message: combinedError.message
    .replace('[GraphQL] ', '')
    .replace('[Network] ', ''),
  type: 'server',
});
