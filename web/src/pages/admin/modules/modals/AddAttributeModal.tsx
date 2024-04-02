import { useDisclosure } from '@mantine/hooks';
import { dispatch, useAppSelector } from '../../../../store/configureStore';
import { useForm } from '@mantine/form';
import { PrimaryButton } from '../../../../components/buttons/PrimaryButton';
import { IconPlus } from '@tabler/icons-react';
import { PrimaryModal } from '../../../../components/modals/PrimaryModal';
import { PrimaryTextInput } from '../../../../components/inputs/PrimaryTextInput';
import { AdminButtons } from '../AdminButtons';
import { createAttribute } from '../../../../services/dataServices/attributeServices';
import { responseWrapper } from '../../../../services/helpers/responseWrapper';
import { AttributeDto } from '../../../../types/attributes';
import eventBus from '../../../../helpers/eventBus';

const initialValues = {
  name: '',
  gameId: 0,
} as const;

export function AddAttributeModal(): React.ReactElement {
  const [open, { toggle }] = useDisclosure();

  const selectedGameId = useAppSelector((state) => state.admin.selectedGameId);

  const form = useForm({
    initialValues: initialValues,
  });

  const handleCancel = () => {
    toggle();
    form.reset();
  };

  const handleAdd = async (newAttribute: AttributeDto) => {
    const updateAttribute: AttributeDto = {
      name: newAttribute.name,
      gameId: selectedGameId,
    };

    dispatch(createAttribute(updateAttribute)).then(({ payload }) => {
      responseWrapper(payload, 'Successfully added Attribute');

      if (payload && !payload.hasErrors) {
        eventBus.publish('attributeAdded', payload);
        handleCancel();
      }
    });
  };

  const determineDisabled = selectedGameId === 0;

  return (
    <div>
      <PrimaryButton
        leftIcon={<IconPlus />}
        onClick={toggle}
        disabled={determineDisabled}
      >
        Add Attribute
      </PrimaryButton>

      <PrimaryModal opened={open} onClose={toggle} title="Add Attribute">
        <form onSubmit={form.onSubmit(handleAdd)}>
          <PrimaryTextInput
            withAsterisk
            label="Attribute"
            {...form.getInputProps('name')}
          />

          <AdminButtons handleCancel={handleCancel} />
        </form>
      </PrimaryModal>
    </div>
  );
}
