import Utils from '../utils'

import { sendFile } from './send'

const getFileName = file => {
  if (file.name) {
    return file.name
  }

  if (file.path) {
    const path = file.path.split('/')
    return path[path.length - 1] //last item of the file path
  }
}

/**
 * @param {File} file
 * @param {String} path
 * @param {Boolean} overwrite
 * @returns {Promise.<String>}
 */
export function upload(file, path, overwrite, asyncHandler) {
  const fileName = getFileName(file)

  if (!fileName) {
    throw new Error('Wrong type of the file source object. Can not get file name')
  }

  asyncHandler = Utils.extractResponder(arguments)

  return sendFile({
    overwrite   : overwrite,
    path        : path,
    fileName    : fileName,
    file        : file,
    asyncHandler: asyncHandler
  })
}
