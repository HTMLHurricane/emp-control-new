import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IEmployeePatch, IEmployeeSliceState } from '../types'

const initialState: IEmployeeSliceState = {
  isCreatingEmployee: false,
  isUpdatingEmployee: false,
  employeeForm: null,
  employeeTablePage: 1,
  employeeTableLimit: 10,
}

const EmployeeSlice = createSlice({
  name: 'Employee',
  initialState,
  reducers: {
    setIsCreatingEmployee(state, { payload }: PayloadAction<boolean>) {
      state.isCreatingEmployee = payload
    },
    setIsUpdatingEmployee(state, { payload }: PayloadAction<boolean>) {
      state.isUpdatingEmployee = payload
    },
    setEmployeeForm(state, { payload }: PayloadAction<IEmployeePatch>) {
      state.employeeForm = payload
    },
    setEmployeeTablePage(state, { payload }: PayloadAction<number>) {
      state.employeeTablePage = payload
    },
    setEmployeeTableLimit(state, { payload }: PayloadAction<number>) {
      state.employeeTableLimit = payload
    },
  },
})
export const { reducer, actions } = EmployeeSlice
