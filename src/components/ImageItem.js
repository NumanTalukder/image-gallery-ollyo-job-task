import React, { useRef } from 'react'
import { TiTick } from 'react-icons/ti'
import { useDrag, useDrop } from 'react-dnd'

const ImageItem = ({
  image,
  toggleSelection,
  index,
  moveImage,
  setFeaturedImage,
}) => {
  const ref = useRef(null)

  // Use the react-dnd hook to enable dragging functionality for images.
  const [{ isDragging }, drag] = useDrag({
    type: 'image',
    item: { index },
  })

  // Use the react-dnd hook to enable dropping functionality for images.
  const [, drop] = useDrop({
    accept: 'image',
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveImage(dragIndex, hoverIndex)
      item.index = hoverIndex

      // Check if the drop target is the featured section
      if (hoverIndex === 0) {
        // Set the dropped image as featured
        setFeaturedImage(image.id)
      }
    },
  })

  // Attach the drag and drop functionalities to the element's reference.
  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={
        image.featured
          ? 'row-span-2 col-span-2 relative border-2 rounded-lg cursor-pointer'
          : 'relative border-2 rounded-lg cursor-pointer'
      }
      style={{
        display: isDragging ? 'none' : 'block',
        transition: 'all 0.5s ease-in',
        transform: `translate(0, ${(index - image.index) * 100}%)`,
      }}
    >
      {/* Log the value of isDragging */}
      {console.log(isDragging)}

      <img src={image.src} alt={image.src} className='w-full rounded-lg' />

      <div
        className='group'
        style={{
          display: isDragging ? 'none' : 'block',
        }}
      >
        <div
          className={
            image.selected
              ? 'absolute inset-0 bg-black opacity-40 rounded-lg transition-opacity'
              : 'absolute inset-0 bg-black opacity-0 hover:opacity-70 rounded-lg transition-opacity'
          }
        >
          <div
            className={
              image.selected
                ? 'absolute bg-blue-600 w-6 h-6 text-white left-4 top-4 inset-0 opacity-100'
                : 'absolute bg-white hover:bg-blue-600 w-6 h-6 text-white left-4 top-4 inset-0 opacity-0 group-hover:opacity-100 transition-opacity'
            }
            onClick={() => toggleSelection(image.id)}
          >
            <TiTick size={25} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageItem
