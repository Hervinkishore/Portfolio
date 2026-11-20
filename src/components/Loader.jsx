import { useEffect, useState } from 'react'

const Loader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onFinish, 400)
          return 100
        }
        return prev + 1
      })
    }, 18)

    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[10000]">
      <span className="text-white text-5xl font-light tracking-widest">
        {progress}%
      </span>
    </div>
  )
}

export default Loader