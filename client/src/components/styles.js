import { styled } from "@material-ui/core/styles"
import { withStyles } from "@material-ui/core/styles"
import {
   Button,
   Radio,
   TextField,
   Container,
   Card,
   AppBar,
   Switch,
   Select,
   Paper,
   DialogContent,
} from "@material-ui/core/"
import FaceIcon from "@material-ui/icons/Face"
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled"
import SendIcon from "@material-ui/icons/Send"
import BlockIcon from "@material-ui/icons/Block"
import ReactPlayer from "react-player"
import SaveIcon from "@material-ui/icons/Save"
import LiveHelpIcon from "@material-ui/icons/LiveHelp"

export const primaryColor = "#56A3A6"
export const secondaryColor = "#21CBF3"
export const gradient = {
   background: `linear-gradient(45deg, ${primaryColor} 30%, ${secondaryColor} 90%)`,
   padding: "100px",
}

export const StyledAppBar = styled(AppBar)({
   background: `linear-gradient(45deg, ${primaryColor} 30%, ${secondaryColor} 90%)`,
   padding: "15px",
   marginBottom: "3%",
})

export const StyledButton = styled(Button)({
   background: `linear-gradient(45deg, ${primaryColor} 30%, ${secondaryColor} 90%)`,
   boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
   padding: "8px 12px",
   width: "43%",
   color: "white",
})

export const StyledRad = styled(Radio)({
   color: `${secondaryColor}`,
   after: `${secondaryColor}`,
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
   background: `linear-gradient(45deg, ${primaryColor} 30%, ${secondaryColor} 90%)`,
   boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
   padding: "8px 12px",
   color: "white",
})

export const ReverseTightButton = styled(Button)({
   background: `linear-gradient(45deg, ${secondaryColor} 30%, ${primaryColor} 90%)`,
   boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
   padding: "8px 12px",
   color: "white",
})

export const StyledSwitch = withStyles({
   switchBase: {
      color: `${primaryColor} `,
      "&$checked": {
         color: `${secondaryColor} `,
      },
      "&$checked + $track": {
         backgroundColor: `${primaryColor} `,
      },
   },
   checked: {},
   track: {},
})(Switch)

export const StyledTextField = withStyles({
   root: {
      "& label.Mui-focused": {
         color: `${primaryColor}`,
      },
      "& .MuiInput-underline:after": {
         borderBottomColor: `${primaryColor}`,
      },
      "&.Mui-focused fieldset": {
         borderColor: `${primaryColor}`,
      },
   },
})(TextField)

export const StyledSelect = withStyles({
   select: {
      "&:before": {
         borderColor: `${primaryColor}`,
      },
      "&:after": {
         borderColor: `${primaryColor}`,
      },
   },
})(Select)

export const StyledDropDown = styled(Select)({
   marginLeft: "40px",
})

export const StyledArrow = styled(PlayCircleFilledIcon)({
   color: `${secondaryColor}`,
})

export const StyledSend = styled(SendIcon)({
   color: `${secondaryColor}`,
   border: `1px solid ${secondaryColor}`,
   borderRadius: "50%",
   padding: "10px",
})

export const StyledCancel = styled(BlockIcon)({
   color: `#BA1B1D`,
   border: `1px solid #BA1B1D`,
   borderRadius: "50%",
   padding: "10px",
})

export const StyledPaper = styled(Paper)({
   padding: "15px",
   margin: "5px 5px",
})

export const TightPaper = styled(Paper)({
   padding: "15px",
   margin: "2.5px auto",
   width: "50%",
})

export const StyledLogo = styled("img")({
   width: "50%",
   marginRight: "150x",
})

export const StyledPlayer = styled(ReactPlayer)({
   background: `linear-gradient(45deg, ${primaryColor} 30%, ${secondaryColor} 90%)`,
})

export const StyledSave = styled(SaveIcon)({
   color: `green`,
   border: `1px solid green`,
   borderRadius: "50%",
   padding: "10px",
})

export const SmallLogo = styled("img")({
   width: "15%",
   height: "15%",
})

export const PaddedDialogContent = styled(DialogContent)({
   padding: "30px 90px",

   width: "65%",
})

export const StyledHelp = styled(LiveHelpIcon)({
   color: `${primaryColor}`,
})

export const StyledOutlineBtn = styled(Button)({
   border: `1px solid ${secondaryColor}`,
   background: "transparent",
   boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
   padding: "8px 5px",
   width: "35%",
   color: `${primaryColor}`,
   marginLeft: "5%",
})

export const CenterLogo = styled("div")({
   marginLeft: "-12%",
})
