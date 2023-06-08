import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, descrption, imageUrl , newsUrl, author, date, source} = this.props
    return (
      <div className='my-3'>
       <div className="card">
       <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style = {{left: '90%', zIndex: '1'}}>{source}</span>
        <img src={imageUrl? imageUrl: "https://static.toiimg.com/thumb/msid-100645173,width-1070,height-580,imgsize-68334,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg" } className="card-img-top" alt="..."/>
        <div className="card-body"> 
            <h5 className="card-title" >{title}...</h5>
            <p className="card-text">{descrption}</p>
            <p className="card-text"><small className="text-body-secondary">By {!author? "Unknown": author} on {new Date(date).toGMTString()}  </small></p>
            <a href={newsUrl} target = "blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
