import dayjs from 'dayjs'
export interface IEmployeeInfo {}
export interface IEmployeeInformationProps {
  data: IEmployeeInfo
}

export interface IEmployeeInfoReportsProps {
  data: IEmployeeInfo
  loading: boolean
}

export interface IEmployeeInformationHeadProps {
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>
  date: dayjs.Dayjs
}
