package com.brew.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        System.out.println("SecurityConfig Loaded");

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/index.html",
                                "/style.css",
                                "/script.js",
                                "/api/users/register",
                                "/api/users/login",
                                "/api/users/sendOtp",
                                "/api/users/resetPassword",
                                "/api/orders/**",
                                "/api/menu/**",
                                "/api/payment/**",
                                "/**/*.jpg",
                                "/**/*.png",
                                "/**/*.jpeg",
                                "/api/users",
                                "/api/users/verifyOtp",
                                "/api/ai/**",
                                "/**/*.webp"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
    // BCrypt Password Encoder Bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}