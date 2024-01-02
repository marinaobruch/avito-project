import { fetchBaseQuery } from "@reduxjs/toolkit/query"
import { clearTokens, setAccessToken, setRefreshToken } from ".."

export const baseQueryWithReauth1 = async (args, api, extraOptions) => {

  const baseQuery = fetchBaseQuery({
      baseUrl: 'http://localhost:8090',
      prepareHeaders: (headers) => {
          const token = localStorage.getItem('access_token')
          console.debug('Использую токен из стора', { token })
          if (token) {
          headers.set('authorization', `Bearer ${token}`)
          }
          return headers
      },
  })

  // Делаем запрос
  const result = await baseQuery(args, api, extraOptions)
  console.debug('Результат первого запроса', { result })

  // Если запрос выполнился не с 401 кодом
  if (result?.error?.status !== 401) {
    return result
  }

  // Ниже обрабатываем 401 код
  // Функция которая отчищает данные о юзере в сторе и отправляет на страницу логина
  const forceLogout = () => {
    console.debug('Принудительная авторизация!')
    api.dispatch(clearTokens())
    window.location.replace('/login')
  }

  // Функция getState возвращает состояние redux стейта целиком, ее нам предоставляет rtk-query, она прилетает параметром запроса в функцию
  const { token } = api.getState()
  console.debug('Данные пользователя в сторе', { token })
  // Если в сторе нет refresh токена, то помочь пользователю мы уже ничем не сможем помочь, разлогиниваем его и отправляем авторизоваться руками
  if (!token.refresh_token) {
    return forceLogout()
  }

  // Делаем запрос за новым access токеном в API обновления токена
  const refreshResult = await baseQuery(
    {
      url: 'auth/login',
      method: 'PUT',
      body: {
        access_token: localStorage.getItem('access_token'),
        refresh_token: localStorage.getItem('refresh_token'),
      },
    },
    api,
    extraOptions,
  )

  console.debug('Результат запроса на обновление токена', { refreshResult })

  // Если api обновления токена не вернуло новый access токен, то ничего сделать мы не можем, разлогиниваем юзера
  if (!refreshResult.data.access_token) {
    return forceLogout()
  }

  // Мы наконец получили новый access токен, сохраняем его в стор, чтобы последующие запросы могли его использовать внутри prepareHeaders
  api.dispatch(setAccessToken( refreshResult.data.access_token ))
  api.dispatch(setRefreshToken( refreshResult.data.refresh_token ))

  // Делаем повторный запрос с теми же параметрами что и исходный, но помним, что повторный запрос произойдет уже с новым токеном,
  // потому что для него вызовется callback prepareHeaders, который получит актуальный access токен из стора,
  // который мы положили в стор строчкой выше
  const retryResult = await baseQuery(args, api, extraOptions)

  // Если повторный запрос выполнился с 401 кодом, то что-то совсем пошло не так, отправляем на принудительную ручную авторизацию
  if (retryResult?.error?.status === 401) {
    return forceLogout()
  }

  console.debug('Повторный запрос завершился успешно')
  return retryResult
}