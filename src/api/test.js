import http from '@/api/axios'

export function test (data) {
  return http({
    url: '/form/get',
    method: 'post',
    data
  })
}
export default {
  test
}
