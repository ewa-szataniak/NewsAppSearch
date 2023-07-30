import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [country, setCountry] = useState("in")
    const [totalResults, setTotalResults] = useState(0)
    document.title = (`${props.category[0].toUpperCase() + props.category.slice(1)} - Newsmonkey`)


    const updateNews = async (page2) => {
        const url = `${props.apiSite}/v2/top-headlines?country=${props.country}&category=${props.category}&page=${page2}&pageSize=${pageSize}`;
        props.setProgress(30)
        let api = await fetch(url);
        console.log(api);
        props.setProgress(50)
        let data = await api.json();
        console.log(data);
        props.setProgress(70)
        // console.log("updatenews", data);
        setArticles(articles.concat(data.articles))
        setTotalResults(data.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        // console.log("i fire once")
        updateNews(1)
    }, [])

    const fetchData = () => {
        // console.log("Fetch Data", page)
        updateNews(page + 1)
        setPage(page + 1)

    }

    return (
        <>
            <div className="h1 text-center" style={{ marginTop: "80px" }}>NewsMonkey - Top {props.category[0].toUpperCase() + props.category.slice(1)} Headlines</div>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((article) => {
                            return <NewsItem key={article.url} title={article.title == null ? "No Title" : article.title} desc={article.description == null ? "Today's top headlines about" + article.title : article.description} imageUrl={article.urlToImage ? article.urlToImage : "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"} url={article.url} author={article.author ? article.author : "Unknown"} date={article.publishedAt} source={article.source.name} />;
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

export default News
