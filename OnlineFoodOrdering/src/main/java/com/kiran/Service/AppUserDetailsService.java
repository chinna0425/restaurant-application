package com.kiran.Service;


import com.kiran.entity.UserDetailsImpl;
import com.kiran.entity.User;
import com.kiran.Repository.UserJpaRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AppUserDetailsService implements UserDetailsService {

    @Autowired
    private UserJpaRepo userJpaRepo;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User existingUser = userJpaRepo.findByEmail(email).orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Email not found: " + email));

        return new UserDetailsImpl(existingUser); // ✅ FIX
    }

    public UserDetails loadUserByUserId(Long id) {

        User existingUser = userJpaRepo.findById(id)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found: " +id));

        return new UserDetailsImpl(existingUser); // ✅ FIX
    }
}
