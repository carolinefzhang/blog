import { useMutation } from '@apollo/client/react'
import { gql } from '@apollo/client'
import { Formik } from 'formik'
import { useNavigate } from 'react-router'
import Tiptap from '../components/Tiptap'

const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
      title
      content
    }
  }
`
const CreateArticle = () => {
    const [createArticle] = useMutation(CREATE_ARTICLE);
    const onOpen = (type: 'success' | 'error', message: string) => {
        alert(`${type.toUpperCase()}: ${message}`);
    };
    let navigate = useNavigate();
    return (
        <section className='w-11/12 mx-auto'>
            <article>
                <h1 className='text-xl font-bold'>Create New Article</h1>
                {/* Edit form elements would go here */}
                <div className='my-4'>
                    <Formik
                        initialValues={{ title: '', content: '' }}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await createArticle({
                                    variables: {
                                        input: {
                                            title: values.title,
                                            content: values.content,
                                        },
                                    },
                                });
                                onOpen('success', 'Article created successfully.');
                            } catch (error) {
                                onOpen('error', 'Error creating article.');
                                console.error('Error updating article:', error);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            setFieldValue,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className='mb-4'>
                                <label className='block text-sm font-medium mb-1' htmlFor='title'>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Article Title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                    className='w-full border border-slate-300 p-2 rounded'
                                />
                                </div>
                                <div className='mb-4'>
                                    <label className='block text-sm font-medium mb-1' htmlFor='content'>Content</label>
                                    <Tiptap
                                        content={values.content}
                                        onChange={(content) => setFieldValue('content', content)}
                                    />
                                </div>
                                <button type='submit' disabled={isSubmitting} className='bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-700'>{isSubmitting ? 'Creating...' : 'Create Article'}</button>
                                <button type='button' onClick={() => navigate(-1)} className='ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700'>Cancel</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </article>
        </section>
    )
}

export default CreateArticle
