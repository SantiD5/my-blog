import { Link } from 'react-router-dom';
import './Card.css';

export const Card = ({ id, date, category, minutes, img = '/src/assets/Profile.jpeg', title }) => {
  return (
    <article className="main-card">
      <a href="">
        <img src={img} alt={`Image for ${category}`} />
      </a>
      <div className="description">
        <h1>{title}</h1>
        <p className="date">{date}</p>
        <div className="description-right">
          <p className="categoria">{category}</p>
        </div>
      </div>
      <p className="time">{minutes}</p>
      <p>este es el id{console.log(id)}</p>
      <Link to={`/gblogs/${id}`}>Read More</Link>    
      </article>
  );
};
