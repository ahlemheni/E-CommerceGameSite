import React from 'react'

export default function GameCard(props) {
  return (
    <div class="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv">
                
    <div class="item">
      <div class="thumb">
        <img src="assets/images/trending-01.jpg" alt=""/>
        <span class="price"><em>$36</em>{props.game.price}$</span>
      </div>
      <div class="down-content">
        <span class="category">{props.game.category}</span>
        <h4>{props.game.name}</h4>
        <a href="product-details.html"><i class="fa fa-shopping-bag"></i></a>
        <details>
            <summary>Details</summary>
        <p className='text-primary'>    {props.game.name} - {props.game.id}</p>
          <p> Price : <span className='text-dark'>{props.game.price}</span></p>
            <p>Game ID: <span className='text-dark'>{props.game.id}</span></p> 
           <p> Genre:<span className='text-dark'> {props.game.category} </span></p>
           <p> Multi-tags: </p> <ul className="p-0 m-0 d-flex">{props.game.tags.map(i => (<li>{i},</li>))}</ul>
        </details>
      </div>
    </div>
  </div>
  )
}
