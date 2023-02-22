import React from 'react'
import { useRouteError } from 'react-router-dom'

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div id="error-page" style={{marginTop: '20px'}}>
      <h1>Oops!</h1>
      <p>Đã có lỗi xảy ra!</p>
      <p> {error.status} <i>{error.Message || error.statusText}</i> </p>
    </div>
  )
}

export default ErrorPage