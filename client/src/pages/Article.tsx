import React from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Formik } from 'formik'
import { useNavigate } from 'react-router'
import Tiptap from '../components/Tiptap'

interface Article {
  id: string;
  title: string;
  content: string;
}

interface GetArticleData {
  article: Article;
}

const GET_ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      id
      title
      content
    }
  }
`
const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($input: UpdateArticleInput!) {
    updateArticle(input: $input) {
      id
      title
      content
    }
  }
`

const Article = () => {
  const { id } = useParams<{ id: string }>()
  const { data, loading, error } = useQuery<GetArticleData>(GET_ARTICLE, {
    variables: { id }
  })
  const [updateArticle] = useMutation(UPDATE_ARTICLE);
  const [status, setStatus] = React.useState<'view' | 'edit'>('view');

  const handleClick = () => {
    console.log('Edit button clicked for article id:', id);
    setStatus('edit');
  }
  let navigate = useNavigate();
  const onOpen = (type: 'success' | 'error', message: string) => {
    alert(`${type.toUpperCase()}: ${message}`);
  };

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (status === 'edit') {
    return (
      <section className='w-11/12 mx-auto'>
        {data?.article ? (
          <article>
            <h1 className='text-xl font-bold'>Editing: {data.article.title}</h1>
            {/* Edit form elements would go here */}
            <div className='my-4'>
              <Formik
                initialValues={{ title: data.article.title, content: data.article.content }}
                onSubmit={async (values) => {
                  console.log('Form submitted with values:', values);
                  try {
                    await updateArticle({
                      variables: {
                        input: {
                          id: data.article.id,
                          title: values.title,
                          content: values.content
                        }
                      }
                    });
                    onOpen('success', 'Article updated successfully.');
                    setStatus('view');
                  } catch (err) {
                    onOpen('error', 'Failed to update article. Please try again.');
                    console.error('Error updating article:', err);
                  }
                }}
              >
                {({ values, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
                  <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                      <label className='block text-sm font-medium mb-1' htmlFor='title'>Title</label>
                      <input
                        id='title'
                        name='title'
                        type='text'
                        value={values.title}
                        onChange={handleChange}
                        className='w-full border border-slate-300 p-2 rounded'
                      />
                    </div>
                    <div className='mb-4'>
                      <label className='block text-sm font-medium mb-1' htmlFor='content'>Content</label>
                      <Tiptap content={values.content} onChange={(content) => setFieldValue('content', content)}/>
                    </div>
                    <button type='submit' disabled={isSubmitting} className='bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-700'>{isSubmitting ? 'Saving...' : 'Save Changes'}</button>
                    <button type='button' onClick={() => setStatus('view')} className='ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700'>Cancel</button>
                  </form>
                )}
              </Formik>
            </div>
          </article>
        ) : (
          <p className='my-4'>Article not found.</p>
        )}
      </section>
    )
  }

  return (
    <section className='w-11/12 mx-auto'>
      {data?.article ? (
        <article>
          <h1 className='text-xl font-bold'>{data.article.title}</h1>
          <div className='my-4 prose max-w-none' dangerouslySetInnerHTML={{ __html: data.article.content }} />
          <button className='bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-700' onClick={handleClick}>Edit</button>
          <button className='mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700' onClick={() => navigate(-1)}>Go Back</button>
        </article>
      ) : (
        <p className='my-4'>Article not found.</p>
      )}
    </section>
  )
}

export default Article
