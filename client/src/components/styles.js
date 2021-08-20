import { styled } from "@material-ui/core/styles"
import { Button, Radio, TextField, Container, Card } from "@material-ui/core/"
import FaceIcon from "@material-ui/icons/Face"

export const primaryColor = "#56A3A6"

export const StyledButton = styled(Button)({
   background: `linear-gradient(45deg, ${primaryColor} 30%, #21CBF3 90%)`,
   boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
   padding: "8px 12px",
   width: "43%",
})

export const StyledRad = styled(Radio)({
   color: "#21CBF3",
   after: "#21CBF3 ",
})

export const StyledText = styled(TextField)({
   color: `${primaryColor}`,
   backgroundColor: "white",
})

export const CenterCon = styled(Container)({
   marginLeft: "30%",
   marginTop: "10%",
   marginBottom: "15%",
   textAlign: "start",
   itemAlign: "center",
})

export const TightCard = styled(Card)({
   width: "45%",
   margin: "2.5px auto",
   backgroundColor: "#FBFEF9",
})

export const StyledFaceIcon = styled(FaceIcon)({
   color: `#8B5D33`,
})

export const TightButton = styled(Button)({
   background: `linear-gradient(45deg, ${primaryColor} 30%, #21CBF3 90%)`,
   boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
   padding: "8px 12px",
})
