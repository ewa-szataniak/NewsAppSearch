import React, { useState, useEffect } from 'react'
import Spinner from './Spinner';
import NewsItem from './NewsItem';
import InfiniteScroll from 'react-infinite-scroll-component';

const Search = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [search, setSearch] = useState(props.search)
    const [totalResults, setTotalResults] = useState(0)
    document.title = (`${props.category[0].toUpperCase() + props.category.slice(1)} - Newsmonkey`)

    const updateNews = async (page2) => {
        const url = `${props.apiSite}/v2/top-headlines?q=${props.search}&page=${page2}&pageSize=${pageSize}`;
        props.setProgress(30)
        let api = await fetch(url);
        console.log(api);
        // props.setProgress(50)
        let data = await api.json();
        props.setProgress(70)
        // console.log("updatenews", data);
        setArticles(articles.concat(data.articles))
        setTotalResults(data.totalResults)
        setLoading(false)
        props.setProgress(100)
        props.setSubmitted(false)
    }

    useEffect(() => {
        // console.log("i fire once")
        setArticles([])
        setPage(1)
        updateNews(1)
        props.setSubmitted(false)
    }, [])

    useEffect(() => {
        console.log("abcd usestae")
        const abc = async () => {
            if (props.submitted === true) {
                const url = `${props.apiSite}/v2/top-headlines?q=${props.search}&page=${page}&pageSize=${pageSize}`;
                setLoading(true)
                props.setSubmitted(true)
                let api = await fetch(url);
                let data = await api.json();
                // console.log("updatenews", data);
                // console.log(data.articles);
                // setPage(page+1)
                setArticles(data.articles)
                setTotalResults(data.totalResults)
                setLoading(false)
                props.setSubmitted(false)
            }
        }
        abc()
    }, [props.submitted])
    const fetchData = () => {
        // console.log("Fetch Data", page)
        updateNews(page + 1)
        setPage(page + 1)
    }
    return (
        <div className="container mb-5">
            <div className="h1 text-center" style={{ marginTop: "80px" }}>NewsMonkey - Results for {props.search}</div>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    {articles.length === 0 ? <div className="text-center my-5">No News Found</div> : !loading && <div className="row">
                        {articles.map((article) => {
                            return <NewsItem key={article.url} title={article.title == null ? "No Title" : article.title} desc={article.description == null ? "Today's top headlines about" + article.title : article.description} imageUrl={article.urlToImage ? article.urlToImage : "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"} url={article.url} author={article.author ? article.author : "Unknown"} date={article.publishedAt} source={article.source.name} />;
                        })}
                    </div>}
                </div>
            </InfiniteScroll>
        </div>
    )
}

export default Search
