// EH - Error Handler
const useEH = (controllerFn) => (req, res, next) => {
  Promise.resolve(controllerFn(req, res, next)).catch(async (e) => {
    await req.transaction?.rollback().catch(() => null)
    next(e)
  })
}

module.exports = { useEH }
