package com.brew.demo.service;

import com.brew.demo.model.User;
import com.brew.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    private final Map<String, String> otpStorage = new HashMap<>();

    public UserService(UserRepository repository,
                       PasswordEncoder passwordEncoder){

        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register User
    public User register(User user){

        System.out.println("Before Encode : " + user.getPassword());

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        System.out.println("After Encode : " + user.getPassword());

        return repository.save(user);
    }

    // Login User
    public User login(String email, String password){

        Optional<User> user = repository.findByEmail(email);

        System.out.println("Entered Email : " + email);
        System.out.println("Entered Password : " + password);

        if(user.isPresent()){

            System.out.println("Database Email : " + user.get().getEmail());
            System.out.println("Database Password : " + user.get().getPassword());

            boolean result = passwordEncoder.matches(
                    password,
                    user.get().getPassword()
            );

            System.out.println("Password Match : " + result);

            if(result){
                return user.get();
            }

        }else{
            System.out.println("User Not Found");
        }

        return null;
    }
    // Get All Users
    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public User getUserByEmail(String email){

        return repository.findByEmail(email).orElse(null);

    }

    public boolean verifyOtp(String email,String otp){

        if(!otpStorage.containsKey(email)){
            return false;
        }

        return otpStorage.get(email).equals(otp);
    }

    public void resetPassword(String email,String newPassword){

        User user = repository.findByEmail(email).orElse(null);

        if(user!=null){

            user.setPassword(
                    passwordEncoder.encode(newPassword)
            );

            repository.save(user);

            otpStorage.remove(email);
        }
    }

    public void saveOtp(String email, String otp){

        otpStorage.put(email, otp);

    }
}