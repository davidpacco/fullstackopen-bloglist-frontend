export function Notification({ message }) {
  const notificationClass = {
    error: 'notification error',
    success: 'notification success',
  }

  if (message)
    return (
      <div className={notificationClass[message.type]}>
        <p>{message.text}</p>
      </div>
    )
}
