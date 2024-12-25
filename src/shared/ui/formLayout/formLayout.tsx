import { FC, ReactNode } from 'react';

interface FormLayoutProps {
    title: string;
    size?: 'xl' | '2xl' | '3xl' | '4xl';
    children: ReactNode;
}

export const FormLayout: FC<FormLayoutProps> = ({ title, children, size }) => {
    return (
        <div className="pt-10 flex justify-center items-center">
            <div
                className={`w-full max-w-${size} p-6 bg-white rounded-lg shadow-md`}
            >
                <h2 className="text-xl font-semibold text-center mb-6">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
};
