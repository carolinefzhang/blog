import { Routes, Route } from 'react-router'
import Header from './components/Header'
import Layout from './components/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Article from './pages/Article'
import CreateArticle from './pages/CreateArticle'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='font-roboto h-screen flex flex-col'>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/article/create" element={<CreateArticle />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>
      </Layout>
      <Footer />
    </div>
  )
}

export default App
