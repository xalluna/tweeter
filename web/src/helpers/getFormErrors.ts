import { FormErrors } from '@mantine/form';

export function getFormErrors(
  errors: import('d:/Projects/tweeter/web/src/api/index.defs').Error[]
): FormErrors {
  return errors.reduce((prev, curr) => {
    Object.assign(prev, { [(curr.property as string).toLowerCase()]: curr.message });
    return prev;
  }, {} as FormErrors);
}
