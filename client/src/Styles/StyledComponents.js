import { Button, styled, Box } from "@mui/material"
import { createStyled } from "@mui/system"

export const StyledButton = styled(Button)({
  color: '#fff',
  backgroundColor : '#3a5dff',
  borderRadius : 5,
  display : 'flex',
  flexDirection : 'row',
  justifyContent : 'left',
  alignItems : 'center',
  textTransform : 'none',
  margin : '10px 15px',
  gap : 10,
  fontSize : 14,
  '&:hover' :{
      color : 'green',
      backgroundColor : '#1d1e23'
    }
})

export const  StyledFlexColumn = styled(Box)({
  display:'flex',
  flexDirection : 'column',
  justifyContent : 'center',
  alignItems : 'center',
})

export const customStype = createStyled({
  default : '',
  active : {
    backgroundColor : 'yellow',
    color : '#fff',
  }
})