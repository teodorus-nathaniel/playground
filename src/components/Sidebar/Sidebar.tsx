import { List, ListItemButton, ListItemText } from '@mui/material';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { drawerWidth } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSelectedItem, setSnippet } from '../../redux/slice';
import ExpandableListItem from './ExpandableListItem';

const data = require('../../data.json');
const dataKeys = Object.keys(data) ?? [];

const Sidebar = () => {

  const router = useRouter();
  const dispatch = useAppDispatch()
  const selectedItem = useAppSelector((state) => state.code.selectedItem)

  useEffect(() => {
    const firstKey = dataKeys.length > 0 ? dataKeys[0] : ''
    const objectData = { ...data[firstKey][0], globalKey: firstKey, index: 0 }
    dispatch(setSelectedItem(objectData))
    dispatch(setSnippet(objectData.snippets[objectData.index]))
  }, [])


  const parseKeyToString = (key: string) => {
    return key.toLowerCase().replaceAll(' ', '-');
  }

  return <div>
    <div className='side-container'>
      <List
        sx={{ width: '100%', maxWidth: drawerWidth, bgcolor: '#000' }}
        component="nav"
      >
        {dataKeys.map((key) => {
          return <ExpandableListItem sx={{
            pt: '4px',
            pb: '4px',
          }} title={key}>
            {(data[key]).map((item: any, index: number) => {
              if (item.variants.length === 1) {
                return <ListItemButton selected={selectedItem.globalKey === key && selectedItem.key === item.key}
                  sx={{
                    pl: 4,
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(144, 202, 249, 0.16)',
                    },
                  }}
                  onClick={() => {
                    router.push(`/${parseKeyToString(key)}/${item.key.toLowerCase()}/`)
                  }}>
                  <ListItemText primary={item.key} />
                </ListItemButton>
              }
              return <ExpandableListItem sx={{
                pl: 4,
                pt: '4px',
                pb: '4px',
                mb: '2px',
              }} title={item.key}>
                {item.variants.map((subItem: string, index: number) => {
                  return <ListItemButton selected={selectedItem.globalKey === key && selectedItem.key === item.key && selectedItem.index === index}
                    sx={{
                      pl: 4,
                      pt: '4px',
                      pb: '4px',
                      mb: '4px',
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(144, 202, 249, 0.16)',
                      },
                    }}
                    onClick={() => {
                      router.push(`/${parseKeyToString(key)}/${parseKeyToString(item.key)}/${parseKeyToString(subItem)}`)
                    }}>
                    <ListItemText primary={subItem} />
                  </ListItemButton>
                })}
              </ExpandableListItem>
            })}
          </ExpandableListItem>
        })}
      </List>
    </div>
  </div >
}

export default Sidebar