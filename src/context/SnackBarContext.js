import React, { createContext, useState } from 'react'



const SnackBarContext = createContext({
    message: "",
    open: false,
    duration: 5000,
    setOpen: () => {}
})

const _DURATION = 3000;
const SnackBarContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState({
      text: "Something went wrong...",
      severity: "error",
      duration: _DURATION
    })

    const setAlert = (severity, text) => {
      setMessage({
        text,
        severity,
        duration: _DURATION
      })
      setOpen(true)
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
          return
      }

      setOpen(false)
  }
    
    return (
        <SnackBarContext.Provider value={{ open, message, setAlert, handleClose }}>
            {children}
        </SnackBarContext.Provider>
    )
}

export { SnackBarContext, SnackBarContextProvider }
