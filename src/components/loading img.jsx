import { useEffect, useState } from 'react'
import loadingImage from '../assets/loading img.webp'

function LoadingImage({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingCycle, setLoadingCycle] = useState(0)

  useEffect(() => {
    if (!isLoading) return undefined

    const timeoutId = window.setTimeout(() => setIsLoading(false), 180)
    return () => window.clearTimeout(timeoutId)
  }, [isLoading, loadingCycle])

  function showLoadingImage() {
    setLoadingCycle((cycle) => cycle + 1)
    setIsLoading(true)
  }

  return (
    <div className="loading-image-app" onClickCapture={showLoadingImage} aria-busy={isLoading}>
      {children}
      {isLoading && (
        <div className="loading-image-screen" role="status" aria-label="Loading">
          <img src={loadingImage} alt="" />
        </div>
      )}
    </div>
  )
}

export default LoadingImage