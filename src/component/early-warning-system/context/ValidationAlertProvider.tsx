// ValidationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ValidationStatus {
    sernageominValidated: boolean;
    sernageominValidationDate: string | null;
    senapredValidated: boolean;
    senapredValidationDate: string | null;
}

interface ValidationContextType {
    validationStatus: Record<string, ValidationStatus>;
    setValidationStatus: (alertId: string, status: ValidationStatus) => void;
}

const ValidationContext = createContext<ValidationContextType | undefined>(undefined);

export const ValidationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [validationStatus, setValidationStatusState] = useState<Record<string, ValidationStatus>>({});

    const setValidationStatus = (alertId: string, status: ValidationStatus) => {
        setValidationStatusState((prevState) => ({
            ...prevState,
            [alertId]: status,
        }));
    };

    return (
        <ValidationContext.Provider value={{ validationStatus, setValidationStatus }}>
            {children}
        </ValidationContext.Provider>
    );
};

export const useValidation = () => {
    const context = useContext(ValidationContext);
    if (!context) {
        throw new Error('useValidation debe usarse dentro de un ValidationProvider');
    }
    return context;
};
