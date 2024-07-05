import { ElMessage } from 'element-plus'

type AlterPropsType = {
  message: string
  type?: 'error' | 'success' | 'info'
  duration?: number
}

export const useAlert = () => {
  const showAlert = ({ message, type, duration }: AlterPropsType) => {
    ElMessage({
      message,
      type: type ? type : 'error',
      duration: duration ? duration : 2000
    })
  }

  return {
    showAlert
  }
}
