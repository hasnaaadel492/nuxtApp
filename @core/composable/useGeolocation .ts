// src/composables/useGeolocation.js
import { onMounted, ref } from 'vue'

export function useGeolocation() {
  const latitude = ref(null)
  const longitude = ref(null)
  const error = ref(null)

  onMounted(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude.value = position.coords.latitude
          longitude.value = position.coords.longitude
        },
        (err) => {
          error.value = err.message
        }
      )
    } else {
      error.value = 'Geolocation is not supported by this browser.'
    }
  })

  return { latitude, longitude, error }
}
