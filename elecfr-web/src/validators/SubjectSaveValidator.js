import { useState } from "react";
import { stringValidator } from "./validators";

const touchErrors = errors => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty: true,
        };
        return acc;
    }, {});
};

export const useSubjectSaveValidator = form => {
    const [errors, setErrors] = useState({
        subjectName: {
            dirty: false,
            error: false,
            message: "",
        },
        subjectDesc: {
            dirty: false,
            error: false,
            message: ""
        }
    });

    const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
        let isValid = true;

        // Create a deep copy of the errors
        var nextErrors = JSON.parse(JSON.stringify(errors));

        // Force validate all the fields
        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
        }

        const { subjectName, subjectDesc } = form;

        if (nextErrors.subjectName.dirty && (field ? field === "subjectName" : true)) {
            const message = stringValidator(subjectName, form);
            nextErrors.subjectName.error = !!message;
            nextErrors.subjectName.message = message;
            if (!!message) isValid = false;
        }

        if (nextErrors.subjectDesc.dirty && (field ? field === "subjectDesc" : true)) {
            const subjectDescMessage = stringValidator(subjectDesc, form);
            nextErrors.subjectDesc.error = !!subjectDescMessage;
            nextErrors.subjectDesc.message = subjectDescMessage;
            if (!!subjectDescMessage) isValid = false;
        }

        setErrors(nextErrors);

        return {
            isValid,
            errors: nextErrors,
        };
    };

    return {
        validateForm,
        errors,
    };
};