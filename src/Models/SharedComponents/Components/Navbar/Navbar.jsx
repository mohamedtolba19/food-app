import React from 'react'

export default function Navbar({loginData}) {
  return (
    <div>
      <h1>navbar</h1>
      <h2>{loginData?.userName}</h2>
    </div>
  )
}
