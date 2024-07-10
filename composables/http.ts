import { UseFetchOptions } from 'nuxt/app'
import { FetchContext, FetchError, FetchResponse } from 'ofetch'
import { useCookie, useFetch, useRuntimeConfig } from 'nuxt/app'
import type {
  _AsyncData,
  KeysOf,
  PickFrom
} from 'nuxt/dist/app/composables/asyncData'
import { useAlert } from './commonUseFn/useAlert'


type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT'

class HttpRequest {
  request<T = any>(
    url: string,
    method: Methods,
    data?: any,
    options?: UseFetchOptions<T>,
    header?: any
  ) {
    // const { showAlert } = useAlert()
    const cookie = useCookie('sihuo')
    // const rememberMe = useCookie("rememberMe")
    const requestUrl = ''
    return new Promise((resolve, _reject) => {
      const newOptions: UseFetchOptions<T> = {
        //@ts-ignore
        baseURL: requestUrl,
        // @ts-ignore
        headers: {
          isToken: true,
          Authorization: `Bearer ${cookie.value}`,
          ...header
        },
        method: method,
        timeout: 80000,
        ...options
      }

      if (method === 'GET' || method === 'DELETE') {
        newOptions.params = data
      }
      if (method === 'POST' || method === 'PUT') {
        newOptions.body = data
      }
      //@ts-ignore
      $fetch(requestUrl + url, {
        ...newOptions,
        // onRequest(context) {

        //   console.log(context)

        // },
        onResponse({ response }) {
          return response._data
        }
      })
        .then(
          (
            res: _AsyncData<
              PickFrom<T, KeysOf<T>> | null,
              FetchError<any> | null
            >
          ) => {
            resolve(res)
          }
        )
        .catch((error) => {
          console.log(error)
        })
    })
  }

  // 封装常用方法

  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>, header?: any): Promise<any> {
    return this.request(url, 'GET', params, options, header)
  }

  post<T = any>(url: string, data: any, options?: UseFetchOptions<T>, header?: any): Promise<any> {
    return this.request(url, 'POST', data, options, header)
  }

  Put<T = any>(url: string, data: any, options?: UseFetchOptions<T>): Promise<any> {
    return this.request(url, 'PUT', data, options)
  }

  Delete<T = any>(url: string, params: any, options?: UseFetchOptions<T>): Promise<any> {
    return this.request(url, 'DELETE', params, options)
  }
}

const httpRequest = new HttpRequest()

export default httpRequest
