import React from 'react'
import LinkList from './linkList/linkList'
import BodyCard from 'components/common/bodyCard'

export default function Links() {
  document.title = 'Links - Dashboard'
  return (
    <BodyCard>
      <LinkList />
    </BodyCard>
  )
}
