import { useLayoutEffect, useState } from 'react'
import throttle from 'lodash.throttle'

const getBoundingRect = (el) => {
  if (el) {
    return el.getBoundingClientRect()
  }
  return null
}

const useBoundingRect = (el, {updateOnScroll = true, updateOnResize = true, throttleInterval = 100} = {}) => {

  const [rect, setRect] = useState()

  useLayoutEffect(() => {
    const handleScroll = throttle(() => {
      setRect(getBoundingRect(el))
    }, throttleInterval)
    window.addEventListener("scroll", handleScroll, true);
    setRect(getBoundingRect(el))
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [el, updateOnScroll, updateOnResize, throttleInterval])

  return rect
}

export default useBoundingRect