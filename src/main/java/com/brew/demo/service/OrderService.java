package com.brew.demo.service;

import com.brew.demo.model.Order;
import com.brew.demo.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    // Save Order
    public Order saveOrder(Order order) {
        return repository.save(order);
    }

    // Get All Orders
    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    // Get Orders of One User
    public List<Order> getOrdersByEmail(String email) {
        return repository.findByUserEmail(email);
    }

    // Update Order Status
    public Order updateStatus(Long id, String status) {

        Order order = repository.findById(id).orElseThrow();

        order.setOrderStatus(status);

        return repository.save(order);
    }

    // Delete Order
    public void deleteOrder(Long id) {
        repository.deleteById(id);
    }

}