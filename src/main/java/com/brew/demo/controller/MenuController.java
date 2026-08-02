package com.brew.demo.controller;

import com.brew.demo.model.Menu;
import com.brew.demo.service.MenuService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public List<Menu> getAll() {
        return menuService.getAllItems();
    }

    @PostMapping
    public Menu add(@RequestBody Menu menu) {
        return menuService.addItem(menu);
    }

    @GetMapping("/{id}")
    public Menu getById(@PathVariable Long id) {
        return menuService.getById(id);
    }

    @GetMapping("/count")
    public String count() {
        return "Total menu items = " + menuService.getAllItems().size();
    }
    @PutMapping("/{id}")
    public Menu update(@PathVariable Long id, @RequestBody Menu menu) {
        return menuService.updateItem(id, menu);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        menuService.deleteItem(id);
        return "Deleted successfully";
    }
}