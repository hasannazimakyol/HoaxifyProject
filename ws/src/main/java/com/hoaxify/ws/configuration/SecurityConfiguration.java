package com.hoaxify.ws.configuration;
import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
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
public class SecurityConfiguration {
	
	
	@Bean 
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http.csrf().disable();
		http.httpBasic().authenticationEntryPoint(new AuthEntryPoint());//login popup'ın gözükmemesi için
		
	    http.authorizeHttpRequests()
				.requestMatchers(HttpMethod.POST, "/api/1.0/auth").authenticated()
				.requestMatchers(HttpMethod.GET, "/secured").authenticated()
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
