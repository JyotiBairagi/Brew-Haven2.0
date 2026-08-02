package com.brew.demo.service;

import com.brew.demo.model.Menu;
import com.brew.demo.repository.MenuRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {

    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public List<Menu> getAllItems() {
        return menuRepository.findAll();
    }

    public Menu addItem(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu getById(Long id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu not found"));
    }

    public Menu updateItem(Long id, Menu menu) {
        Menu existing = getById(id);
        existing.setName(menu.getName());
        existing.setDescription(menu.getDescription());
        existing.setPrice(menu.getPrice());
        existing.setImage(menu.getImage());
        return menuRepository.save(existing);
    }

    public void deleteItem(Long id) {
        menuRepository.deleteById(id);
    }
}