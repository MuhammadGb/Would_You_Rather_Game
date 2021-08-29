import React from 'react';
import Box from '@material-ui/core/Box';
import { Button, Typography } from '@material-ui/core';
import {Link} from "react-router-dom";



export default function NotFound() {

  return(
      <Box 
        sx={{
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          mt: "10%",
          justifyContent: "center" 
        }} 
      >
        <Typography variant="h3">404 Error</Typography>
        <Typography variant="h4">Page Not Found!</Typography>
        <Button sx={{mt: "5%", width: "10em"}} component={Link} to="/" variant="contained">Back</Button>
        <Typography variant="h6">Go Home </Typography>
      </Box>
  )
}
