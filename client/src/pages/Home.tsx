import { useQuery } from '@apollo/client/react'
import { gql } from '@apollo/client'
import { Link } from 'react-router-dom'

interface Article {
  id: string;
  title: string;
  content: string;
}

interface GetArticlesData {
  articles: Article[];
}

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      title
      content
    }
  }
`
const Home = () => {
  const { data, loading, error } = useQuery<GetArticlesData>(GET_ARTICLES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <section className='w-11/12 mx-auto flex flex-col items-center gap-4'>
      <h1 className='text-3xl font-bold m-4 tracking-widest'>My Blog</h1>
      <section className='flex gap-4 flex-wrap items-stretch justify-center'>
        {data?.articles.map((article) => (
          <section key={article.id} className='bg-slate-100 sm:w-80 w-full p-4 flex flex-col border border-slate-300 rounded-md shadow-md'>
            <h2 className='font-bold text-2xl mb-4'>{article.title}</h2>
            <div className='grow line-clamp-5' dangerouslySetInnerHTML={{ __html: article.content }} />
            <div className='flex justify-end gap-2 mt-4 text-sm'>
              <Link className='hover:underline' to={`/article/${article.id}`}>Read more</Link>
            </div>
          </section>
        ))}
      </section>
    </section>
  )
}

export default Home
