package com.brew.demo.controller;

import com.brew.demo.model.User;
import com.brew.demo.security.JwtUtil;
import com.brew.demo.service.UserService;
import org.springframework.web.bind.annotation.*;
import com.brew.demo.service.EmailService;
import com.brew.demo.service.OtpService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService service;
    private final EmailService emailService;
    private final OtpService otpService;

    public UserController(UserService service,
                          EmailService emailService,
                          OtpService otpService) {

        this.service = service;
        this.emailService = emailService;
        this.otpService = otpService;
    }

    // Register User
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    // Login User
    @PostMapping("/login")
    public Object login(@RequestBody User user){

        User dbUser = service.login(
                user.getEmail(),
                user.getPassword()
        );

        if(dbUser != null){

            String token = JwtUtil.generateToken(dbUser.getEmail());

            return Map.of(

                    "message","Login Successful",

                    "token",token,

                    "name",dbUser.getName(),

                    "email",dbUser.getEmail(),

                    "role",dbUser.getRole()
            );
        }

        return Map.of(
                "message","Invalid Email or Password"
        );
    }
    // Get All Users
    @GetMapping
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    @PostMapping("/sendOtp")
    public Object sendOtp(@RequestBody Map<String,String> request){

        String email = request.get("email");



        User user = service.getUserByEmail(email);

        if(user == null){

            return Map.of(
                    "message","Email not registered"
            );

        }

        String otp = otpService.generateOtp(email);

        emailService.sendOtp(email, otp);

        return Map.of(
                "message","OTP Sent Successfully"
        );

    }
    @PostMapping("/verifyOtp")
    public Map<String,String> verifyOtp(@RequestBody Map<String,String> request){

        String email = request.get("email");
        String otp = request.get("otp");

        if(service.verifyOtp(email, otp)){
            return Map.of("message","OTP Verified");
        }

        return Map.of("message","Invalid OTP");
    }

    @PostMapping("/resetPassword")
    public Map<String,String> resetPassword(
            @RequestBody Map<String,String> request){

        String email=request.get("email");
        String password=request.get("password");

        service.resetPassword(email,password);

        return Map.of("message","Password Updated");
    }

}