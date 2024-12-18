import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { FC, ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/locale/ru_RU'

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ConfigProvider locale={ruRU}>{children}</ConfigProvider>
      </Provider>
    </BrowserRouter>
  )
}

export { AppProvider }
