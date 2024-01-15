import PropTypes from 'prop-types';

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return null;
  }

  if (!className) {
    className = 'object-cover rounded-md max-h-[100%] max-w-[100%] ';
  }

  return (
    <div className='flex items-center'>
      <img className={className} src={'http://localhost:3000/uploads/' + place.photos[index]} alt={place.title} />
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