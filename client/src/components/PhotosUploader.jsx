/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState } from 'react';

const PhotosUploader = (props) => {
  const { addedPhotos, onChange } = props;
  const [photoLink, setPhotoLink] = useState('');

  function uploadPhoto(evt) {
    const files = evt.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }

    axios.post('/upload', data, {
      headers: { 'Content-type': 'multipart/form-data' },
    }).then(response => {
      console.log(response);
      const { data: filenames } = response;
      onChange(prev => {
        return [...prev, ...filenames];
      });
    });
  }

  async function addPhotoByLink(evt) {
    evt.preventDefault();
    const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
    onChange(prev => {
      return [...prev, filename];
    });
    setPhotoLink('');
  }

  function removePhoto(evt, link) {
    evt.preventDefault()
    onChange([...addedPhotos.filter(photo => photo !== link)])
  }

  function selectAsMainPhoto(evt,link) {
    evt.preventDefault()
    const addedPhotosWithoutSelected = addedPhotos.filter(photo => photo !== link)
    const newAddedPhotos = [link, ...addedPhotosWithoutSelected]
    onChange(newAddedPhotos)
  }

  return (
    <>
      <div className='flex gap-2'>
        <input 
          value={photoLink} 
          onChange={evt => setPhotoLink(evt.target.value)} 
          type="text" placeholder='Add link or file' 
          />
        <button onClick={addPhotoByLink} className='bg-gray-200 px-4 rounded-2xl'>Add&nbsp;photo</button>
      </div>
      
      <div className='grid gap-2 grid-cols-3 mt-2 md:grid-cols-4 lg:grid-cols-6'>
        {addedPhotos.length > 0 && addedPhotos.map((link, index) => (
          <div key={index} className='relative h-32 flex w-full object-cover'>
            <img className='rounded-2xl w-[100%]' src={'http://localhost:3000/uploads/' + link} alt="" />
            <button onClick={evt => removePhoto(evt,link)} className='absolute bottom-1 right-1 text-white bg-black p-2 bg-opacity-50 rounded-lg'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
            <button onClick={evt => selectAsMainPhoto(evt,link)} className='absolute top-1 left-1 text-white bg-black p-2 bg-opacity-50 rounded-lg'>
              
              {link === addedPhotos[0] && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  className="w-6 h-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
              </svg>
              
              )}
              {link !== addedPhotos[0] && (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"  className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
              </svg>
              )}
              
            </button>
          </div>
        ))} 
        <label className='h-32 cursor-pointer flex gap-2 justify-center border bg-transparent rounded-2xl items-center p-2 text-2xl text-gray-600'>
          <input type="file" multiple className='hidden' onChange={uploadPhoto}/>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
          </svg>
          Upload
        </label>
      </div>
    </>
  )
}

export default PhotosUploader