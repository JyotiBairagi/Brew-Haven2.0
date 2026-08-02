package com.brew.demo.payment;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/createOrder")
    public String createOrder(@RequestBody Map<String, Double> request)
            throws Exception {

        double amount = request.get("amount");

        return paymentService.createOrder(amount);
    }

}