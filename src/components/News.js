import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const  News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, settotalResults] = useState(0)
  

    const updateNews = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(parsedData.articles)
        settotalResults(parsedData.totalResults)
        setLoading(false)
    }

    useEffect(() => {
        updateNews()
    }, []);
    

    // handleNextClick = async () =>{
    //    this.setState({page: this.state.page + 1})
    //    this.updateNews();
    // }

    // handlePrevClick = async () =>{
    //     this.setState({page: this.state.page - 1})
    //     this.updateNews();
    // }

     const fetchMoreData = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+ 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        // setPage(page - 1)
        setArticles(articles.concat(parsedData.articles))
        settotalResults(parsedData.totalResults)
        // this.setState({
        //     page: this.state.page - 1,
        //     articiles: this.state.articles.concat(parsedData.articles)
        // })
      };

    return (
      <>
        <h1 className="text-center" style = {{margin: '35px 0px', marginTop: '90px'}}>Top News Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
            <div className="class container">            
            <div className='row'>
                { articles.map((element)=> {
                    return <div className="col-md-4" key = {element.url}>
                    <NewsItem title = {element.title} descrption = {element.description} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
                </div>
                })}
            </div>
            </div>
        </InfiniteScroll>
      
      </>
    )
}

export default News


News.defaultProps = {
    country: 'in',
    pageSize: 20,
    category: 'sports'

}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}