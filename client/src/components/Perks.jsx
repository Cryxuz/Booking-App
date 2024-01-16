/* eslint-disable react/prop-types */
import wifi from '/icons/wifi.png'
import parking from '/icons/parking.png'
import tv from '/icons/tv.png'
import washer from '/icons/washer.png'
import pets from '/icons/pets.png'
import entrance from '/icons/entrance.png'

const Perks = ({selected, onChange}) => {
  function handleCheckboxClick (evt) {
    const {checked, name} = evt.target
    if (checked) {
      onChange([...selected, name])
    } else {
      onChange([...selected.filter(selectedName => selectedName !== name)])
    }
    
  }
  return (
    <>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" checked={selected.includes('wifi')} name="wifi"onChange={handleCheckboxClick} />
        <img src={wifi} alt="" />
        <span>Wifi</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" checked={selected.includes('parking')} name="parking"onChange={handleCheckboxClick} />
        <img src={parking} alt="" />
        <span>Free parking</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" checked={selected.includes('television')} name="television"onChange={handleCheckboxClick} />
        <img src={tv} alt="" />
        <span>Television</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" checked={selected.includes('washer')} name="washer"onChange={handleCheckboxClick} />
        <img src={washer} alt="" />
        <span>Washer</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" checked={selected.includes('pets')} name="pets"onChange={handleCheckboxClick} />
        <img src={pets} alt="" />
        <span>Pets allowed</span>
      </label>
      <label className='border p-4 flex rounded-2xl gap-2 items-center cursor-pointer' >
        <input type="checkbox" checked={selected.includes('entrance')} name="entrance"onChange={handleCheckboxClick} />
        <img src={entrance} alt="" />
        <span>Private Entrance</span>
      </label>
    </>
  )
}

export default Perks