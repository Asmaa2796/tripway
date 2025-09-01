import React from 'react'
import ContentLoader from 'react-content-loader'
import i18n from '../i18n/i18n'

const NestedList = props => (
  <ContentLoader viewBox="0 0 400 130" rtl={i18n.language === "ar" && true} height="50%" width="50%" {...props}>
    <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
    <rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
    <rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
    <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
    <rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
    <rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
  </ContentLoader>
)

NestedList.metadata = {
  name: 'DaniloWoz',
  github: 'danilowoz',
  description: 'Nested list',
  filename: 'NestedList',
}

export default NestedList