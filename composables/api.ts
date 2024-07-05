import httpRequest from './http'

//报警类型字典
export const getExample = () =>
  httpRequest.get('/api/gg')
