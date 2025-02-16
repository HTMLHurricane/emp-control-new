import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

const lngs: any = {
    en: { nativeName: 'EN' },
    ru: { nativeName: 'RU' },
};

export const LangSwitcher = () => {
    const { i18n } = useTranslation();

    return (
        <Select
            value={i18n.resolvedLanguage}
            onChange={(lng) => i18n.changeLanguage(lng)}
            className="w-15"
        >
            {Object.keys(lngs).map((lng) => (
                <Select.Option key={lng} value={lng}>
                    {lngs[lng].nativeName}
                </Select.Option>
            ))}
        </Select>
    );
};
