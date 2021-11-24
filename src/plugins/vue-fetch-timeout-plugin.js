// Fetch function with timeout
export default {
  install: (app) => {
    app.config.globalProperties.$fetch = async function (resource, options = {}) {
      // Default timeout: 10s
      const { timeout = 10000 } = options
      const controller = new window.AbortController()
      const id = setTimeout(() => controller.abort(), timeout)
      const response = await window.fetch(resource, {
        ...options,
        signal: controller.signal
      })
      clearTimeout(id)
      return response
    }
  }
}
