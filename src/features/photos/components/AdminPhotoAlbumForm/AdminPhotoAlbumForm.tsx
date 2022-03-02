import { Button } from '@/components/common/Buttons';
import clsx from 'clsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export interface AdminPhotoAlbumFormProps {
  onSubmit: (value: { name: string }) => void;
}

const AdminPhotoAlbumForm = (props: AdminPhotoAlbumFormProps) => {
  const { onSubmit } = props;

  const schema = Yup.object().shape({
    name: Yup.string().required('Please enter a name').max(50),
  });

  return (
    <div className="p-4">
      <Formik
        initialValues={{ name: '' }}
        onSubmit={onSubmit}
        validationSchema={schema}
        validateOnMount={true}
      >
        {({ errors, isSubmitting, touched }) => (
          <Form>
            <label htmlFor="text" className="block my-2 font-bold">
              Name
            </label>
            <Field
              name="name"
              id="name"
              className={clsx(
                'px-2 py-1 w-full resize-none border border-slate-600 rounded',
                {
                  'border-red-600 shadow-sm shadow-red-900':
                    errors.name && touched.name,
                }
              )}
            ></Field>
            <ErrorMessage
              name="text"
              className="text-red-800 italic my-2"
              component="div"
            />
            <Button
              type="submit"
              disabled={isSubmitting || !!errors.name}
              className="my-2"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminPhotoAlbumForm;
