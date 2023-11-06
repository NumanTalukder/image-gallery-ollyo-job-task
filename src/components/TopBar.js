// TopBar.js
import React from 'react'
import { TiTick } from 'react-icons/ti'

// This functional component represents the top bar of the image gallery.
// It displays information about the selected images and provides options to clear selection and delete selected files.
const TopBar = ({ selectedCount, clearSelection, deleteSelectedItems }) => {
  return (
    <div className='flex items-center justify-between px-10 py-6 border-b'>
      <div>
        {selectedCount > 0 ? (
          <div className='flex items-center gap-2'>
            {/* Clear selection button */}
            <div
              className='bg-blue-600 text-white text-2xl w-6 h-6 cursor-pointer'
              onClick={clearSelection}
            >
              <TiTick />
            </div>
            {/* Display the number of selected files */}
            <h1 className='font-bold text-2xl'>
              {selectedCount} File{selectedCount > 1 ? 's' : ''} Selected
            </h1>
          </div>
        ) : (
          // When no files are selected, display the gallery title.
          <h1 className='font-bold text-2xl'>Gallery</h1>
        )}
      </div>
      <div>
        {selectedCount > 0 ? (
          // Delete selected files button
          <p
            className='text-2xl text-red-500 cursor-pointer'
            onClick={deleteSelectedItems}
          >
            Delete File{selectedCount > 1 ? 's' : ''}
          </p>
        ) : (
          // When no files are selected, display an empty string.
          ''
        )}
      </div>
    </div>
  )
}

export default TopBar
