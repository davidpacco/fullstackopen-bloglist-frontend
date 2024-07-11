import { useSelector } from 'react-redux'

export function Notification() {
  const notification = useSelector(({ notification }) => notification)

  const notificationClass = {
    error: 'notification error',
    success: 'notification success',
  }

  if (notification)
    return (
      <div className={notificationClass[notification.type]}>
        <p>{notification.message}</p>
      </div>
    )
}
