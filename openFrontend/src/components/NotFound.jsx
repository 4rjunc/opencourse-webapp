import { Box } from '@mui/material'

function NotFound() {
  return (
    <>
    <Box
     sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        minHeight: '100vh',
        fontSize:"2.5rem"
     }}>
       <p>404 Not Found</p>
    </Box>
    </>
  )
}

export default NotFound