import React from 'react'
import useUserState from './useStore'
type Props = {}

const appContext = (props: Props) => {
  const user = useUserState(state => state.user)
  const setUser = useUserState(state => state.setUser)

  return (
    <div>appContext</div>
  )
}

export default appContext