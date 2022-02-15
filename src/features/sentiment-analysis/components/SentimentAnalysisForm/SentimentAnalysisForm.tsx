import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export interface SentimentAnalysisFormProps {
  onSubmit: (value: { text: string }) => void;
  value: { text: string };
}

const SentimentAnalysisForm = (props: SentimentAnalysisFormProps) => {
  const { onSubmit, value } = props;

  const schema = Yup.object().shape({
    text: Yup.string()
      .required('Required')
      .test('Word count', 'Must be 20 words or more', (value) => {
        if (!value) {
          return false;
        }
        return value.split(' ').length >= 20;
      }),
  });

  return (
    <Formik initialValues={value} onSubmit={onSubmit} validationSchema={schema}>
      {({ errors, isSubmitting }) => (
        <Form>
          <label htmlFor="text" className="block my-2 font-bold">
            Enter some text
          </label>
          <Field
            name="text"
            id="text"
            as="textarea"
            rows={6}
            className="p-1 w-full resize-none border border-slate-600 rounded"
          ></Field>
          <ErrorMessage
            name="text"
            className="text-red-800 italic my-2"
            component="div"
          />
          <button
            type="submit"
            disabled={!!errors.text || isSubmitting}
            className="bg-green-700 rounded shadow text-white px-4 py-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 duration-200"
          >
            Analyse
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SentimentAnalysisForm;
