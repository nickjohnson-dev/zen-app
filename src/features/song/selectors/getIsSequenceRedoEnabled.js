import compose from 'lodash/fp/compose';
import getOr from 'lodash/fp/getOr';
import isEmpty from 'lodash/fp/isEmpty';
import negate from 'lodash/fp/negate';
import { NAME } from '../constants';

export const getIsSequenceRedoEnabled =
  compose(
    negate(isEmpty),
    getOr(0, `${NAME}.notes.future`),
  );