// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type FC, useState } from "react";
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

const SignupForm: FC = () => {
  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   username: "",
  //   email: "",
  //   password: "",
  // });

  return (
    <FormGroup sx={{justifySelf: "center", pt: 5}}>
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
                Create an account
              </Typography>
              <Typography color="text.secondary">
                Sign up to start organizing your events
              </Typography>
            </Stack>

            {/* Form */}
            <Box component="form" sx={{ width: "100%" }}>
              <Stack spacing={3}>
                <Box>
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
                </Box>

                <Box>
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
                </Box>

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
                  Sign up
                </Button>

                <Typography align="center" color="text.secondary">
                  Already have an account?{" "}
                  <Link href="/login" underline="hover" fontWeight={700}>
                    Login
                  </Link>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>
    </FormGroup>
  );
};

export default SignupForm;
