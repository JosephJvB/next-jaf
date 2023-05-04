export const JafTokenKey = 'jaf-jwt'
export const TS_ApiUrl = 'https://ts.jaf-unwrapped.com/'
export const PyAuth_ApiUrl = 'https://py-auth.jaf-unwrapped.com/'
export const PyAdminQuiz_ApiUrl = 'https://py-adminquiz.jaf-unwrapped.com/'
export const PyUserQuiz_ApiUrl = 'https://py-userquiz.jaf-unwrapped.com/'
export const Golang_ApiUrl = 'https://go.jaf-unwrapped.com/'
export const AdminSpotifyId = 'xnmacgqaaa6a1xi7uy2k1fe7w'

// TODO: move to backend
export const getStartUrl = () => {
  if (typeof window === 'undefined') {
    return ''
  }
  return (
    'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
      response_type: 'code',
      client_id: '678f8fa942f640deaad0fa4f8005c98d',
      scope:
        'user-read-private user-read-email user-top-read user-read-recently-played',
      redirect_uri: window.location.origin,
    })
  )
}
