import './App.css'
import NavBar from './components/NavBar'
import React, { useState } from 'react'
import News from './components/News'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Search from './components/Search'
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY_2;
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState("general")
  const [country, setCountry] = useState("us")
  const [totalResults, setTotalResults] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [progress, setProgress] = useState(10)

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  const handleSearch = async () => {
    // console.log("Submitted", submitted)
    setSubmitted(false)
    setSubmitted(true)
  }
  const setProgress2 = (percent) => {
    setProgress(percent)
  }
  const apiSite = "https://news.bhavin-nor.workers.dev/";
  return (
    <>
      <BrowserRouter>
        <NavBar submitted={submitted} search={search} handleChange={handleChange} handleSearch={handleSearch} />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path='/' element={<News apiSite={apiSite} setProgress={setProgress2} key="home" category="general" totalResults={totalResults} page={page} loading={loading} articles={articles} search={search} pageSize={pageSize} country={country} apiKey={apiKey} />} />
          <Route exact path='/science' element={<News apiSite={apiSite} setProgress={setProgress2} key="science" category="science" totalResults={totalResults} page={page} loading={loading} articles={articles} search={search} pageSize={pageSize} country={country} apiKey={apiKey} />} />
          <Route exact path='/sports' element={<News apiSite={apiSite} setProgress={setProgress2} key="sports" category="sports" totalResults={totalResults} page={page} loading={loading} articles={articles} search={search} pageSize={pageSize} country={country} apiKey={apiKey} />} />
          <Route exact path='/business' element={<News apiSite={apiSite} setProgress={setProgress2} key="business" category="business" totalResults={totalResults} page={page} loading={loading} articles={articles} search={search} pageSize={pageSize} country={country} apiKey={apiKey} />} />
          <Route exact path='/entertainment' element={<News apiSite={apiSite} setProgress={setProgress2} key="entertainment" category="entertainment" totalResults={totalResults} page={page} loading={loading} articles={articles} search={search} pageSize={pageSize} country={country} apiKey={apiKey} />} />
          <Route exact path='/general' element={<News apiSite={apiSite} setProgress={setProgress2} key="general" category="general" totalResults={totalResults} page={page} loading={loading} articles={articles} search={search} pageSize={pageSize} country={country} apiKey={apiKey} />} />
          <Route exact path='/health' element={<News apiSite={apiSite} setProgress={setProgress} key="health" category="health" totalResults={totalResults} page={page} loading={loading} articles={articles} search={search} pageSize={pageSize} country={country} apiKey={apiKey} />} />
          <Route exact path='/technology' element={<News apiSite={apiSite} setProgress={setProgress2} key="technology" category="technology" totalResults={totalResults} page={page} loading={loading} articles={articles} search={search} pageSize={pageSize} country={country} apiKey={apiKey} />} />
          <Route exact path='/search' element={<Search apiSite={apiSite} key="technology" setSubmitted={setSubmitted} submitted={submitted} setProgress={setProgress2} category="technology" totalResults={totalResults} page={page} loading={loading} articles={articles} search={search} pageSize={pageSize} apiKey={apiKey} />} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
