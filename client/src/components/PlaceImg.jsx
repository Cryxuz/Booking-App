import PropTypes from 'prop-types';

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return null;
  }

  if (!className) {
    className = 'w-full h-full object-cover rounded-md max-h-[100%] max-w-[100%] ';
  }

  return (
    <div className='flex items-center justify-center bg-gray-300 w-40 h-40 grow shrink-0'>
      <img className={className} src={'https://mern-booking-app-976g.onrender.com/uploads/' + place.photos[index]} alt={place.title} />
    </div>
  );
};

PlaceImg.propTypes = {
  place: PropTypes.shape({
    title: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string),
 
  }).isRequired,
  index: PropTypes.number,
  className: PropTypes.string,
};

export default PlaceImg;