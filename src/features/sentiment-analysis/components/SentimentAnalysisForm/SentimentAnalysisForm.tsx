import { Button } from '@/components/common/Buttons';
import clsx from 'clsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export interface SentimentAnalysisFormProps {
  onSubmit: (value: { text: string }) => void;
  value: string;
}

const SentimentAnalysisForm = (props: SentimentAnalysisFormProps) => {
  const { onSubmit, value } = props;

  const schema = Yup.object().shape({
    text: Yup.string()
      .required('Please enter some text')
      .test('Word count', 'Must be 20 words or more', (value) => {
        if (!value) {
          return false;
        }
        return value.split(' ').length >= 20;
      }),
  });

  return (
    <Formik
      initialValues={{ text: value }}
      onSubmit={onSubmit}
      validationSchema={schema}
      validateOnMount={true}
    >
      {({ errors, isSubmitting, touched }) => (
        <Form>
          <label htmlFor="text" className="block my-2 font-bold">
            Enter some text
          </label>
          <Field
            name="text"
            id="text"
            as="textarea"
            rows={6}
            className={clsx(
              'px-2 py-1 w-full resize-none border border-slate-600 rounded',
              {
                'border-red-600 shadow-sm shadow-red-900':
                  errors.text && touched.text,
              }
            )}
          ></Field>
          <ErrorMessage
            name="text"
            className="text-red-800 italic my-2"
            component="div"
          />
          <Button type="submit" disabled={isSubmitting || !!errors.text}>
            Analyse
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SentimentAnalysisForm;
