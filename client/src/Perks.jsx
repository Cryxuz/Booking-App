import wifi from '/icons/wifi.png'
import parking from '/icons/parking.png'
import tv from '/icons/tv.png'
import washer from '/icons/washer.png'
import pets from '/icons/pets.png'
import entrance from '/icons/entrance.png'

const Perks = ({selected, onChange}) => {
  return (
    <>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" />
        <img src={wifi} alt="" />
        <span>Wifi</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" />
        <img src={parking} alt="" />
        <span>Free parking</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" />
        <img src={tv} alt="" />
        <span>Television</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" />
        <img src={washer} alt="" />
        <span>Washer</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" />
        <img src={pets} alt="" />
        <span>Pets allowed</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" />
        <img src={entrance} alt="" />
        <span>Private Entrance</span>
      </label>
    </>
  )
}

export default Perks