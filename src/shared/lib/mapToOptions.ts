import { SelectProps } from 'antd'

export const mapToOptions = (
    items: { id: number; name: string }[] | undefined,
): SelectProps['options'] => {
    return items?.map(({ id, name }) => ({ label: name, value: id }));
};