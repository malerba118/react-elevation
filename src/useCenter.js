import useBoundingRect from './useBoundingRect'

const useCenter = (el) => {
  const rect = useBoundingRect(el)
  return getCenter(rect)
}

const getCenter = (rect) => {
  if (rect) {
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
  }
  return null
}

export default useCenter