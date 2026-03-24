import { type FC } from "react";
import { FormGroup } from "@mui/material";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Stack,
  Avatar,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

interface IInputFields {
  label: string,
  name: string;
  [x:string]: unknown; // correct this later. it should take all mui inputs and react hook form props
};

interface IAuthForm {
  header: {
    primaryTxt: string;
    secondaryTxt: string;
  };
  inputFields: IInputFields[];
  footer: {
    submitBtnTxt: string;
    link: {
      detailTxt: string;
      linkTxt: string;
      linkHref: string;
    }
  }
}

const AuthForm: FC<IAuthForm> = ({
  header,
  inputFields = [{label: "label1", name: 'label1', rest: {}}],
  footer
}) => {
const { primaryTxt, secondaryTxt } = header;
const {submitBtnTxt, link: {detailTxt, linkTxt, linkHref}} = footer;

  return (
    <FormGroup sx={{ justifySelf: "center", pt: 5 }}>
      <Paper
        elevation={0}
        sx={{
          width: "min(860px, 92vw)",
          p: { xs: 4, sm: 6 },
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 10px 30px rgba(16, 24, 40, 0.08)",
        }}
      >
        <Stack
          spacing={3}
          alignItems="center"
          sx={{ maxWidth: 720, mx: "auto" }}
        >
          {/* Icon */}
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "rgba(124, 58, 237, 0.12)",
              color: "primary.main",
            }}
          >
            <CalendarMonthRoundedIcon />
          </Avatar>

          {/* Heading */}
          <Stack spacing={1} alignItems="center">
            <Typography variant="h4" fontWeight={800}>
              {primaryTxt}
            </Typography>
            <Typography color="text.secondary">
             {secondaryTxt}
            </Typography>
          </Stack>

          {/* Form */}
          <Box component="form" sx={{ width: "100%" }}>
            <Stack spacing={3}>
              {inputFields.map(({label, name, ...rest}) => <Box>
                <Typography fontWeight={700} mb={1}>
                  {label}
                </Typography>
                <TextField
                  name={name}
                  {...rest}
                />
              </Box>)}
              {/* <Box>
                <Typography fontWeight={700} mb={1}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  placeholder="you@example.com"
                  type="email"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      bgcolor: "#fbfbfe",
                    },
                  }}
                />
              </Box> */}

              {/* <Box>
                <Typography fontWeight={700} mb={1}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  placeholder="••••••••"
                  type="password"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      bgcolor: "#fbfbfe",
                    },
                  }}
                />
              </Box> */}

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  py: 1.6,
                  borderRadius: 2,
                  fontWeight: 800,
                  textTransform: "none",
                  fontSize: 18,
                }}
              >
                {submitBtnTxt}
              </Button>

              <Typography align="center" color="text.secondary">
               {detailTxt}{" "}
                <Link href={linkHref} underline="hover" fontWeight={700}>
                  {linkTxt}
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </FormGroup>
  );
};

export default AuthForm;
