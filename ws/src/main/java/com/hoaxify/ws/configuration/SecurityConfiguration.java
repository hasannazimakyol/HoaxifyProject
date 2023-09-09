package com.hoaxify.ws.configuration;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
<<<<<<< HEAD
=======
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
 
@Configuration
@EnableWebSecurity
<<<<<<< HEAD
public class SecurityConfiguration {
	
	
=======
@EnableMethodSecurity(prePostEnabled=true)
public class SecurityConfiguration {
	
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
	@Bean 
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http.csrf().disable();
		http.httpBasic().authenticationEntryPoint(new AuthEntryPoint());//login popup'ın gözükmemesi için
		
	    http.authorizeHttpRequests()
				.requestMatchers(HttpMethod.POST, "/api/1.0/auth").authenticated()
<<<<<<< HEAD
				.requestMatchers(HttpMethod.GET, "/secured").authenticated()
=======
				//.requestMatchers(HttpMethod.GET, "/secured").authenticated()
				.requestMatchers(HttpMethod.PUT, "/api/1.0/users/{username}").authenticated()
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
				.and()
				.authorizeHttpRequests().anyRequest().permitAll();
	 
	    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); //session üretimi duruyor
	 
	    return http.build();
	}
 
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
