import React, { useState } from 'react'
import ImageItem from './ImageItem'
import TopBar from './TopBar'
import { images } from '../assets'
import { TiImage } from 'react-icons/ti'

const ImageGallery = () => {
  const [galleryImages, setGalleryImages] = useState(images)

  // Function to toggle image selection
  const toggleSelection = (imageId) => {
    const updatedImages = galleryImages.map((image) =>
      image.id === imageId ? { ...image, selected: !image.selected } : image
    )
    setGalleryImages(updatedImages)
  }

  // Count of selected images
  const selectedCount = galleryImages.filter((image) => image.selected).length

  // Function to clear all selections
  const clearSelection = () => {
    const updatedImages = galleryImages.map((image) =>
      image.selected ? { ...image, selected: false } : image
    )
    setGalleryImages(updatedImages)
  }

  // Function to delete selected items
  const deleteSelectedItems = () => {
    let nextFeaturedIndex = null
    let isCurrentlyFeaturedDeleted = false
    const updatedImages = galleryImages.filter((image, index) => {
      if (image.selected) {
        if (image.featured) {
          isCurrentlyFeaturedDeleted = true
        }
        return false
      }
      return true
    })

    if (isCurrentlyFeaturedDeleted && updatedImages.length > 0) {
      nextFeaturedIndex = 0
    }

    if (nextFeaturedIndex !== null) {
      updatedImages[nextFeaturedIndex].featured = true
    }

    setGalleryImages(updatedImages)
  }

  // Function to set the featured image
  const setFeaturedImage = (imageId) => {
    const updatedImages = galleryImages.map((image, index) => {
      if (image.id === imageId) {
        console.log(galleryImages[0].featured)
        galleryImages[0].featured = false
        console.log(galleryImages[0].featured)
        console.log(image.id)
        image.featured = true
      }
      return image
    })
    setGalleryImages(updatedImages)
  }

  // Function to move images within the gallery
  const moveImage = (fromIndex, toIndex) => {
    const updatedImages = [...galleryImages]
    const [movedImage] = updatedImages.splice(fromIndex, 1)
    updatedImages.splice(toIndex, 0, movedImage)
    setGalleryImages(updatedImages)
  }

  return (
    // Gallery Container
    <main className='bg-white w-11/12 md:w-10/12 2xl:w-4/6 my-10 rounded-md shadow-md'>
      <TopBar
        selectedCount={selectedCount}
        clearSelection={clearSelection}
        deleteSelectedItems={deleteSelectedItems}
      />
      {/* Image items part */}
      <div className='grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 px-10 my-8'>
        {galleryImages.map((image, index) => (
          <ImageItem
            key={image.id}
            image={image}
            toggleSelection={toggleSelection}
            setFeaturedImage={setFeaturedImage}
            index={index} // Pass index for reordering
            moveImage={moveImage} // Pass moveImage function
          />
        ))}
        <div className='bg-slate-50 flex flex-col items-center justify-center gap-6 w-68 h-68 border-2 border-dashed cursor-pointer rounded-lg'>
          <TiImage size={30} className='text-gray-600' />
          <p className='font-bold text-gray-600'>Add Images</p>
        </div>
      </div>
    </main>
  )
}

export default ImageGallery
