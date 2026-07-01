package com.brew.demo.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AIController {

    @PostMapping("/chat")
    public String chat(@RequestBody Map<String,String> body){

        String question = body.get("question");

        String prompt =
                "You are Brew Haven AI Coffee Assistant.\n" +
                        "Answer professionally.\n\n" +
                        question;

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String,Object> req = Map.of(
                "model","gemma3:4b",
                "prompt",prompt,
                "stream",false
        );

        HttpEntity<Map<String,Object>> entity =
                new HttpEntity<>(req,headers);

        ResponseEntity<Map> response =
                restTemplate.postForEntity(
                        "http://localhost:11434/api/generate",
                        entity,
                        Map.class
                );

        return response.getBody().get("response").toString();
    }

}