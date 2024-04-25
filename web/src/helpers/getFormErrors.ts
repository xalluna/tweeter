import { FormErrors } from '@mantine/form';
import { Error } from '../api/index.defs';

export function getFormErrors(errors: Error[]): FormErrors {
  return errors.reduce((prev, curr) => {
    Object.assign(prev, { [(curr.property as string).toLowerCase()]: curr.message });
    return prev;
  }, {} as FormErrors);
}
