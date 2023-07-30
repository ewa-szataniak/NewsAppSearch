import React from 'react'

const NewsItem = (props) => {
    const { title, desc, imageUrl, url, author, date, source } = props;
    // console.log(title, desc);
    return (
        <div className='col-md-4 p-4'>
            <div className="card" >
                <div style={{ display: "flex", position: 'absolute', right: '0', top: '-10px' }}>
                    <span className="badge rounded-pill bg-danger">
                        {source}
                    </span>
                </div>
                <object data={imageUrl} type="image/png">
                    <img className="card-img-top" src="https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg" alt="Card image cap" />
                </object>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{desc}</p>
                    <p className="card-text"><small className='text-muted'>By {author} on {new Date(date).toUTCString()}</small></p>
                    <a href={url} className="btn btn-dark" target='_blank'>Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem