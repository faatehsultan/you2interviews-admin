import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  ButtonProps,
} from '@chakra-ui/react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { useCallback, useEffect, useState } from 'react';

type FormSubmitConfig = {
  onSubmit: (values: Record<string, string>) => void;
  successMsg?: string;
  showSuccessMsg?: boolean | false;
  buttonLabel?: string;
  buttonProps?: ButtonProps;
};

type FormProps = {
  name: string;
  submitConfig: FormSubmitConfig;
};

type FieldProps = {
  name: string;
  label?: string;
  type?: string;
  required?: boolean | false;
  placeholder?: string;
  initialValue?: string;
};

const extractFieldProps = (data: FieldProps[]): Record<string, string> => {
  return data.reduce((acc, field) => {
    return {
      ...acc,
      [field.name]: field.initialValue || '',
    };
  }, {});
};

export default function Form({ name, submitConfig }: FormProps) {
  const toast = useToast();
  const [validationSchema, setValidationSchema] = useState<any>(null);
  const [fields, setFields] = useState<FieldProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const _onError = useCallback((error: Error | string) => {
    toast({
      title: 'Error',
      description: error.toString(),
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }, []);

  const _onSuccess = useCallback((msg: string) => {
    toast({
      title: 'Success',
      description: msg,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }, []);

  const loadFiles = useCallback(async () => {
    try {
      if (name) {
        const fieldsResponse = await import(
          `../../../forms/fields/${name}.json`
        );
        const validationResponse = await import(
          `../../../forms/validations/${name}.ts`
        );

        setFields(fieldsResponse.default);
        setValidationSchema(validationResponse.default);
      }
    } catch (error) {
      console.error(error);
      _onError((error as Error) || 'Error loading form');
    }
  }, [_onError, name]);

  const _handleSubmit = useCallback(
    async (values: Record<string, string>) => {
      try {
        setIsLoading(true);
        await submitConfig.onSubmit(values);
        setIsLoading(false);
        submitConfig.showSuccessMsg &&
          _onSuccess(submitConfig.successMsg || 'Submitted successfully');
      } catch (error) {
        _onError(`${error}`);
      }
    },
    [_onError, _onSuccess, submitConfig],
  );

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  if (fields.length === 0 || !validationSchema) {
    return null;
  }

  return (
    <Formik
      initialValues={extractFieldProps(fields)}
      validationSchema={validationSchema}
      onSubmit={_handleSubmit}
    >
      {({ errors, touched, handleSubmit }) => (
        <FormikForm className="flex flex-col gap-5">
          {fields.map((field) => {
            return (
              <FormControl
                key={field.name}
                isInvalid={field.name in errors && field.name in touched}
              >
                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                <Field
                  as={Input}
                  type={field.type || 'text'}
                  name={field.name}
                  placeholder={field.placeholder}
                />
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </FormControl>
            );
          })}

          <Button
            isLoading={isLoading}
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
            className="w-full mt-2"
            {...submitConfig.buttonProps}
          >
            {submitConfig.buttonLabel || 'Submit'}
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
}
