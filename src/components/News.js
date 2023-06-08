import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    articles = [
        {
            "source": {
                "id": "the-times-of-india",
                "name": "The Times of India"
            },
            "author": "Kalpana Sharma",
            "title": "Leg workouts can protect you from fatal heart attacks; read how - Times of India",
            "description": "According to research, leg strength is a major predictor of long-term survival after a heart attack. Individuals with better leg strength had a lower",
            "url": "https://timesofindia.indiatimes.com/life-style/health-fitness/health-news/leg-workouts-can-protect-you-from-fatal-heart-attacks-read-how/articleshow/100645040.cms",
            "urlToImage": "https://static.toiimg.com/thumb/msid-100645173,width-1070,height-580,imgsize-68334,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
            "publishedAt": "2023-05-31T10:30:00Z",
            "content": "Common myths about heart failure that many believe to be trueDebunking heart failure myths that you may think are true."
        }
    ]
    static defaultProps = {
        country: 'in',
        pageSize: 20,
        category: 'sports'

    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1,
            totalResults: 0
        }
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category = ${this.props.category}&apiKey=${this.props.apiKey}&page= ${this.state.page }&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articiles: parsedData.articles,
            loading: false
        })
    }
    async componentDidMount () {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category = ${this.props.category}&apiKey=${this.props.apiKey}&page = ${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handleNextClick = async () =>{
       this.setState({page: this.state.page + 1})
       this.updateNews();
    }

    handlePrevClick = async () =>{
        this.setState({page: this.state.page - 1})
        this.updateNews();
    }

     fetchMoreData = async() => {
        this.setState({page: this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=in&category = ${this.props.category}&apiKey=${this.props.apiKey}&page= ${this.state.page }&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articiles: this.state.articles.concat(parsedData.articles)
        })
      };

  render() {
    return (
      <>
        <h1 className="text-center" style = {{margin: '35px 0px'}}>Top News Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className="class container">            
            <div className='row'>
                { this.state.articles.map((element)=> {
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
}

export default News
