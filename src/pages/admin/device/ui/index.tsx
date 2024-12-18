import { useAppSelector } from '@/shared';
import { DeviceHead } from './head';
import { DeviceCreateForm } from './create/deviceCreateForm';
import { DeviceUpdateForm } from './update/deviceUpdateForm';
import { DeviceTable } from './table';

export const Device = () => {
    const { isCreatingDevice, isUpdatingDevice } = useAppSelector();

    return (
        <>
            <DeviceHead />
            {isCreatingDevice && <DeviceCreateForm />}
            {isUpdatingDevice && <DeviceUpdateForm />}
            {!isCreatingDevice && !isUpdatingDevice && <DeviceTable />}
        </>
    );
};
