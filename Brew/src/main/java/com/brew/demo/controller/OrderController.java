package com.brew.demo.controller;

import com.brew.demo.model.Order;
import com.brew.demo.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    // Save Order
    @PostMapping
    public Order saveOrder(@RequestBody Order order) {
        return service.saveOrder(order);
    }

    // Get All Orders (Admin)
    @GetMapping
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    // Get Orders By Email (User)
    @GetMapping("/{email}")
    public List<Order> getOrdersByEmail(@PathVariable String email) {
        return service.getOrdersByEmail(email);
    }

    // Update Order Status
    @PutMapping("/{id}/{status}")
    public Order updateStatus(@PathVariable Long id,
                              @PathVariable String status) {

        return service.updateStatus(id, status);
    }

    // Delete Order
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {

        service.deleteOrder(id);

        return "Order Deleted Successfully";
    }
}