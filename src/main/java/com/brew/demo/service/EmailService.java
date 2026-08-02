package com.brew.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String email,String otp){

        SimpleMailMessage message = new SimpleMailMessage();

        message.setTo(email);

        message.setSubject("Brew Haven Password Reset OTP");

        message.setText(
                "Hello,\n\n" +
                        "Your Brew Haven OTP is : " + otp +
                        "\n\nThis OTP is valid for 5 minutes."
        );

        mailSender.send(message);
    }

}