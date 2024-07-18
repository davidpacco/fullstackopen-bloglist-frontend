import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

export function Notification() {
  const notification = useSelector(({ notification }) => notification)

  const variant = {
    error: 'danger',
    success: 'success',
  }

  if (notification) {
    return (
      <div>
        <Alert variant={variant[notification.type]}>
          {notification.message}
        </Alert>
      </div>
    )
  }
}
