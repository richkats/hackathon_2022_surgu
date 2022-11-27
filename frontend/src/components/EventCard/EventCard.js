import './EventCard.css'

const imgUrl = 'https://res.cloudinary.com/eventboost/image/upload/v1594282851/website/wp/eventboost-twitter-card-home.jpg';

function EventCard({pageSetter}) {
  return ( 
    <div className="card" onClick={() => pageSetter('EditEvent')} >
      <img className='img' src={imgUrl}></img>

      <div className="title">
        II Хакатон Digital Challenge
      </div>
      <div className='date'>
        26.11.2022
      </div>
      <div className='status'>
        На рассмотрении
      </div>
    </div>
  );
}

export default EventCard;