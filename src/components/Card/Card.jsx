import './Card.css'
export const Card = ({date,category,minutes,img}) =>{
  return(
    <article className="main-card">
      <a href="">
        <img src={img} alt={`Image for ${category}`} />
      </a>
      <div className="description">
        <p className="date">{date}</p>
        <div className="description-right">
        <p className="categoria">{category}</p>
        </div>
      </div>
      <p className="time">{minutes}</p>

    </article>
  )
}
