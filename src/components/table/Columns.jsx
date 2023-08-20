import React from 'react'
import { Icon, Loader, Popup } from 'semantic-ui-react'
import moment from 'moment'

const UpToDateIcon = () => {
  const icon = <Icon name="checkmark" color="green" />
  return <Popup content="Up to Date" trigger={icon} />
}

const UpdateInProgressIcon = () => {
  const icon = <Loader active inline size="tiny" />
  return <Popup content="Update In Progress" trigger={icon} />
}

const UnauthorizedUserIcon = () => {
  const icon = <Icon name="warning sign" color="yellow" />
  return <Popup content="Not Authorized" trigger={icon} />
}

export const columns = [
  {
    id: 'status',
    render: ({ lastUpdate, isLatestVersion }) => {
      if (!lastUpdate) {
        return null
      }
      if (isLatestVersion) {
        return <UpToDateIcon />
      }
      return <UpdateInProgressIcon />
    },
    collapsing: true,
  },
  {
    id: 'userEmail',
    header: 'User',
    render: ({ userEmail, userIsAdmin }) => (
      <>
        {userEmail}
        &nbsp;
        {!userIsAdmin && <UnauthorizedUserIcon />}
      </>
    ),
  },
  {
    id: 'name',
    header: 'Name',
    render: ({ name }) => name,
  },
  {
    id: 'firmwareVersion',
    header: 'Firmware',
    render: ({ firmwareVersion }) => firmwareVersion,
  },
  {
    id: 'lastUpdate',
    header: 'Last Updated',
    render: ({ lastUpdate }) => {
      if (lastUpdate) {
        if (moment(lastUpdate).isSame(moment(), 'day')) {
          return 'Today'
        } else {
          return moment(lastUpdate).format('DD-MM-YYYY HH:mm')
        }
      } else {
        return '-'
      }
    },
  },
]
