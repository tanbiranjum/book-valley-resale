import React from 'react'
import {Button as MantineButton} from '@mantine/core'

const Button = ({name}) => {
  return (
    <MantineButton>{name}</MantineButton>
  )
}

export default Button